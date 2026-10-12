# C++ para iniciantes

C++ compila arquivos de texto em um programa executável. Este microprojeto usa **C++20 e GCC 15.2.0**, fixados na imagem oficial `gcc:15.2.0` por digest. Cada desafio tem um header `.hpp`, que declara sua função, uma solução `.cpp`, que define como ela funciona, e testes próprios. As dez soluções usam apenas a biblioteca padrão.

## Executar sem instalar compilador

Com Git e Docker para containers Linux, execute da raiz em PowerShell, Linux ou macOS:

```sh
docker compose run --build --rm cpp
```

O Docker copia fontes e casos JSON, compila como usuário `runner` sem privilégios e executa a suíte completa e os dez exemplos. Não monta o checkout com escrita. `--build` inclui alterações; `--rm` remove o container ao terminar. No primeiro uso, são baixados a imagem e o parser dos testes.

Para estudar uma solução e experimentar seu exemplo:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes soma_de_dois
docker compose run --build --rm cpp sh src/cpp/executar.sh exemplo soma_de_dois
```

A saída do exemplo é `0 1`. Use qualquer ID de pasta, como `anagrama_valido` ou `inverter_lista_ligada`. `_examples/main.cpp` contém o programa completo. Ele é gerado por `npm run docs` a partir de `scripts/cpp-docs.mjs`, a mesma fonte dos trechos explicados nos READMEs.

Se já tiver GCC 15.2.0 em Linux, shell POSIX, curl e sha256sum, `sh src/cpp/executar.sh check` compila e executa exatamente a mesma suíte. O script rejeita outra versão do GCC. Para Windows e macOS, prefira Docker. `npm test` executa as linguagens Node e os testes do site; não executa C++.

## Ler uma função

Os nomes das soluções ficam no namespace `desafios`, que agrupa funções relacionadas. `#include` traz as declarações do header. `std::` identifica um nome da biblioteca padrão.

O exemplo de soma usa um array de tamanho fixo:

```cpp
const std::array<std::int64_t, 4> numeros{2, 7, 11, 15};
const auto par = desafios::somaDeDois(numeros, 9);
if (par.has_value()) {
    std::cout << (*par)[0] << ' ' << (*par)[1] << '\n';
}
```

`auto` pede ao compilador para deduzir o tipo. `const` impede alterar essa variável. `std::optional` distingue um resultado presente de ausência (`std::nullopt`). Confira `has_value()` antes de acessar `*par`: zero é um índice válido, não sinal de ausência. O exemplo executável inclui `<array>`, `<iostream>` e o header da solução.

`std::span<const std::int64_t>` é uma vista de um array ou vector: aponta para os elementos existentes e informa sua quantidade. Não os copia nem possui sua memória. O dono do array deve continuar vivo durante a chamada. `std::string_view` faz o mesmo para bytes de uma string. As funções não guardam essas vistas depois de retornar.

## Inteiros e casos vazios

`std::int64_t` tem exatamente 64 bits com sinal. A soma de dez mil valores de um milhão é dez bilhões, além de 32 bits. Os acumuladores de subarray e escadas usam 64 bits e permanecem exatos no domínio dos contratos.

Escadas recebe `double` para poder rejeitar frações, NaN e infinitos, antes de converter para inteiro. Valores fora de 0 a 77 lançam `std::invalid_argument`. A contagem nunca usa ponto flutuante: `subirEscadas(77)` devolve **8944394323791464**. Para zero degraus existe uma forma de não dar passos.

Soma sem par e subarray vazio retornam `std::nullopt`. Busca ausente retorna -1, em `std::ptrdiff_t`, um tipo com sinal. Lucro vazio retorna zero. Parênteses e anagrama vazios retornam true; lista vazia usa `nullptr`. Não chame `back()`, não leia um elemento ou desreferencie um ponteiro antes de conferir que ele existe.

## Ponteiros e propriedade da memória

`No*` é o endereço de um nó. `&no` obtém seu endereço e `no->proximo` acessa o campo do nó apontado. `nullptr` indica ausência. Comparar dois ponteiros compara identidade, mesmo que ambos os nós tenham o mesmo valor.

No exemplo abaixo, os nós vivem até o fim do escopo; suas ligações são alteradas no lugar:

