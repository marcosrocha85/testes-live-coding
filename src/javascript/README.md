# Microprojeto JavaScript

Os dez desafios estão implementados com módulos ESM e testes nativos do Node.js 24. Cada pasta contém solução, teste e explicação local. Não há dependências externas.

A partir da raiz do repositório:

```sh
npm ci
npm run test --workspace src/javascript
node --test src/javascript/soma_de_dois/index.test.js
```

Leia [os conceitos de JavaScript](../../docs/linguagens/javascript.md), [os contratos](../../docs/contratos.md) e [o catálogo dos desafios](../../docs/tests/README.md).

`_shared/lista.js` monta listas reais para os exemplos. `referencia.test.js` compara algumas soluções com algoritmos mais simples e independentes. O código das soluções não depende dos adaptadores de testes, exceto pela classe de nó usada pela mesclagem.
