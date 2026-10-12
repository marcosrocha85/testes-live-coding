# Pascal para iniciantes

Os dez desafios usam **Free Pascal 3.2.2**, no dialeto Object Pascal (`{$mode objfpc}`), com strings longas (`{$H+}`). As soluções usam tipos nativos e a RTL; o leitor JSON usa a FCL distribuída com o compilador. Não há bibliotecas externas para resolver os exercícios.

## Testar sem instalar compilador

Da raiz do repositório, com Docker em modo Linux:

```sh
docker compose run --build --rm pascal
```

A imagem oficial Debian bookworm-slim está fixada por digest. O Dockerfile fixa compilador, RTL, base e FCL em `3.2.2+dfsg-20`, além de binutils `2.40-2`. Os fontes e `docs/casos` são copiados. A compilação acontece como `runner` (UID 10001), sem privilégios e sem montagem do checkout. O comando executa os testes e os dez exemplos; o container termina e é removido. Não há volume de cache Pascal nem instalação de ferramentas no computador.

Para testar somente busca binária ou executar um exemplo:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes busca_binaria
docker compose run --build --rm pascal sh src/pascal/executar.sh exemplo soma_de_dois
```

O segundo comando imprime `0 1`: os índices zero e um contêm números que somam nove. Troque o ID por qualquer uma das dez pastas. `npm run docs` gera `_examples/exemplos.pas` da mesma fonte dos READMEs, em `scripts/pascal-docs.mjs`; `docs:check` confere sua atualização.

## Ferramentas locais opcionais

Para quem já tem FPC 3.2.2 com RTL e FCL em Linux, clone o repositório completo e execute da raiz:

```sh
fpc -iV
sh src/pascal/executar.sh check
sh src/pascal/executar.sh testes anagrama_valido
sh src/pascal/executar.sh exemplo subir_escadas
```

O script exige a versão 3.2.2. `compilar.sh` configura os caminhos das units com `-Fu`, grava objetos e units compiladas com `-FU`, e executáveis com `-FE`. `-B` recompila os fontes, `-Sew` trata avisos como erros, `-Cr` verifica limites de arrays, `-Co` verifica overflow e `-gl` inclui linhas nas falhas. Os programas incluem `heaptrc` primeiro e ativam `HaltOnNotReleased`: vazamentos fazem a execução falhar. No PowerShell, os comandos Docker dispensam shell Unix e compilador local.

As distribuições oficiais estão em [FreePascal.org](https://www.freepascal.org/download.html); a versão dos pacotes do container está no [Debian](https://packages.debian.org/bookworm/fp-compiler). Não é necessário instalar essas ferramentas para usar Docker. `npm test` não executa Pascal. A CI descobre Pascal pelo catálogo na matriz Docker; Pages executa o mesmo comando antes de publicar.

## Units, funções e arrays

Uma `unit` separa `interface`, com os tipos e funções públicos, de `implementation`, com seu código. `uses` importa outras units. Um `program` contém o ponto de entrada. `begin` e `end` delimitam um bloco; `:=` atribui um valor e `=` compara valores. `Result` é a resposta da função; `Exit` retorna antecipadamente. `div` faz divisão inteira.

`array of Int64` como parâmetro é um array aberto, com índices desde zero, mesmo quando o array original tem outros limites. `High` vale -1 na entrada vazia. Já `UTF8String` começa no índice 1. `const` indica que a função não deve escrever no parâmetro. Os testes guardam uma cópia dos arrays e conferem que as soluções os preservam. `TInteiros` é um array dinâmico usado nas fixtures.

`TParIndices.Encontrado` indica se os dois índices existem. `TSomaOpcional.Encontrada` distingue uma soma de ausência de elementos, equivalente ao `null` do JSON. Os demais campos só representam uma resposta quando esse booleano é verdadeiro. Isso evita tratar zero como ausência.

## Inteiros e entradas inválidas

`Integer` tem 32 bits neste modo; `Int64` tem sempre 64 bits. Os índices usam `SizeInt`, que acompanha a plataforma. Valores numéricos, somas, lucros e contagens usam `Int64`. Dez mil valores de um milhão somam **10.000.000.000**; a resposta para 77 degraus é **8.944.394.323.791.464**. Ambos são testados exatamente, sem conversão para ponto flutuante.

Escadas recebe `Double` para rejeitar frações, NaN e infinitos antes da conversão. Entradas fora de 0 a 77 lançam `EEntradaInvalida`, equivalente ao erro de domínio do JSON. Apenas a entrada usa `Double`; a contagem usa `Int64`. Array vazio retorna ausência no subarray, -1 na busca, ausência na soma e zero no lucro. Texto vazio é um anagrama de outro vazio e uma sequência válida de parênteses.

## Unicode e mapa

`UTF8String` contém bytes. Um ponto Unicode pode ocupar de um a quatro bytes: `😀` não é um único `AnsiChar`. `ProximoPonto`, em `_shared/unicode.pas`, percorre UTF-8 bem formado e devolve o código completo como `Cardinal`. A solução de anagrama conta esses códigos inteiros; não normaliza acentos, não agrupa grafemas e não ignora maiúsculas, espaços ou NUL.

Os executáveis inicializam a unit padrão `fpwidestring` para fornecer as conversões Unicode da RTL, inclusive as usadas pelo parser JSON. Isso evita perder acentos no container mínimo e dispensa dependências de locale. A leitura das soluções não depende do parser: anagrama decodifica seus próprios pontos. O oráculo dos testes usa `UTF8Decode`, junta pares substitutos do UTF-16 e ordena os códigos, oferecendo uma referência independente.

`TMapaInteiro` é uma tabela hash própria, usada em soma e anagrama. Colisões procuram a próxima posição; o mapa dobra de tamanho antes de ficar mais que metade ocupado. Consulta e escrita têm custo médio constante; o pior caso pode ser linear por operação. A fórmula de hash atende às chaves do contrato e aos pontos Unicode, sem overflow, e não é uma API para qualquer `Int64`. O espaço cresce com as chaves distintas. `try/finally` garante `Free` no retorno antecipado.

## Nós reais, identidade e memória

`PNo = ^TNo` aponta para um registro com `Valor` e `Proximo`. `New` aloca, `Dispose` libera, `^` acessa o registro e `nil` representa ausência. `@` obtém um endereço. Dois ponteiros iguais apontam para o mesmo nó, mesmo que outros nós tenham valores iguais.

Inversão e mesclagem modificam as ligações e preservam os nós. O sentinela da mesclagem é local e fica fora da saída; em empate, os nós da primeira lista vêm antes. Floyd apenas lê os ponteiros. Depois de inverter, libere pela nova cabeça; depois de mesclar, libere a saída uma vez. As cabeças antigas compartilham esses mesmos nós e não devem ser liberadas novamente.

`LiberarLista` percorre uma lista sem ciclos. Quebre um ciclo antes de usá-la. As fixtures guardam todos os endereços e liberam cada um diretamente, inclusive quando há ciclos. Não há coleta automática de registros alocados com `New`. O rastreador de heap valida a liberação nos testes e exemplos.

## O que os testes verificam

As dez units de teste consomem os **86 casos JSON** de `docs/casos`. As verificações adicionais cobrem listas de 10.000 nós, mesclagem de 20.000 nós, identidade, ordem estável, mutação, entradas vazias, valores negativos, precisão, caracteres suplementares, combinantes, NUL, U+10FFFF e escapes Unicode do JSON.

As referências usam todos os pares para soma e lucro, procura linear para busca, soma de cada trecho para subarray, remoção de pares para parênteses, ordenação de pontos para anagrama, sequência de endereços para inversão, ordenação estável para mescla e nós visitados para ciclo. Escadas é comparado com a contagem combinatória de posições dos passos duplos em todo o domínio 0 a 77. Os dados pseudoaleatórios têm semente fixa. A suíte informa desafios, casos e verificações; essas contagens distinguem casos de teste de asserções.

Referências: [manuais Free Pascal](https://www.freepascal.org/docs.html), [tipos de strings](https://www.freepascal.org/docs-html/ref/refsu12.html), [leitura JSON da FCL](https://www.freepascal.org/docs-html/fcl/fpjson/index.html), [tipo UTF8String no JSON](https://www.freepascal.org/docs-html/fcl/fpjson/tjsonstringtype.html), [heaptrc](https://www.freepascal.org/docs-html/rtl/heaptrc/index.html).
