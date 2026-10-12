<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Anagrama válido

Nome na entrevista: **Valid Anagram**. Pasta: `anagrama_valido`.

## Problema

Verifique se duas strings têm exatamente os mesmos caracteres com as mesmas quantidades.

## Ideia

Contagem de runes (pontos de código Unicode).

1. Conte cada ponto de código da primeira string.
2. Percorra a segunda e desconte cada ocorrência.
3. Se faltar um caractere ou sobrar alguma contagem, não é anagrama.

## Exemplo explicado

Em amor e roma, a primeira string fornece uma ocorrência de a, m, o e r. A segunda consome todas as quatro, sem sobrar nenhuma.

```js
anagramaValido('amor', 'roma') // true
```

## Por que pedir este teste?

Ter as mesmas letras distintas não basta: as quantidades também importam. O teste avalia mapas de frequência e abre uma discussão sobre como cada linguagem percorre Unicode.

Capacidades avaliadas:

- Mapa de frequências
- Multiplicidade de caracteres
- Pontos de código Unicode

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe primeiro e segundo. Compara pontos de código, com maiúsculas, espaços e acentos significativos. Não normaliza Unicode: é e e seguido de acento combinante são diferentes. Ambas vazias retornam true.

## Complexidade

- Tempo: O(n + m) em média.
- Espaço adicional: O(k), com k pontos de código distintos na primeira string.

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Comparar apenas conjuntos de caracteres
- Ignorar letras repetidas
- Confundir bytes, unidades UTF-16, pontos de código e caracteres visuais

## Casos compartilhados

- **anagrama**: entrada `{"primeiro":"anagram","segundo":"nagaram"}`; saída `true`.
- **letras diferentes**: entrada `{"primeiro":"rat","segundo":"car"}`; saída `false`.
- **contagens diferentes**: entrada `{"primeiro":"aab","segundo":"abb"}`; saída `false`.
- **sobra da primeira string**: entrada `{"primeiro":"aa","segundo":"a"}`; saída `false`.
- **sobra da segunda string**: entrada `{"primeiro":"a","segundo":"aa"}`; saída `false`.
- **vazias**: entrada `{"primeiro":"","segundo":""}`; saída `true`.
- **maiúsculas importam**: entrada `{"primeiro":"Amor","segundo":"roma"}`; saída `false`.
- **acentos**: entrada `{"primeiro":"ação","segundo":"oãça"}`; saída `true`.
- **emojis**: entrada `{"primeiro":"😀a😀","segundo":"😀😀a"}`; saída `true`.
- **espaços importam**: entrada `{"primeiro":"a b","segundo":"ab"}`; saída `false`.
- **sem normalização Unicode**: entrada `{"primeiro":"é","segundo":"é"}`; saída `false`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/anagrama_valido/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/anagrama_valido/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/anagrama_valido/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/anagrama_valido/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/anagrama_valido/AnagramaValido.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/anagrama_valido/AnagramaValidoTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/anagrama_valido/AnagramaValido.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/anagrama_valido/AnagramaValidoTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/anagrama_valido/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/anagrama_valido/AnagramaValidoTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/anagrama_valido/AnagramaValido.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/anagrama_valido/AnagramaValidoTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/anagrama_valido/anagrama.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/anagrama_valido/anagrama_valido_test.pas)
- [Solução C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/anagrama_valido/anagrama_valido.cpp)
- [Testes C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/anagrama_valido/anagrama_valido_test.cpp)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/anagrama_valido.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#anagrama_valido.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/anagrama_valido/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/anagrama_valido/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=AnagramaValidoTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=AnagramaValidoTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "AnagramaValidoTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "AnagramaValidoTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter AnagramaValidoTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter AnagramaValidoTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes anagrama_valido
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### C++

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes anagrama_valido
```

Com Docker, todos os desafios de C++: `docker compose run --build --rm cpp`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em Kotlin

`Char` representa uma unidade UTF-16, enquanto `codePoints().iterator()` percorre pontos de código completos sem copiar a string. A chave do mapa é o código inteiro do símbolo. `?: 0` começa a contagem; `?: return false` rejeita um símbolo ausente. Maiúsculas, espaços e acentos continuam significativos.

## Exemplo de uso em Kotlin

As funções são declaradas no topo do arquivo. Em um programa Kotlin que use este microprojeto:

```kotlin
import livecoding.anagrama_valido.anagramaValido

fun main() {
    println(anagramaValido("😀a😀", "😀😀a")) // true
}
```

Veja [o guia de Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/kotlin.md) para ferramentas, tipos, Unicode e comandos.
