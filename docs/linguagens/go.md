# Go para iniciantes

Go é uma linguagem compilada com funções, structs, slices, mapas e ponteiros. Neste microprojeto usamos **Go 1.27.2**, fixado no `go.mod`, no script de validação e na imagem oficial Docker por digest. As soluções e os testes usam somente a biblioteca padrão.

## Executar sem instalar SDK

Com Git e Docker em modo Linux, execute da raiz:

```sh
docker compose run --build --rm go
```

O Docker copia fontes e casos para a imagem, executa como usuário sem privilégios e descarta o container com `--rm`. Não monta o checkout, não abre portas e não instala compiladores no computador. O comando verifica formatação, análise estática, todos os testes e os dez exemplos compilados.

A imagem é `golang:1.27.2-bookworm@sha256:5cf287a799e6b94384bad13d16b14904c531f51ba65792237e122ce42b392f61`. `GOTOOLCHAIN=local` exige a ferramenta presente na imagem; `GOPROXY=off` bloqueia buscas de módulos, que este projeto não precisa. Os caches de Go ficam no container, sem volumes persistentes.

Para estudar um desafio:

```sh
docker compose run --build --rm go sh executar.sh testes busca_binaria
docker compose run --build --rm go sh executar.sh exemplo soma_de_dois
```

O segundo comando imprime `soma_de_dois: [0 1]`. Os dez exemplos verificam resultados e, nas listas, ponteiros. `cmd/exemplos/main.go` é gerado junto com os READMEs a partir de `scripts/go-docs.mjs` por `npm run docs`.

## Ferramentas locais, se já disponíveis

