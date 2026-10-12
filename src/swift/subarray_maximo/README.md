<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Subarray máximo

Nome na entrevista: **Maximum Subarray (Kadane)**. Pasta: `subarray_maximo`.

## Problema

Encontre a maior soma de um trecho contíguo não vazio de um array.

## Ideia

Estende o trecho ou recomeça.

1. Comece com a soma do primeiro elemento.
2. Para cada novo número, compare começar nele com estender o trecho anterior.
3. Guarde a maior soma vista em qualquer passo.

## Exemplo explicado

Em [-2, 1, -3, 4, -1, 2, 1, -5, 4], o trecho [4, -1, 2, 1] soma 6. Uma soma ruim é abandonada ao iniciar um trecho melhor.

```js
subarrayMaximo([-2, 1, -3, 4, -1, 2, 1, -5, 4]) // 6
```

## Por que pedir este teste?

O teste introduz programação dinâmica com estado pequeno. Ele mostra se o candidato entende contiguidade e percebe que uma entrada só de negativos ainda tem uma resposta não vazia.

Capacidades avaliadas:

- Programação dinâmica
- Decisão local e resultado global
- Casos com números negativos

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe numeros. Retorna a maior soma de um trecho contíguo não vazio. Array vazio retorna null. Retorna a soma, não os índices nem o trecho. Não modifica o array.

## Complexidade

- Tempo: O(n).
- Espaço adicional: O(1).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Começar a melhor soma em zero e errar arrays só negativos
- Escolher números não contíguos
- Confundir maior soma atual com maior soma global

## Casos compartilhados

- **trecho interno**: entrada `{"numeros":[-2,1,-3,4,-1,2,1,-5,4]}`; saída `6`.
- **todos negativos**: entrada `{"numeros":[-8,-3,-6,-2,-5]}`; saída `-2`.
- **todos positivos**: entrada `{"numeros":[1,2,3]}`; saída `6`.
- **nó único**: entrada `{"numeros":[-4]}`; saída `-4`.
- **zeros**: entrada `{"numeros":[0,0]}`; saída `0`.
- **precisa recomeçar**: entrada `{"numeros":[2,-10,4,3]}`; saída `7`.
- **não pode pular número**: entrada `{"numeros":[5,-10,5]}`; saída `5`.
- **vazio**: entrada `{"numeros":[]}`; saída `null`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/subarray_maximo/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/subarray_maximo/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/subarray_maximo/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/subarray_maximo/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/subarray_maximo/SubarrayMaximo.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/subarray_maximo/SubarrayMaximoTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/subarray_maximo/SubarrayMaximo.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/subarray_maximo/SubarrayMaximoTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/subarray_maximo/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/subarray_maximo/SubarrayMaximoTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/subarray_maximo/SubarrayMaximo.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/subarray_maximo/SubarrayMaximoTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/subarray_maximo/subarray.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/subarray_maximo/subarray_maximo_test.pas)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/subarray_maximo.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#subarray_maximo.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/subarray_maximo/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/subarray_maximo/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=SubarrayMaximoTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=SubarrayMaximoTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "SubarrayMaximoTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "SubarrayMaximoTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter SubarrayMaximoTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter SubarrayMaximoTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes subarray_maximo
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em Swift

`Int?` distingue uma soma de `nil` para o array vazio. O microprojeto exige plataforma de 64 bits: a soma pode chegar a dez bilhões. Iniciar no primeiro número preserva respostas negativas. Não use operações com overflow modular, como `&+`, para calcular a soma.

## Exemplo executável em Swift

Com Swift local, execute da raiz:

```sh
swift run --package-path src/swift --jobs 2 exemplo subarray_maximo
```

Ou no container:

```sh
docker compose run --build --rm swift swift run --package-path src/swift --jobs 2 exemplo subarray_maximo
```

O trecho abaixo faz parte do executável de exemplos, compilado pelo Package Manager:

```swift
import LiveCoding

print(subarrayMaximo([-2, 1, -3, 4, -1, 2, 1, -5, 4]) ?? 0) // 6
```

Veja [o guia Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/swift.md) para ferramentas, tipos, Unicode e ARC.
