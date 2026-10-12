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

## Lendo os tipos desta solução

Os ponteiros têm tipo `No | null`. As verificações no laço permitem acessar seus campos com segurança. `lento === rapido` compara referências aos próprios objetos. O tipo do valor do nó não determina se existe um ciclo.

Veja [o guia de TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/typescript.md) para instalação, compilação e conceitos.
