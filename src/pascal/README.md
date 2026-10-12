# Pascal — dez desafios de live coding

Os dez desafios têm soluções próprias, testes dos casos compartilhados e explicações locais. Comece pelo [guia Pascal](../../docs/linguagens/pascal.md).

Da raiz, sem instalar compilador no computador:

```sh
docker compose run --build --rm pascal
```

O comando compila com **Free Pascal 3.2.2**, executa os **86 casos JSON**, as referências independentes e os dez exemplos. Compilação, testes e exemplos rodam como usuário sem privilégios; os fontes são copiados, sem montagem do checkout. O dialeto é Object Pascal, modo `objfpc`. RTL e FCL são da distribuição `3.2.2+dfsg-20` do Debian; não há dependências externas das soluções.

Um desafio ou um exemplo:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes busca_binaria
docker compose run --build --rm pascal sh src/pascal/executar.sh exemplo soma_de_dois
```

O exemplo imprime `0 1`. Com FPC 3.2.2 e suas units RTL/FCL já disponíveis em Linux, execute `sh src/pascal/executar.sh check`. No PowerShell, use os comandos Docker acima. `npm test` executa as linguagens Node e o gerador do site; Pascal tem sua própria suíte.

Cada pasta contém uma unit de solução, uma unit de teste e o README gerado. `_shared` reúne tipos, nós, mapa e leitura UTF-8. `_tests` contém o runner e as fixtures; `_examples/exemplos.pas` é gerado por `npm run docs`. Os artefatos de compilação ficam em `build`, ignorado pelo Git e pelo contexto Docker.
