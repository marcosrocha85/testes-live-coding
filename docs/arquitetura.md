# Arquitetura

O repositório separa soluções executáveis (`src`) de material de estudo (`docs`). Cada diretório de linguagem é um microprojeto com testes próprios. As implementações compartilham contratos e casos, não dependências de execução.

## Microprojetos

JavaScript usa módulos ESM e o test runner nativo do Node.js 24. Cada uma das dez pastas contém `index.js`, `index.test.js` e `README.md`. `_shared/lista.js` oferece nós reais e adaptadores para montar listas nos testes. `referencia.test.js` compara alguns algoritmos com buscas exaustivas independentes e dados reproduzíveis.

TypeScript tem dez soluções e testes próprios, compilados pelo TypeScript 7.0.2 com `strict` e `noUncheckedIndexedAccess`. `No | null` descreve os nós e o fim das listas; arrays numéricos são recebidos como `readonly`. O compilador produz JavaScript ESM em `src/typescript/dist`, ignorado pelo Git. O Node executa esses testes compilados e um teste de consumo por JavaScript. Os casos compartilhados são lidos da raiz do repositório, independentemente do diretório de execução.

`npm test` executa os dois workspaces e os testes do gerador do site. A CI e o workflow Pages usam esse comando, portanto erros de tipos ou testes TypeScript impedem a publicação. `npm run typecheck` verifica os tipos sem gerar arquivos. As soluções TypeScript não importam as soluções JavaScript.

Os outros seis diretórios contêm somente a indicação da etapa planejada. Ao implementar um deles, escolha o runner adequado, declare a versão da ferramenta, adicione a execução na CI e mantenha a solução independente das outras linguagens.

## Uma fonte para as explicações

`docs/catalogo.json` guarda nomes, problemas, ideias, contratos, raciocínio e capacidades avaliadas. `docs/casos/*.json` guarda entradas e resultados independentes do código da solução. `npm run docs` gera os documentos em `docs/tests`, os READMEs dos desafios das linguagens implementadas e a projeção em `docs/wiki`. Os READMEs TypeScript acrescentam explicações dos tipos; o gerador mantém links e comandos de ambas as linguagens.

`npm run docs:check` compara o conteúdo esperado com o versionado. A CI falha se uma explicação gerada estiver desatualizada. Documentos de arquitetura e linguagens são escritos diretamente em Markdown.

## Site

`npm run build` lê o catálogo, os casos e os arquivos de implementação e gera um site estático em `dist`. A interface em `docs/site` permite selecionar o exercício, ler o raciocínio e trocar a aba da linguagem. O código é mostrado como texto; não é executado no navegador.

Uma linguagem disponível precisa declarar `status: "implemented"` e pode informar `solutionFiles`, um mapa de ID do desafio para arquivo relativo à raiz, quando a organização da linguagem não seguir `src/<id>/<desafio>/index.<extensão>`. O gerador rejeita caminhos fora de `src/<id>/` e exige os dez arquivos. Linguagens planejadas mostram a issue e não anunciam código existente.

O conteúdo publicado é obtido de arquivos reais, sem cópias manuais de código dentro de HTML. Para JavaScript e TypeScript, o site também oferece o código do auxiliar de listas ligadas usado por alguns desafios. A aba TypeScript mostra o `.ts` com suas anotações, não o JavaScript compilado. O resumo de linguagens disponíveis é calculado pelo catálogo. Acrescente uma lista `supportFiles` no catálogo para divulgar auxiliares de outras linguagens.

## GitHub Pages e Wiki

A CI executa testes, verifica documentação e gera o site nas PRs. O workflow Pages publica `dist` após um push na `main`, com permissões declaradas por job. O job de build recebe `contents: read` e `pages: write` para configurar o site; o job de implantação recebe `pages: write` e `id-token: write` para publicar o artefato. Habilite Pages com origem GitHub Actions nas configurações do repositório.

GitHub Wiki usa outro repositório Git, com sufixo `.wiki.git`. Antes de publicá-la pela primeira vez, crie a página Home na interface do GitHub. Depois execute `scripts/publish-wiki.ps1`, que gera os documentos, clona a Wiki em uma pasta temporária e atualiza somente as páginas geradas. O script não apaga páginas adicionais. O catálogo do Pages e `docs/tests` podem ser usados mesmo sem a Wiki inicializada.

## Evolução

Cada linguagem tem uma issue principal e dez sub-issues reais. O roteiro preserva a ordem desejada; não há um porte parcial anunciado como linguagem pronta. Novos desafios começam por uma issue com escopo e critérios de aceitação, depois ganham contrato, casos, documentação e implementações.
