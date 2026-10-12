<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Busca binária

Nome na entrevista: **Binary Search**. Pasta: `busca_binaria`.

## Problema

Encontre um alvo em um array ordenado em ordem crescente, descartando metade do intervalo a cada passo.

## Ideia

Corta o intervalo pela metade.

1. Marque o início e o fim do intervalo de busca.
2. Compare o elemento central com o alvo.
3. Se o alvo for maior, avance o início; se for menor, recue o fim. Repita enquanto houver intervalo.

## Exemplo explicado

Em [1, 3, 5, 7, 9], procure 7. O centro é 5; descarte a metade esquerda. O próximo centro é 7, no índice 3.

```js
buscaBinaria([1, 3, 5, 7, 9], 7) // 3
```

## Por que pedir este teste?

O teste mostra se o candidato usa a propriedade de ordenação e mantém limites corretos. Erros de uma posição e laços que não avançam são frequentes.

Capacidades avaliadas:

- Redução de espaço de busca
- Limites e condição de parada
- Raciocínio sobre O(log n)

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe numeros ordenados e alvo. Retorna um índice que contém o alvo ou -1. Com valores repetidos, qualquer índice correspondente é aceito. Não ordena nem modifica o array.

## Complexidade

- Tempo: O(log n).
- Espaço adicional: O(1).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Aplicar a busca a uma entrada não ordenada
- Não incluir a última posição
- Atualizar um limite para meio sem avançar uma posição

## Casos compartilhados

- **alvo no meio**: entrada `{"numeros":[-1,0,3,5,9,12],"alvo":9}`; saída `4`.
- **ausente no intervalo**: entrada `{"numeros":[-1,0,3,5,9,12],"alvo":2}`; saída `-1`.
- **primeira posição**: entrada `{"numeros":[1,3,5],"alvo":1}`; saída `0`.
- **última posição**: entrada `{"numeros":[1,3,5,7],"alvo":7}`; saída `3`.
- **alvo abaixo**: entrada `{"numeros":[1,3],"alvo":0}`; saída `-1`.
- **alvo acima**: entrada `{"numeros":[1,3],"alvo":4}`; saída `-1`.
- **um elemento**: entrada `{"numeros":[5],"alvo":5}`; saída `0`.
- **um elemento ausente**: entrada `{"numeros":[5],"alvo":4}`; saída `-1`.
- **vazio**: entrada `{"numeros":[],"alvo":1}`; saída `-1`.
- **duplicatas aceitam qualquer índice do alvo**: entrada `{"numeros":[1,2,2,2,3],"alvo":2}`; saída `um dos índices [1,2,3]`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/busca_binaria/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/busca_binaria/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/busca_binaria/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/busca_binaria/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/busca_binaria/BuscaBinaria.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/busca_binaria/BuscaBinariaTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/busca_binaria/BuscaBinaria.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/busca_binaria/BuscaBinariaTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/busca_binaria/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/busca_binaria/BuscaBinariaTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/busca_binaria/BuscaBinaria.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/busca_binaria/BuscaBinariaTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/busca_binaria/busca.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/busca_binaria/busca_binaria_test.pas)
- [Solução C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/busca_binaria/busca_binaria.cpp)
- [Testes C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/busca_binaria/busca_binaria_test.cpp)
- [Solução Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/busca_binaria/busca_binaria.go)
- [Testes Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/busca_binaria/busca_binaria_test.go)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/busca_binaria.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#busca_binaria.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/busca_binaria/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/busca_binaria/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=BuscaBinariaTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=BuscaBinariaTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "BuscaBinariaTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "BuscaBinariaTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter BuscaBinariaTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter BuscaBinariaTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes busca_binaria
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### C++

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes busca_binaria
```

Com Docker, todos os desafios de C++: `docker compose run --build --rm cpp`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Go

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm go sh executar.sh testes busca_binaria
```

Com Docker, todos os desafios de Go: `docker compose run --build --rm go`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em Java

Índices e valores usam `int`. A divisão de inteiros calcula a posição central. O laço só acessa posições entre os limites do array; por isso uma entrada vazia retorna `-1` sem tentar ler o índice zero. A função não ordena nem modifica os valores.

## Exemplo em Java

Compile com Maven e abra `jshell --class-path src/java/target/classes` da raiz. No JShell, execute:

```java
import tinker.livecoding.busca_binaria.BuscaBinaria;

System.out.println(BuscaBinaria.buscaBinaria(new int[] {1, 3, 5, 7, 9}, 7)); // 3
```

Veja [o guia de Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/java.md) para instalação, ferramentas, tipos e comandos.