```cpp
desafios::No terceiro{3};
desafios::No segundo{2, &terceiro};
desafios::No primeiro{1, &segundo};
auto* cabeca = desafios::inverterListaLigada(&primeiro);
// cabeca == &terceiro; ligações: terceiro → segundo → primeiro → nullptr.
```

Execute o exemplo completo com `docker compose run --build --rm cpp sh src/cpp/executar.sh exemplo inverter_lista_ligada`. A função não aloca, copia ou destrói nós. Guarda o seguinte antes de mudar uma ligação. A nova cabeça só pode ser usada enquanto os três nós existirem; devolver seu endereço para fora desse escopo causaria um ponteiro inválido.

Nos testes dinâmicos, `std::unique_ptr<No>` possui um único nó. Quando sai do escopo, destrói esse nó automaticamente: esse padrão se chama RAII, a liberação de recursos ligada ao tempo de vida de objetos. Os ponteiros `proximo` não possuem memória; cada dono fica separado das ligações. Assim um ciclo não impede a liberação e uma lista longa não exige destruição recursiva.

Mesclagem precisa de duas listas independentes, ordenadas e sem ciclos. Reaproveita os nós e prefere a primeira lista em empate; os donos originais continuam responsáveis pela memória. Floyd apenas consulta ligações, sem alterá-las. Nunca libere um mesmo nó duas vezes nem use uma lista depois que seus donos saírem do escopo.

## Unicode

`std::string` e `std::string_view` guardam bytes. Uma letra acentuada pode ocupar dois bytes; um emoji pode ocupar quatro. Contar bytes ou comparar apenas seus conjuntos não preserva o contrato de anagrama.

`_shared/unicode.hpp` lê um ponto UTF-8 inteiro em `char32_t`. O mapa associa cada ponto à sua frequência. Não há normalização: `é` e `e` seguido de acento combinante são diferentes. Maiúsculas, espaços, byte NUL e pontos de junção de emojis contam. Grafemas, os símbolos percebidos visualmente, podem conter vários pontos.

O contrato exige UTF-8 bem formado. O leitor também detecta bytes de continuação inválidos, sequências incompletas, formas longas, substitutos UTF-16 e valores acima de U+10FFFF. As fontes e os casos devem permanecer em UTF-8.

## Testes e ferramentas

O runner lê diretamente os **86 casos JSON** em `docs/casos`. nlohmann JSON **3.12.0**, de licença MIT, é usado somente nos testes; o header baixado é verificado pelo SHA-256 registrado em `src/cpp/json.sha256`. Inteiros esperados são extraídos como inteiros de 64 bits, sem conversão intermediária para `double`.

As referências independentes enumeram pares de índices, compras e vendas, intervalos e combinações de passos. Busca é conferida por procura linear; parênteses por remoção de pares vizinhos. Anagrama usa pontos conhecidos e ordenação, com um codificador UTF-8 independente. Ciclos usam um conjunto de endereços visitados. Inversão compara a ordem reversa dos endereços; mesclagem usa ordenação estável de nós originais. Os sorteios têm sementes fixas para reproduzir falhas.

A suíte inclui listas longas, precisão além de 32 bits, todos os pontos escalares Unicode, limites UTF-8, identidade, estabilidade, mutação e entradas vazias. O compilador usa avisos como erros e verificações da biblioteca padrão. AddressSanitizer (ASan) detecta acessos inválidos e vazamentos; UndefinedBehaviorSanitizer (UBSan) detecta erros como overflow com sinal. Esses erros encerram o comando com falha.

`src/cpp/build` fica fora do Git e do contexto Docker. No Docker não há volume de cache C++; os artefatos desaparecem com o container. A CI testa a compilação direta na imagem do GCC e o serviço Compose; o workflow Pages executa a mesma suíte antes de publicar os fontes reais e seus auxiliares com destaque de sintaxe.

Referências: [manual GCC 15.2.0](https://gcc.gnu.org/onlinedocs/15.2.0/), [sanitizadores do GCC](https://gcc.gnu.org/onlinedocs/gcc-15.2.0/gcc/Instrumentation-Options.html), [documentação nlohmann JSON](https://json.nlohmann.me/) e [tipos numéricos JSON](https://json.nlohmann.me/features/types/number_handling/).
