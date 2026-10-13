<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Parênteses válidos

Nome na entrevista: **Valid Parentheses**. Pasta: `parenteses_validos`.

## Problema

Verifique se uma sequência de (), [] e {} abre e fecha cada par na ordem correta.

## Ideia

Pilha de aberturas.

1. Guarde cada símbolo de abertura no topo de uma pilha.
2. Quando chegar um fechamento, retire a última abertura e compare o par.
3. No fim, a pilha precisa estar vazia.

## Exemplo explicado

Em ([]): empilhe (, empilhe [, retire [ ao ler ], retire ( ao ler ). Não sobra nada, então a sequência é válida.

```js
parentesesValidos('([])') // true
```

## Por que pedir este teste?

Contar símbolos não é suficiente: ([)] tem contagens certas e ordem errada. O teste avalia se o candidato modela a ordem de fechamento com uma pilha.

Capacidades avaliadas:

- Pilha: último a entrar, primeiro a sair
- Controle de ordem e aninhamento
- Detecção antecipada de entrada inválida

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe texto. Retorna boolean. A string vazia é válida; qualquer caractere diferente de ()[]{} torna a entrada inválida.

## Complexidade

- Tempo: O(n).
- Espaço adicional: O(n).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Comparar apenas a quantidade de aberturas e fechamentos
- Aceitar fechamento sem abertura
- Esquecer de conferir as aberturas restantes

## Casos compartilhados

- **pares simples**: entrada `{"texto":"()[]{}"}`; saída `true`.
- **aninhados**: entrada `{"texto":"{[()]}"}`; saída `true`.
- **fechamento incorreto**: entrada `{"texto":"(]"}`; saída `false`.
- **ordem cruzada**: entrada `{"texto":"([)]"}`; saída `false`.
- **abertura restante**: entrada `{"texto":"(("}`; saída `false`.
- **fechamento sem abertura**: entrada `{"texto":"]"}`; saída `false`.
- **vazio**: entrada `{"texto":""}`; saída `true`.
- **caractere fora do domínio**: entrada `{"texto":"(a)"}`; saída `false`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/parenteses_validos/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/parenteses_validos/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/parenteses_validos/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/parenteses_validos/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/parenteses_validos/ParentesesValidos.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/parenteses_validos/ParentesesValidosTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/parenteses_validos/ParentesesValidos.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/parenteses_validos/ParentesesValidosTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/parenteses_validos/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/parenteses_validos/ParentesesValidosTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/parenteses_validos/ParentesesValidos.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/parenteses_validos/ParentesesValidosTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/parenteses_validos/parenteses.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/parenteses_validos/parenteses_validos_test.pas)
- [Solução C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/parenteses_validos/parenteses_validos.cpp)
- [Testes C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/parenteses_validos/parenteses_validos_test.cpp)
- [Solução Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/parenteses_validos/parenteses_validos.go)
- [Testes Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/parenteses_validos/parenteses_validos_test.go)
- [Solução Rust](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/rust/parenteses_validos/parenteses_validos.rs)
- [Testes Rust](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/rust/parenteses_validos/parenteses_validos_test.rs)
- [Solução C#](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/csharp/parenteses_validos/ParentesesValidos.cs)
- [Testes C#](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/csharp/parenteses_validos/ParentesesValidosTest.cs)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/parenteses_validos.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#parenteses_validos.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/parenteses_validos/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/parenteses_validos/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=ParentesesValidosTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=ParentesesValidosTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "ParentesesValidosTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "ParentesesValidosTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter ParentesesValidosTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter ParentesesValidosTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes parenteses_validos
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### C++

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes parenteses_validos
```

Com Docker, todos os desafios de C++: `docker compose run --build --rm cpp`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Go

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm go sh executar.sh testes parenteses_validos
```

Com Docker, todos os desafios de Go: `docker compose run --build --rm go`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Rust

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm rust sh executar.sh testes parenteses_validos
```

Com Docker, todos os desafios de Rust: `docker compose run --build --rm rust`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### C#

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm csharp sh executar.sh testes ParentesesValidosTest
```

Com Docker, todos os desafios de C#: `docker compose run --build --rm csharp`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em C++

`std::string_view` lê bytes sem copiar nem possuir o texto. Os seis símbolos aceitos são ASCII, de um byte. Qualquer outro byte faz a função retornar false. `std::vector<char>` possui a pilha; `back()` só é chamado depois de verificar `empty()`. A pilha libera sua memória ao sair do escopo.

## Exemplo executável em C++

Da raiz, compile e execute no container:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh exemplo parenteses_validos
```

Este trecho faz parte de `_examples/main.cpp`, gerado com os headers de cada desafio. Os nomes estão no namespace `desafios`; `exigir` lança uma exceção se a resposta estiver incorreta:

```cpp
exigir(parentesesValidos("{[()]}"));
std::cout << parentesesValidos("{[()]}") << '\n'; // true
```

Veja [o guia C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/cpp.md) para compilação, tipos, Unicode e propriedade da memória.
