# JavaScript

JavaScript é a primeira implementação completa. Usamos Node.js 24 ou superior para executar arquivos fora do navegador e módulos ESM (`import` e `export`) para compartilhar funções.

## Conceitos usados

- `const` impede trocar a referência de uma variável; o objeto ou array referenciado ainda pode mudar. `let` permite atribuir um novo valor.
- Arrays começam no índice zero. `numeros[0]` acessa o primeiro número; `length` é a quantidade de elementos.
- `Map` associa uma chave a um valor. Ele permite procurar complementos e contar caracteres.
- Uma pilha pode ser um array: `push` coloca no topo e `pop` remove o último elemento.
- Objetos são comparados por identidade com `===`. Dois nós de valor 1 continuam sendo objetos diferentes.
- `null` representa o fim de uma lista ou a ausência de uma solução, conforme o contrato.
- `for...of` em strings percorre pontos de código Unicode. `string.length` conta unidades UTF-16, e não necessariamente letras visuais ou pontos de código.
- `Number` representa inteiros exatamente até `Number.MAX_SAFE_INTEGER`. Por isso escadas aceita no máximo 77 degraus.

## Listas ligadas

Uma lista ligada é uma sequência de nós conectados por referências. Em `1 → 2 → 3 → null`, cada nó conhece somente o seguinte. `_shared/lista.js` define `No`, `criarLista` e `valoresDaLista` para os exemplos e testes.

```js
import { criarLista, valoresDaLista } from '../../src/javascript/_shared/lista.js';

const cabeca = criarLista([1, 2, 3]);
console.log(cabeca.valor); // 1
console.log(cabeca.proximo.valor); // 2
console.log(valoresDaLista(cabeca)); // [1, 2, 3]
```

O caminho do exemplo é relativo a um arquivo salvo em `docs/linguagens`. Na raiz, os comandos executáveis estão no README.

## Executar e testar

A partir da raiz: `npm ci` e `npm run test --workspace src/javascript`. Para um exercício: `node --test src/javascript/soma_de_dois/index.test.js`. O test runner é nativo do Node.js; `assert` compara o resultado observado com o esperado.

Os testes devem passar antes e depois de qualquer refatoração. Para investigar quais trechos foram executados, use `npm run test:coverage`. Leia o relatório junto com os casos testados: executar uma linha não garante que ela foi verificada corretamente.
