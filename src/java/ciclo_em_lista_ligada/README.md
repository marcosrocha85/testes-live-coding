<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Ciclo em lista ligada

Nome na entrevista: **Linked List Cycle (Floyd)**. Pasta: `ciclo_em_lista_ligada`.

## Problema

Descubra se os ponteiros de uma lista ligada formam um ciclo, sem modificar seus nós.

## Ideia

Ponteiro lento e ponteiro rápido.

1. Mova um ponteiro de um em um nó e o outro de dois em dois.
2. Se o rápido chegar a null, a lista termina e não tem ciclo.
3. Se os ponteiros chegarem ao mesmo nó, existe um ciclo.

## Exemplo explicado

Em 3 → 2 → 0 → -4, com a cauda apontando para o nó 2, o rápido volta ao trecho circular e acaba alcançando o lento no mesmo nó.

```js
temCiclo(criarLista([3, 2, 0, -4], 1)) // true
```

## Por que pedir este teste?

Uma lista com ciclo não termina com uma travessia comum. O teste avalia comparação por identidade e a escolha de um algoritmo que evita guardar todos os nós visitados.

Capacidades avaliadas:

- Identidade de nós
- Algoritmo de Floyd
- Condição de parada e memória constante

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe cabeca ou null. Retorna boolean e não modifica a lista. Nos casos JSON, indiceCiclo é -1 sem ciclo, ou o índice do nó para o qual a cauda aponta. Valores repetidos não indicam ciclo.

## Complexidade

- Tempo: O(n).
- Espaço adicional: O(1).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Comparar valores em vez de referências
- Acessar proximo em null
- Modificar a lista ou ficar preso em um laço sem fim

## Casos compartilhados

- **cauda aponta para o meio**: entrada `{"valores":[3,2,0,-4],"indiceCiclo":1}`; saída `true`.
- **sem ciclo**: entrada `{"valores":[1,2,3],"indiceCiclo":-1}`; saída `false`.
- **lista vazia**: entrada `{"valores":[],"indiceCiclo":-1}`; saída `false`.
- **nó único sem ciclo**: entrada `{"valores":[1],"indiceCiclo":-1}`; saída `false`.
- **nó aponta para si mesmo**: entrada `{"valores":[1],"indiceCiclo":0}`; saída `true`.
- **dois nós em ciclo**: entrada `{"valores":[1,2],"indiceCiclo":0}`; saída `true`.
- **valores repetidos não são ciclo**: entrada `{"valores":[1,1,1],"indiceCiclo":-1}`; saída `false`.
- **ciclo só na cauda**: entrada `{"valores":[1,2,3],"indiceCiclo":2}`; saída `true`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/ciclo_em_lista_ligada/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/ciclo_em_lista_ligada/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/ciclo_em_lista_ligada/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/ciclo_em_lista_ligada/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/ciclo_em_lista_ligada/CicloEmListaLigada.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/ciclo_em_lista_ligada/CicloEmListaLigadaTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/ciclo_em_lista_ligada/CicloEmListaLigada.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/ciclo_em_lista_ligada/CicloEmListaLigadaTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/ciclo_em_lista_ligada/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/ciclo_em_lista_ligada/CicloEmListaLigadaTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/ciclo_em_lista_ligada/CicloEmListaLigada.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/ciclo_em_lista_ligada/CicloEmListaLigadaTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/ciclo_em_lista_ligada/ciclo.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/ciclo_em_lista_ligada/ciclo_em_lista_ligada_test.pas)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/ciclo_em_lista_ligada.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#ciclo_em_lista_ligada.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/ciclo_em_lista_ligada/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/ciclo_em_lista_ligada/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=CicloEmListaLigadaTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=CicloEmListaLigadaTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "CicloEmListaLigadaTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "CicloEmListaLigadaTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter CicloEmListaLigadaTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter CicloEmListaLigadaTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes ciclo_em_lista_ligada
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em Java

`==` compara referências aos próprios objetos `No`. A comparação não usa os valores numéricos dos nós. Enquanto o ponteiro rápido consegue avançar duas posições, o lento consegue avançar uma. Nenhum campo `proximo` é alterado.

## Exemplo em Java

Compile com Maven e abra `jshell --class-path src/java/target/classes` da raiz. No JShell, execute:

```java
import tinker.livecoding.ciclo_em_lista_ligada.CicloEmListaLigada;
import tinker.livecoding._shared.No;

No primeiro = new No(1);
No segundo = new No(2);
primeiro.proximo = segundo;
segundo.proximo = primeiro;
System.out.println(CicloEmListaLigada.temCiclo(primeiro)); // true
```

Veja [o guia de Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/java.md) para instalação, ferramentas, tipos e comandos.
