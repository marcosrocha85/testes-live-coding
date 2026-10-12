<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Mesclar listas ordenadas

Nome na entrevista: **Merge Two Sorted Lists**. Pasta: `mesclar_listas_ordenadas`.

## Problema

Una duas listas ligadas já ordenadas em uma única lista ordenada.

## Ideia

Escolhe sempre o menor elo.

1. Compare as cabeças disponíveis das duas listas.
2. Ligue o menor nó à cauda do resultado e avance somente a lista escolhida.
3. Quando uma lista acabar, ligue o restante da outra lista.

## Exemplo explicado

Para 1 → 3 e 2 → 4, escolha 1, depois 2, depois 3. A primeira lista acabou: ligue o nó 4 que restou.

```js
valoresDaLista(mesclarListasOrdenadas(criarLista([1, 3]), criarLista([2, 4]))) // [1, 2, 3, 4]
```

## Por que pedir este teste?

O teste avalia a combinação de duas sequências sem ordenar tudo de novo. Também mostra se o candidato usa um nó sentinela para simplificar o primeiro encaixe.

Capacidades avaliadas:

- Dois ponteiros
- Ordenação e escolha local
- Reutilização de nós e tratamento de lista vazia

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe primeira e segunda, ordenadas, sem ciclos e sem nós compartilhados. Retorna a cabeça da união, reutilizando e religando os nós. Em empate, escolhe primeiro o nó da primeira lista. Ambas vazias retornam null.

## Complexidade

- Tempo: O(n + m).
- Espaço adicional: O(1) na solução; apenas um nó sentinela adicional.

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Perder o restante de uma lista
- Criar cópias dos nós
- Não definir como tratar valores iguais

## Casos compartilhados

- **intercaladas**: entrada `{"primeira":[1,2,4],"segunda":[1,3,4]}`; saída `[1,1,2,3,4,4]`.
- **ambas vazias**: entrada `{"primeira":[],"segunda":[]}`; saída `[]`.
- **primeira vazia**: entrada `{"primeira":[],"segunda":[0]}`; saída `[0]`.
- **segunda vazia**: entrada `{"primeira":[1,2],"segunda":[]}`; saída `[1,2]`.
- **restante da primeira**: entrada `{"primeira":[2,3],"segunda":[1]}`; saída `[1,2,3]`.
- **negativos e repetidos**: entrada `{"primeira":[-3,-1,-1],"segunda":[-2,0]}`; saída `[-3,-2,-1,-1,0]`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/mesclar_listas_ordenadas/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/mesclar_listas_ordenadas/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/mesclar_listas_ordenadas/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/mesclar_listas_ordenadas/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/mesclar_listas_ordenadas/MesclarListasOrdenadas.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/mesclar_listas_ordenadas/MesclarListasOrdenadasTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/mesclar_listas_ordenadas/MesclarListasOrdenadas.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/mesclar_listas_ordenadas/MesclarListasOrdenadasTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/mesclar_listas_ordenadas/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/mesclar_listas_ordenadas/MesclarListasOrdenadasTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/mesclar_listas_ordenadas/MesclarListasOrdenadas.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/mesclar_listas_ordenadas/MesclarListasOrdenadasTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/mesclar_listas_ordenadas/mesclar_listas.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/mesclar_listas_ordenadas/mesclar_listas_ordenadas_test.pas)
- [Solução C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/mesclar_listas_ordenadas/mesclar_listas_ordenadas.cpp)
- [Testes C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/mesclar_listas_ordenadas/mesclar_listas_ordenadas_test.cpp)
- [Solução Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/mesclar_listas_ordenadas/mesclar_listas_ordenadas.go)
- [Testes Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/mesclar_listas_ordenadas/mesclar_listas_ordenadas_test.go)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/mesclar_listas_ordenadas.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#mesclar_listas_ordenadas.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/mesclar_listas_ordenadas/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/mesclar_listas_ordenadas/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=MesclarListasOrdenadasTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=MesclarListasOrdenadasTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "MesclarListasOrdenadasTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "MesclarListasOrdenadasTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter MesclarListasOrdenadasTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter MesclarListasOrdenadasTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes mesclar_listas_ordenadas
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### C++

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes mesclar_listas_ordenadas
```

Com Docker, todos os desafios de C++: `docker compose run --build --rm cpp`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Go

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm go sh executar.sh testes mesclar_listas_ordenadas
```

Com Docker, todos os desafios de Go: `docker compose run --build --rm go`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em C++

`No sentinela{0}` cria um nó local, fora do resultado. Os nós da saída pertencem às entradas; apenas suas ligações mudam. `<=` conserva a preferência pela primeira lista em empate. As entradas devem ser independentes, ordenadas e sem ciclos. A função não transfere a propriedade da memória. Os donos originais devem continuar vivos enquanto a lista mesclada for usada.

## Exemplo executável em C++

Da raiz, compile e execute no container:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh exemplo mesclar_listas_ordenadas
```

Este trecho faz parte de `_examples/main.cpp`, gerado com os headers de cada desafio. Os nomes estão no namespace `desafios`; `exigir` lança uma exceção se a resposta estiver incorreta:

```cpp
No tres{3}, quatro{4};
No um{1, &tres}, dois{2, &quatro};
No* resultado = mesclarListasOrdenadas(&um, &dois);
exigir(resultado == &um && um.proximo == &dois && dois.proximo == &tres && tres.proximo == &quatro);
std::cout << resultado->valor << '\n'; // 1; ligações: 1 → 2 → 3 → 4 → nullptr
```

Veja [o guia C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/cpp.md) para compilação, tipos, Unicode e propriedade da memória.
