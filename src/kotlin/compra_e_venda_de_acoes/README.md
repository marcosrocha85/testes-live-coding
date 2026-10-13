<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Compra e venda de ações

Nome na entrevista: **Best Time to Buy and Sell Stock**. Pasta: `compra_e_venda_de_acoes`.

## Problema

Dada uma sequência de preços por dia, encontre o maior lucro de uma compra seguida de uma venda em um dia posterior.

## Ideia

Menor preço visto até agora.

1. Guarde o menor preço entre os dias anteriores.
2. Calcule o lucro se a venda acontecer hoje.
3. Atualize o melhor lucro e o menor preço para o próximo dia.

## Exemplo explicado

Em [7, 1, 5, 3, 6, 4], o menor preço passa a ser 1. Vender a 6 dá lucro 5, o maior encontrado.

```js
maiorLucro([7, 1, 5, 3, 6, 4]) // 5
```

## Por que pedir este teste?

Buscar o maior e o menor preço isoladamente pode inverter a ordem dos dias. O teste avalia se o candidato respeita a cronologia e resume o histórico com poucas variáveis.

Capacidades avaliadas:

- Estado acumulado
- Ordem temporal
- Uma passagem com memória constante

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe precos inteiros não negativos. Permite no máximo uma compra e uma venda posterior. Retorna lucro ou 0 se não houver ganho. Array vazio ou com um preço retorna 0. Não modifica a entrada.

## Complexidade

- Tempo: O(n).
- Espaço adicional: O(1).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Vender antes de comprar
- Somar lucros de várias operações
- Devolver prejuízo em uma sequência decrescente

## Casos compartilhados

- **exemplo clássico**: entrada `{"precos":[7,1,5,3,6,4]}`; saída `5`.
- **preços decrescentes**: entrada `{"precos":[7,6,4,3,1]}`; saída `0`.
- **preços crescentes**: entrada `{"precos":[1,2,3,4]}`; saída `3`.
- **não vende antes de comprar**: entrada `{"precos":[10,1,2]}`; saída `1`.
- **somente uma operação**: entrada `{"precos":[1,5,2,8]}`; saída `7`.
- **preços iguais**: entrada `{"precos":[3,3,3]}`; saída `0`.
- **preço zero**: entrada `{"precos":[0,5]}`; saída `5`.
- **um dia**: entrada `{"precos":[5]}`; saída `0`.
- **vazio**: entrada `{"precos":[]}`; saída `0`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/compra_e_venda_de_acoes/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/compra_e_venda_de_acoes/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/compra_e_venda_de_acoes/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/compra_e_venda_de_acoes/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/compra_e_venda_de_acoes/CompraEVendaDeAcoes.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/compra_e_venda_de_acoes/CompraEVendaDeAcoesTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/compra_e_venda_de_acoes/CompraEVendaDeAcoes.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/compra_e_venda_de_acoes/CompraEVendaDeAcoesTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/compra_e_venda_de_acoes/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/compra_e_venda_de_acoes/CompraEVendaDeAcoesTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/compra_e_venda_de_acoes/CompraEVendaDeAcoes.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/compra_e_venda_de_acoes/CompraEVendaDeAcoesTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/compra_e_venda_de_acoes/acoes.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/compra_e_venda_de_acoes/compra_e_venda_de_acoes_test.pas)
- [Solução C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/compra_e_venda_de_acoes/compra_e_venda_de_acoes.cpp)
- [Testes C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/compra_e_venda_de_acoes/compra_e_venda_de_acoes_test.cpp)
- [Solução Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/compra_e_venda_de_acoes/compra_e_venda_de_acoes.go)
- [Testes Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/compra_e_venda_de_acoes/compra_e_venda_de_acoes_test.go)
- [Solução Rust](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/rust/compra_e_venda_de_acoes/compra_e_venda_de_acoes.rs)
- [Testes Rust](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/rust/compra_e_venda_de_acoes/compra_e_venda_de_acoes_test.rs)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/compra_e_venda_de_acoes.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#compra_e_venda_de_acoes.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/compra_e_venda_de_acoes/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/compra_e_venda_de_acoes/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=CompraEVendaDeAcoesTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=CompraEVendaDeAcoesTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "CompraEVendaDeAcoesTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "CompraEVendaDeAcoesTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter CompraEVendaDeAcoesTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter CompraEVendaDeAcoesTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes compra_e_venda_de_acoes
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### C++

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes compra_e_venda_de_acoes
```

Com Docker, todos os desafios de C++: `docker compose run --build --rm cpp`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Go

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm go sh executar.sh testes compra_e_venda_de_acoes
```

Com Docker, todos os desafios de Go: `docker compose run --build --rm go`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Rust

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm rust sh executar.sh testes compra_e_venda_de_acoes
```

Com Docker, todos os desafios de Rust: `docker compose run --build --rm rust`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em Kotlin

`1..precos.lastIndex` percorre dias depois do primeiro; a faixa `1..0` é vazia para um único preço. `maxOf` e `minOf` escolhem entre dois valores. A comparação do lucro ocorre antes de atualizar o menor preço, preservando a ordem dos dias.

## Exemplo de uso em Kotlin

As funções são declaradas no topo do arquivo. Em um programa Kotlin que use este microprojeto:

```kotlin
import livecoding.compra_e_venda_de_acoes.maiorLucro

fun main() {
    println(maiorLucro(intArrayOf(7, 1, 5, 3, 6, 4))) // 5
}
```

Veja [o guia de Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/kotlin.md) para ferramentas, tipos, Unicode e comandos.
