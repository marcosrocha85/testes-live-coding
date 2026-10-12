# Microprojeto TypeScript

Os dez desafios têm soluções TypeScript, testes dos casos compartilhados e explicações dos tipos em cada README. As soluções usam a biblioteca padrão e preservam os contratos do JavaScript.

Use Node.js 24 ou superior. TypeScript 7.0.2 e os tipos de Node 24.19.2 são instalados pelo lockfile, sem instalação global.

Da raiz do repositório:

```sh
npm ci
npm run typecheck
npm run test --workspace src/typescript
```

Os testes compilam primeiro com `tsc` em modo estrito. O Node executa os arquivos em `src/typescript/dist`, ignorados pelo Git. O site exibe os arquivos `.ts` originais.

Para um desafio:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/busca_binaria/index.test.js
```

Leia [o guia de TypeScript](../../docs/linguagens/typescript.md) para entender instalação, tipos, tuplas, `null`, `readonly`, Unicode e precisão numérica. Veja [o catálogo](../../docs/tests/README.md) para escolher um problema e [o roteiro](../../docs/roadmap.md) para acompanhar as issues.
