<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Soma de dois

Nome na entrevista: **Two Sum**. Pasta: `soma_de_dois`.

## Problema

Dado um array de números e um alvo, encontre dois índices diferentes cujos valores somem o alvo.

## Ideia

Mapa de complemento, uma passagem.

1. Leia um número e calcule quanto falta para chegar ao alvo.
2. Procure esse complemento entre os números já vistos.
3. Se encontrar, devolva os dois índices. Caso contrário, guarde o número e continue.

## Exemplo explicado

Em [2, 7, 11, 15], com alvo 9: guarde 2 no índice 0. Ao ler 7, falta 2. Como 2 já foi visto, a resposta é [0, 1].

```js
somaDeDois([2, 7, 11, 15], 9) // [0, 1]
```

## Por que pedir este teste?

Um par de laços resolve o problema, mas repete muitas comparações. O teste revela se o candidato sabe trocar memória por velocidade e escolher uma estrutura de busca adequada.

Capacidades avaliadas:

- Mapas e busca por chave
- Índices diferentes e duplicatas
- Comparação entre O(n²) e O(n)

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe numeros e alvo. Retorna [indiceAnterior, indiceAtual] ou null. Se houver várias soluções, retorna a primeira encontrada ao percorrer da esquerda para a direita, preservando o primeiro índice de cada valor. Não modifica o array.

## Complexidade

- Tempo: O(n) em média, considerando operações de mapa com custo médio constante.
- Espaço adicional: O(n).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Usar duas vezes a mesma posição
- Retornar valores em vez de índices
- Perder a primeira ocorrência de um número repetido

## Casos compartilhados

- **exemplo clássico**: entrada `{"numeros":[2,7,11,15],"alvo":9}`; saída `[0,1]`.
- **complemento no meio**: entrada `{"numeros":[3,2,4],"alvo":6}`; saída `[1,2]`.
- **valores iguais em índices distintos**: entrada `{"numeros":[3,3],"alvo":6}`; saída `[0,1]`.
- **negativos**: entrada `{"numeros":[-3,4,3,90],"alvo":0}`; saída `[0,2]`.
- **zeros**: entrada `{"numeros":[0,0],"alvo":0}`; saída `[0,1]`.
- **sem solução**: entrada `{"numeros":[1,2,3],"alvo":10}`; saída `null`.
- **não reutiliza uma posição**: entrada `{"numeros":[3],"alvo":6}`; saída `null`.
- **vazio**: entrada `{"numeros":[],"alvo":1}`; saída `null`.
- **preserva primeiro índice**: entrada `{"numeros":[1,1,4],"alvo":5}`; saída `[0,2]`.
- **primeira solução encontrada**: entrada `{"numeros":[1,2,3,4],"alvo":5}`; saída `[1,2]`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/soma_de_dois/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/soma_de_dois/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/soma_de_dois/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/soma_de_dois/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/soma_de_dois/SomaDeDois.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/soma_de_dois/SomaDeDoisTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/soma_de_dois/SomaDeDois.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/soma_de_dois/SomaDeDoisTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/soma_de_dois/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/soma_de_dois/SomaDeDoisTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/soma_de_dois/SomaDeDois.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/soma_de_dois/SomaDeDoisTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/soma_de_dois/soma_dois.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/soma_de_dois/soma_de_dois_test.pas)
- [Solução C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/soma_de_dois/soma_de_dois.cpp)
- [Testes C++](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/cpp/soma_de_dois/soma_de_dois_test.cpp)
- [Solução Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/soma_de_dois/soma_de_dois.go)
- [Testes Go](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/go/soma_de_dois/soma_de_dois_test.go)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/soma_de_dois.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#soma_de_dois.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/soma_de_dois/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/soma_de_dois/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=SomaDeDoisTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=SomaDeDoisTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "SomaDeDoisTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "SomaDeDoisTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter SomaDeDoisTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter SomaDeDoisTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes soma_de_dois
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### C++

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes soma_de_dois
```

Com Docker, todos os desafios de C++: `docker compose run --build --rm cpp`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Go

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm go sh executar.sh testes soma_de_dois
```

Com Docker, todos os desafios de Go: `docker compose run --build --rm go`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em Pascal

`const Numeros: array of Int64` recebe um array aberto, com índices desde zero e sem escrever nele. `TParIndices.Encontrado` distingue ausência de resposta; zero é um índice válido. O mapa próprio usa uma tabela hash com colisões por sondagem e redimensionamento. Guardar somente a primeira ocorrência preserva o contrato. `try/finally` libera o mapa mesmo no retorno antecipado.

## Exemplo executável em Pascal

Da raiz, compile e execute no container:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh exemplo soma_de_dois
```

Este trecho pertence ao programa gerado `_examples/exemplos.pas`. `Exigir` lança uma exceção se o exemplo produzir um resultado inesperado. As variáveis e units usadas estão declaradas no programa completo:

```pascal
Par := SomaDeDois([2, 7, 11, 15], 9);
Exigir(Par.Encontrado and (Par.Primeiro = 0) and (Par.Segundo = 1));
WriteLn(Par.Primeiro, ' ', Par.Segundo); // 0 1
```

Veja [o guia Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/pascal.md) para compilação, tipos, Unicode e gerenciamento de memória.
