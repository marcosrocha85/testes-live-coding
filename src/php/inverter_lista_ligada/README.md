<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Inverter lista ligada

Nome na entrevista: **Reverse Linked List**. Pasta: `inverter_lista_ligada`.

## Problema

Inverta a direção dos ponteiros de uma lista ligada e retorne sua nova cabeça.

## Ideia

Inverte os ponteiros no lugar.

1. Comece com anterior igual a null e atual na cabeça.
2. Salve o próximo nó antes de apontar atual para anterior.
3. Avance os dois ponteiros. O último nó visitado vira a nova cabeça.

## Exemplo explicado

Em 1 → 2 → 3 → null, salve 2 e faça 1 → null; depois 2 → 1; por fim 3 → 2. A nova cabeça é o nó 3.

```js
valoresDaLista(inverterListaLigada(criarLista([1, 2, 3]))) // [3, 2, 1]
```

## Por que pedir este teste?

A solução exige controlar referências sem perder o restante da lista. O teste distingue manipulação de nós de uma simples cópia dos valores para outro array.

Capacidades avaliadas:

- Referências e ponteiros
- Mutação cuidadosa
- Invariante de um laço e memória constante

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe cabeca, um nó com valor e proximo ou null. A lista não pode ter ciclo. Retorna a nova cabeça, reutiliza todos os nós e altera seus ponteiros. Uma lista vazia retorna null.

## Complexidade

- Tempo: O(n).
- Espaço adicional: O(1) na solução; o adaptador de teste usa memória adicional.

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Alterar a seta antes de salvar o próximo nó
- Criar nós novos em vez de reutilizar os existentes
- Esquecer que a cabeça muda

## Casos compartilhados

- **lista com três nós**: entrada `{"valores":[1,2,3]}`; saída `[3,2,1]`.
- **lista vazia**: entrada `{"valores":[]}`; saída `[]`.
- **nó único**: entrada `{"valores":[7]}`; saída `[7]`.
- **dois nós**: entrada `{"valores":[1,2]}`; saída `[2,1]`.
- **valores repetidos**: entrada `{"valores":[1,1,2]}`; saída `[2,1,1]`.
- **negativos**: entrada `{"valores":[-1,0,-2]}`; saída `[-2,0,-1]`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/inverter_lista_ligada/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/inverter_lista_ligada/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/inverter_lista_ligada/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/inverter_lista_ligada/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/inverter_lista_ligada/InverterListaLigada.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/inverter_lista_ligada/InverterListaLigadaTest.java)
- [Solução Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/inverter_lista_ligada/InverterListaLigada.kt)
- [Testes Kotlin](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/kotlin/inverter_lista_ligada/InverterListaLigadaTest.kt)
- [Solução PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/inverter_lista_ligada/index.php)
- [Testes PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/php/inverter_lista_ligada/InverterListaLigadaTest.php)
- [Solução Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/inverter_lista_ligada/InverterListaLigada.swift)
- [Testes Swift](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/swift/inverter_lista_ligada/InverterListaLigadaTest.swift)
- [Solução Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/inverter_lista_ligada/inverter_lista.pas)
- [Testes Pascal](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/pascal/inverter_lista_ligada/inverter_lista_ligada_test.pas)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/inverter_lista_ligada.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#inverter_lista_ligada.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/inverter_lista_ligada/index.test.js
```

Com Docker, todos os desafios de JavaScript: `docker compose run --build --rm javascript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/inverter_lista_ligada/index.test.js
```

Com Docker, todos os desafios de TypeScript: `docker compose run --build --rm typescript`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=InverterListaLigadaTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=InverterListaLigadaTest" test
```

Com Docker, todos os desafios de Java: `docker compose run --build --rm java`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Kotlin

Da raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests "InverterListaLigadaTest"
```

PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin test --tests "InverterListaLigadaTest"
```

Com Docker, todos os desafios de Kotlin: `docker compose run --build --rm kotlin`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### PHP

Da raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php test -- --filter InverterListaLigadaTest
```

Com Docker, todos os desafios de PHP: `docker compose run --build --rm php`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Swift

Da raiz do repositório, após `npm ci`:

```sh
swift test --package-path src/swift --jobs 2 --filter InverterListaLigadaTest
```

Com Docker, todos os desafios de Swift: `docker compose run --build --rm swift`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

### Pascal

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes inverter_lista_ligada
```

Com Docker, todos os desafios de Pascal: `docker compose run --build --rm pascal`. Veja [como executar sem SDK local](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/docker.md).

## Particularidades em PHP

`?No` aceita um objeto ou `null`. `->` acessa uma propriedade. Atribuir um objeto a outra variável conserva o mesmo objeto; não faz uma cópia. Por isso guardar `$seguinte` preserva o restante da lista e mudar `proximo` altera o nó original, mesmo sem usar `&`.

## Exemplo executável em PHP

Com PHP local, execute da raiz (sem instalar Composer para este exemplo):

```sh
php src/php/inverter_lista_ligada/exemplo.php
```

Ou dentro do container:

```sh
docker compose run --build --rm php php src/php/inverter_lista_ligada/exemplo.php
```

```php
<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\inverter_lista_ligada\inverterListaLigada;
use LiveCoding\Shared\No;

$cabeca = new No(1, new No(2, new No(3)));
$invertida = inverterListaLigada($cabeca);
echo $invertida->valor, PHP_EOL; // 3; as ligações são 3 → 2 → 1 → null
```

Veja [o guia de PHP](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/php.md) para ferramentas, tipos, Unicode e comandos.
