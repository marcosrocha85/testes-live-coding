# Contratos e casos compartilhados

Um contrato explica o que a função recebe, devolve e pode modificar. Isso permite comparar soluções de linguagens diferentes com o mesmo comportamento, sem obrigá-las a usar os mesmos nomes ou detalhes internos.

## Domínio

- Arrays numéricos usam inteiros entre -1.000.000 e 1.000.000 e têm no máximo 10.000 elementos. Alvos usam o mesmo intervalo. Preços não podem ser negativos. Esses limites mantêm somas e diferenças exatas em JavaScript e cabem em inteiros de 64 bits nos portes.
- Busca binária recebe um array ordenado. Mesclagem recebe listas ordenadas e independentes, sem ciclos.
- Inversão recebe uma lista sem ciclo. Detecção de ciclo aceita listas cíclicas ou terminadas em `null`.
- Nós têm `valor` e `proximo` nos oito portes implementados. Cada linguagem pode usar nomes idiomáticos, preservando a identidade e os vínculos.
- Anagramas comparam pontos de código Unicode de strings bem formadas. Maiúsculas e espaços importam. Não há normalização nem comparação de grafemas. Portes devem preservar esse comportamento ao decodificar UTF-8 ou UTF-16.
- Escadas aceita inteiros de 0 a 77. O resultado de 77 degraus cabe em `Number` com precisão e em inteiros de 64 bits. Valores fora desse domínio são rejeitados.

As soluções pressupõem entradas que respeitam os contratos. Não fazem validação geral de tipos, limites e ordenação. Parênteses tem uma regra explícita para caracteres inválidos, e escadas valida seu domínio para impedir uma resposta inexata. Alterações dessas regras precisam ser registradas como mudança de contrato.

## Formato dos casos

Cada `docs/casos/<desafio>.json` é uma lista com `name`, `input` e uma destas formas de verificação:

```json
{ "name": "exemplo", "input": { "numeros": [2, 7], "alvo": 9 }, "expected": [0, 1] }
```

`expected` contém o resultado, inclusive `null`, boolean ou array. Na busca binária, `expectedIndices` aceita qualquer um dos índices indicados para duplicatas. `error: "RangeError"` indica rejeição de entrada em JavaScript; outras linguagens devem testar seu erro equivalente, não procurar literalmente uma classe com esse nome.

Java rejeita o domínio inválido de escadas com `IllegalArgumentException`. Usa `long` para escadas e `Long` para subarray máximo, cujo resultado pode ser `null`. A soma máxima do contrato pode ultrapassar `int`; os testes Java verificam esse limite.

PHP usa `int` de 64 bits para contagens e somas, e `?int` para o subarray que pode estar vazio. Escadas rejeita o domínio inválido com `InvalidArgumentException`. Arrays numéricos são listas com índices consecutivos desde zero; as soluções os recebem por valor. Strings são UTF-8 bem formado e anagrama conta pontos completos com um gerador. Esses detalhes não mudam as entradas ou respostas comuns.

Swift usa `Int` de 64 bits e `Int?` para o subarray vazio. Escadas recebe `Double` para validar frações e não finitos e lança `ErroDeEntrada.degrausForaDoDominio`; a contagem usa inteiros. Anagrama conta `unicodeScalars` por seus valores `UInt32`, sem a equivalência canônica de `String`. Nós usam referências fortes: testes e exemplos desfazem ciclos após a consulta para permitir a liberação por ARC, preservando a ausência de mutação em Floyd.

Arrays de valores representam listas ligadas somente na preparação e na comparação dos testes. Na detecção de ciclo, `indiceCiclo: -1` significa sem ciclo; outro índice liga a cauda de volta à posição indicada. O algoritmo recebe a cabeça da lista montada, não o índice do ciclo.

## Verificações além do JSON

Pascal usa `Int64` para somas e contagens, `TParIndices.Encontrado` para ausência de par e `TSomaOpcional.Encontrada` para ausência de soma. Escadas rejeita o domínio inválido com `EEntradaInvalida`. Anagrama percorre pontos completos de `UTF8String`, sem normalização. Nós são registros reais alocados com `New`; testes comparam endereços e liberam cada nó uma vez, inclusive em ciclos. Essas escolhas preservam o contrato comum.

Os exemplos compartilhados não bastam para comprovar tudo. Testes locais precisam verificar que a inversão e a mesclagem reutilizam os nós, que a detecção de ciclo não modifica ponteiros e que os demais exercícios não modificam seus arrays de entrada. Em empate, a mesclagem mantém primeiro o nó vindo da primeira lista.

JavaScript e TypeScript incluem comparações com algoritmos exaustivos para soma de dois, busca, lucro e subarray máximo, além de uma contagem combinatória independente para todo o domínio de escadas. TypeScript também compara parênteses com remoção de pares adjacentes e verifica a detecção de ciclos com todas as posições de retorno em listas de até 20 nós. As entradas pseudoaleatórias usam semente fixa para permitir reproduzir falhas.

C++20 usa `std::int64_t` nas somas e contagens e `std::optional` para ausência de par ou soma. Escadas lança `std::invalid_argument` para entradas inválidas. Strings são vistas UTF-8 e o anagrama conta pontos `char32_t` sem normalização. `No*` liga nós reais sem possuir memória; testes e exemplos mantêm os donos vivos durante a consulta ou mutação. Sanitizadores verificam acessos, overflow e vazamentos. Essas escolhas preservam as mesmas entradas e respostas.

## Complexidade em palavras simples

`n` é a quantidade de elementos. `O(n)` significa que o trabalho cresce proporcionalmente a ela. `O(log n)` significa descartar uma fração do intervalo por passo. `O(1)` de espaço significa guardar uma quantidade fixa de variáveis. `O(n²)` significa comparar muitos pares de elementos. Complexidade descreve crescimento; não é uma medição de tempo em segundos.
