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

## Particularidades em Java

`Integer.MAX_VALUE` é um preço inicial maior que qualquer preço permitido pelo contrato. As diferenças de preço cabem em `int` porque os preços estão entre zero e um milhão. O lucro começa em zero e só aumenta quando a venda acontece depois da compra.

## Exemplo em Java

Compile com Maven e abra `jshell --class-path src/java/target/classes` da raiz. No JShell, execute:

```java
import tinker.livecoding.compra_e_venda_de_acoes.CompraEVendaDeAcoes;

System.out.println(CompraEVendaDeAcoes.maiorLucro(new int[] {7, 1, 5, 3, 6, 4})); // 5
```

Veja [o guia de Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/java.md) para instalação, ferramentas, tipos e comandos.