Para uma instalação opcional em outro ambiente, use a [distribuição oficial Go 1.27.2](https://go.dev/dl/) e as [instruções oficiais](https://go.dev/doc/install). Confira `go version`. O fluxo Docker acima dispensa essa instalação.

Com essa versão já disponível, os comandos individuais funcionam também no PowerShell:

```sh
gofmt -w src/go
go -C src/go vet ./...
go -C src/go test -race -count=1 ./...
go -C src/go run ./cmd/exemplos soma_de_dois
```

Em Linux/macOS, `sh src/go/executar.sh check` executa o mesmo fluxo completo do Docker. O detector `-race` precisa de uma plataforma suportada e compilador C; o container já inclui ambos. A suíte adicional `GOARCH=386 CGO_ENABLED=0 go test -count=1 ./...` roda em 32 bits no Linux da imagem para detectar dependência indevida do tamanho de `int`.

`gofmt` padroniza espaços e recuos. `go vet` busca problemas estáticos, como argumentos incorretos de impressão. `go test` compila soluções e testes e executa funções iniciadas por Test. `go build` produz o executável dos exemplos. `npm test` executa JavaScript, TypeScript e testes do site; Go tem sua própria suíte.

## Módulos e packages

`go.mod` declara o módulo `github.com/marcosrocha85/testes-live-coding/src/go` e a versão da linguagem. Cada pasta de desafio é um package: arquivos `.go` de produção e `*_test.go` ficam juntos, mas os testes não entram no executável de produção. Os nomes das pastas preservam os IDs compartilhados; os nomes dos packages, como `somadedois`, usam a forma curta sem separadores.

Um nome iniciado por maiúscula, como `SomaDeDois`, pode ser usado por outro package. Os testes usam packages externos com sufixo `_test`, consumindo as mesmas funções públicas de um usuário. `lista/no.go` contém o nó público; `internal/testutil` prepara fixtures e lê JSON somente nos testes. `cmd/exemplos` contém o programa com `package main` e a função main, por onde a execução começa.

Não há `go.sum`, pois não usamos módulos externos. As soluções não importam outra linguagem para resolver os problemas.

## Variáveis, slices e mapas

`:=` declara e inicializa uma variável dentro de uma função. `var` permite declarar o valor zero: um inteiro começa em zero e um ponteiro começa em nil. `for` é o laço da linguagem; `range` percorre elementos e fornece índice e valor. `_` descarta um resultado que não será usado.

Um slice `[]int64` guarda uma vista de um array. Passar o slice copia sua descrição, sem copiar os elementos. Portanto, alterar `numeros[i]` também alteraria a entrada de quem chamou. As soluções numéricas somente leem; os testes guardam uma cópia e verificam ausência de mutação. `nil` e um slice vazio têm tamanho zero e recebem o mesmo tratamento nesses desafios.

`make(map[int64]int)` cria um mapa de valores para índices. Ao consultar `indice, existe := vistos[valor]`, o boolean distingue uma chave ausente de uma chave que guarda zero. `append` acrescenta um elemento ao slice; `pilha[:len(pilha)-1]` diminui o trecho usado como pilha. Só acesse o topo depois de conferir que a pilha não está vazia.

## Inteiros exatos, ausência e erro

`int` pode ter 32 ou 64 bits. É adequado para índices e tamanhos de slices, mas as somas e contagens deste microprojeto usam **int64**. A soma de dez mil valores de um milhão é dez bilhões e não cabe em int de 32 bits. Go não promove automaticamente um inteiro para uma precisão maior em caso de overflow; os limites do contrato mantêm as operações em int64 seguras.

| Situação comum | Resultado Go |
| --- | --- |
| Soma de dois sem par | `([2]int{}, false)`; ignore o par quando ok=false |
| Subarray vazio | `(0, false)`; zero com ok=true é uma soma presente |
| Busca sem alvo | `-1` |
| Lista vazia | `nil` |
| Nenhum lucro | `int64(0)` |
| Escadas inválidas | `(0, ErrDegrausInvalidos)` |

`SubirEscadas` recebe float64 somente para rejeitar frações e valores não finitos antes de converter. A recorrência usa int64 em todas as somas e retorna uma contagem exata. O domínio continua de **0 a 77**, e 77 retorna **8944394323791464**. Zero retorna uma forma de não dar passos.

O erro é um valor retornado, não uma exceção. Confira `err != nil` antes de usar o resultado. `errors.Is(err, subirescadas.ErrDegrausInvalidos)` verifica o erro de domínio que equivale a RangeError nos JSON. Nos demais desafios, as entradas pressupõem o domínio, a ordenação e a independência definidos nos contratos.

## Nós, ponteiros e mutação

`lista.No` é uma struct com `Valor int64` e `Proximo *No`. `&lista.No{Valor: 1}` cria um nó e obtém seu endereço. Dois nós com o mesmo valor continuam distintos; `a == b` entre ponteiros compara identidade. Atribuir um ponteiro não copia os campos do nó.

Na inversão, salve Proximo antes de religar o nó, para não perder o restante. Na mesclagem, as listas devem estar ordenadas, sem ciclos e sem nós compartilhados. O sentinela simplifica o primeiro encaixe e fica fora da resposta; o teste confere reutilização e preferência pela primeira lista nos empates. Use a cabeça devolvida porque as ligações das entradas mudam.

Floyd avança um ponteiro por um nó e outro por dois. Um encontro entre os mesmos endereços indica ciclo. A solução não escreve nos campos. Os testes comparam todos os valores e ponteiros antes e depois, inclusive em listas longas e com valores repetidos.

Go tem coletor de lixo: nós ainda alcançáveis continuam vivos, e ciclos sem referências externas podem ser recolhidos. Não há `free` nem necessidade de romper ciclos para liberar memória. Evitar recursão nesses algoritmos também mantém a memória auxiliar constante.

## Unicode

Uma string Go contém bytes. `len(texto)` mede bytes, e `texto[i]` lê um byte. Para anagrama, usamos `for _, ponto := range texto`: cada ponto completo é uma rune, um inteiro de 32 bits. Emojis fora do plano básico continuam um ponto cada.

O mapa `map[rune]int64` conta pontos e multiplicidade. Maiúsculas, espaços e acentos importam. `é` e `e` seguido de U+0301 são diferentes; não há normalização nem comparação por grafemas. Os contratos pressupõem UTF-8 bem formado. Em bytes inválidos, range produziria o ponto de substituição U+FFFD; isso fica fora do domínio comum.

Os testes incluem acentos compostos e combinantes, emojis, NUL, strings com os mesmos bytes em pontos diferentes e uma permutação de todos os pontos escalares Unicode. A referência ordena runes em vez de reproduzir o mapa da solução.

## O que os testes comprovam

Os 86 casos JSON são lidos diretamente de `docs/casos`, sem copiar os resultados para o código. Soma de dois usa referência por enumeração de pares; busca usa procura linear; lucro enumera compra e venda; subarray enumera trechos; parênteses remove pares adjacentes; escadas usa coeficientes binomiais com `math/big`. Listas usam ordem de ponteiros esperada, ordenação estável e conjunto de visitados para a referência de ciclo.

Os dados pseudoaleatórios usam sementes fixas. A suíte também confere nil, vazios, duplicatas, entradas e listas longas, estabilidade, mutação, somas acima de 32 bits, erros e todo o domínio de escadas. O mesmo comando Docker é usado na CI e antes da publicação do site.

Referências: [especificação Go](https://go.dev/ref/spec), [slices](https://go.dev/blog/slices-intro), [strings, bytes e runes](https://go.dev/blog/strings), [testing](https://pkg.go.dev/testing) e [math/big](https://pkg.go.dev/math/big).
