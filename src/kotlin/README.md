# Microprojeto Kotlin

Os dez desafios têm soluções Kotlin/JVM independentes, explicações e **102 testes**: 86 casos compartilhados e 16 verificações extras. Usamos Kotlin 2.4.21, Gradle Wrapper 9.7.0 e JDK 21. JUnit 6.0.3 e Gson 2.14.0 são dependências somente de testes.

## Executar com Docker

Da raiz do repositório, sem instalar SDK, JDK ou Gradle no computador:

```sh
docker compose run --build --rm kotlin
```

O container compila, testa e gera o JAR como usuário sem privilégios. Os fontes são copiados; não há checkout montado com escrita. O cache Gradle persiste em `testes-live-coding_kotlin_gradle`. Builds ficam no container removido ao terminar. Veja [o guia Docker](../../docs/docker.md).

## Executar com JDK 21 local

Da raiz, em Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin clean check jar
```

No PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin clean check jar
```

O Wrapper verifica o SHA-256 e baixa Gradle. O build obtém o compilador Kotlin e as dependências. `npm test` não executa esta suíte.

Só um desafio, em Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests BuscaBinariaTest
```

No PowerShell, troque o executável por `.\src\kotlin\gradlew.bat`.

## Organização

- `<desafio>/*.kt`: função, classe de testes e README; o Gradle separa `*Test.kt` das soluções.
- `_shared/No.kt`: nó real compartilhado pelos três exercícios de listas.
- `_tests/`: leitura dos JSON, montagem de listas e testes de referência independentes.
- `build/`: classes, JAR e relatório JUnit; ignorado pelo Git na execução local.

`IntArray?` e `Long?` representam respostas que podem ser ausentes. `Long` preserva somas e contagens grandes. Anagrama lê pontos de código Unicode. Nos testes de listas, `assertSame` confere os mesmos objetos e os ponteiros são verificados conforme o contrato.

Leia [Kotlin para iniciantes](../../docs/linguagens/kotlin.md), [os contratos](../../docs/contratos.md) e [os dez desafios](../../docs/tests/README.md). A entrega corresponde à [issue #34](https://github.com/marcosrocha85/testes-live-coding/issues/34) e suas dez sub-issues.
