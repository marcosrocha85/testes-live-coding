# Microprojeto PHP

Dez desafios com funções independentes, objetos reais nas listas ligadas, explicações e **106 testes PHPUnit**: 86 casos canônicos e 20 verificações extras. Use PHP 8.4 ou 8.5 de 64 bits. Composer 2.9.8 e PHPUnit 12.5.34 têm dependências registradas em `composer.lock`.

## Com Docker

Da raiz do clone, sem instalar PHP ou Composer no computador:

```sh
docker compose run --build --rm php
```

O serviço usa PHP 8.4.26 de 64 bits, imagem oficial fixada por digest e usuário sem privilégios. Confere a sintaxe e executa a suíte completa. Copia os fontes, sem montar o checkout. Dependências ficam nas camadas da imagem; não há cache PHP em volume. Veja [o guia Docker](../../docs/docker.md).

Só busca binária:

```sh
docker compose run --build --rm php composer --working-dir=src/php test -- --filter BuscaBinariaTest
```

Exemplo de soma de dois:

```sh
docker compose run --build --rm php php src/php/soma_de_dois/exemplo.php
```

## Com PHP local

Com PHP de 64 bits e Composer, da raiz (PowerShell, Linux ou macOS):

```sh
composer --working-dir=src/php install
composer --working-dir=src/php check
```

O PHPUnit precisa de `dom`, `json`, `libxml`, `mbstring`, `xml` e `xmlwriter`. A imagem Docker já contém essas extensões. O comando `check` combina lint e testes; `test` executa só PHPUnit. `npm test` não executa esta linguagem.

Para estudar sem instalar as dependências de teste:

```sh
php src/php/soma_de_dois/exemplo.php
```

## Organização

- `<desafio>/index.php`: solução com comentários curtos.
- `<desafio>/*Test.php`: testes dos casos compartilhados e verificações adicionais.
- `<desafio>/exemplo.php`: exemplo executável gerado por `npm run docs`, como o README.
- `_shared/No.php`: nó real; `_shared/unicode.php`: leitura de pontos de código UTF-8.
- `_tests/`: adaptadores dos JSON e referências de teste independentes.
- `bootstrap.php`: carrega as soluções sem precisar de Composer.
- `_tools/lint.php`: verifica sintaxe dos arquivos próprios, excluindo dependências.

PHPUnit é dependência somente de desenvolvimento. Os testes usam `assertSame` para preservar tipos e conferir identidade de objetos. Escadas e subarray usam inteiros de 64 bits; anagrama conta pontos de código, sem normalizar acentos.

Leia [PHP para iniciantes](../../docs/linguagens/php.md), [os contratos](../../docs/contratos.md) e [o roteiro](../../docs/roadmap.md). A entrega corresponde à [issue #45](https://github.com/marcosrocha85/testes-live-coding/issues/45) e suas dez sub-issues.
