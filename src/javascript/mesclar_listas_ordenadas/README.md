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
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/mesclar_listas_ordenadas.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#mesclar_listas_ordenadas.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/mesclar_listas_ordenadas/index.test.js
```

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/mesclar_listas_ordenadas/index.test.js
```
