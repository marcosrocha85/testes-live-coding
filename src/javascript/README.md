# Microprojeto JavaScript

Os dez desafios estão implementados com módulos ESM e testes nativos do Node.js 24. Cada pasta contém solução, teste e explicação local. Não há dependências externas.

## Testes com Docker

Da raiz, sem instalar Node.js no computador:

```sh
docker compose run --build --rm javascript
```

O container executa todos os testes e é removido ao terminar. Leia [o guia Docker](../../docs/docker.md) para entender imagens e comandos.

## Execução local

A partir da raiz do repositório, com Node.js 24 ou superior:

```sh
npm ci
npm run test --workspace src/javascript
node --test src/javascript/soma_de_dois/index.test.js
```

Leia [os conceitos de JavaScript](../../docs/linguagens/javascript.md), [os contratos](../../docs/contratos.md) e [o catálogo dos desafios](../../docs/tests/README.md).

`_shared/lista.js` monta listas reais para os exemplos. `referencia.test.js` compara algumas soluções com algoritmos mais simples e independentes. O código das soluções não depende dos adaptadores de testes, exceto pela classe de nó usada pela mesclagem.
