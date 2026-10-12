# Arquitetura

O repositório separa soluções executáveis (`src`) de material de estudo (`docs`). Cada diretório de linguagem é um microprojeto com testes próprios. As implementações compartilham contratos e casos, não dependências de execução.

## Microprojetos

JavaScript usa módulos ESM e o test runner nativo do Node.js 24. Cada uma das dez pastas contém `index.js`, `index.test.js` e `README.md`. `_shared/lista.js` oferece nós reais e adaptadores para montar listas nos testes. `referencia.test.js` compara alguns algoritmos com buscas exaustivas independentes e dados reproduzíveis.

TypeScript tem dez soluções e testes próprios, compilados pelo TypeScript 7.0.2 com `strict` e `noUncheckedIndexedAccess`. `No | null` descreve os nós e o fim das listas; arrays numéricos são recebidos como `readonly`. O compilador produz JavaScript ESM em `src/typescript/dist`, ignorado pelo Git. O Node executa esses testes compilados e um teste de consumo por JavaScript. Os casos compartilhados são lidos da raiz do repositório, independentemente do diretório de execução.

`npm test` executa os dois workspaces e os testes do gerador do site. A CI e o workflow Pages usam esse comando, portanto erros de tipos ou testes TypeScript impedem a publicação. `npm run typecheck` verifica os tipos sem gerar arquivos. As soluções TypeScript não importam as soluções JavaScript.

Java tem um microprojeto Maven independente dos workspaces npm. As soluções e os testes ficam juntos nas pastas dos desafios; o plugin de compilação separa `*Test.java` e `_tests` do código de produção. O JDK compila para Java 21. JUnit 6.0.3 e Gson 2.14.0 são dependências somente de teste. O Maven copia os JSON canônicos como recursos, e os testes também verificam referências, Unicode e precisão em `long` e `BigInteger`. O Maven Wrapper fixa a versão 3.9.16 e confere o SHA-256 da distribuição.

A CI testa Java em JDK 21 e 25, além do job Node. O workflow Pages executa a suíte Java com JDK 21 antes de publicar. Os arquivos gerados ficam em `src/java/target` e não são versionados. As implementações Java não dependem de JavaScript ou TypeScript.

Kotlin/JVM usa funções no topo do arquivo, `No?` para listas e `Long` para somas e contagens grandes. Cada pasta mantém solução e `*Test.kt` juntas; o Gradle separa os source sets para que os testes não entrem no JAR. O build fixa Kotlin 2.4.21, Gradle Wrapper 9.7.0 com SHA-256 e toolchain JDK 21. JUnit 6.0.3 e Gson 2.14.0 são dependências de teste; a biblioteca padrão Kotlin atende as soluções. Os JSON canônicos são recursos de teste copiados de `docs/casos`.

Os 102 testes Kotlin incluem identidade e mutação de nós, listas longas, precisão, Unicode, combinações exatas para escadas e referências independentes. A CI tem um job nativo JVM 21 e um serviço Docker Kotlin na matriz. Pages também executa o Wrapper antes de publicar. Nenhum SDK Kotlin é necessário no host para validar por Docker. As soluções Kotlin não importam as soluções Java.

Os outros quatro diretórios contêm somente a indicação da etapa planejada. Ao implementar um deles, escolha o runner adequado, declare a versão da ferramenta, adicione a execução na CI e mantenha a solução independente das outras linguagens.

## Uma fonte para as explicações

`docs/catalogo.json` guarda nomes, problemas, ideias, contratos, raciocínio e capacidades avaliadas. `docs/casos/*.json` guarda entradas e resultados independentes do código da solução. `npm run docs` gera os documentos em `docs/tests`, os READMEs dos desafios das linguagens implementadas e a projeção em `docs/wiki`. Os READMEs TypeScript, Java e Kotlin acrescentam explicações dos tipos e exemplos; o gerador mantém links e comandos das quatro linguagens.

`npm run docs:check` compara o conteúdo esperado com o versionado. A CI falha se uma explicação gerada estiver desatualizada. Documentos de arquitetura e linguagens são escritos diretamente em Markdown.

## Site

`npm run build` lê o catálogo, os casos e os arquivos de implementação e gera um site estático em `dist`. A interface em `docs/site` permite selecionar o exercício, ler o raciocínio e trocar a aba da linguagem. O código é mostrado como texto; não é executado no navegador.

O destaque de sintaxe usa [highlight.js](https://highlightjs.org/) 11.12.0 somente no build. `scripts/highlight-code.mjs` registra explicitamente as oito linguagens do roteiro, incluindo a gramática Delphi para Pascal. O catálogo publicado mantém o código original em `code`, usado pelo botão de copiar, e acrescenta `highlightedCode` com a marcação escapada de cores. Soluções e auxiliares usam o mesmo tema em `docs/site/style.css`. A página não precisa baixar um realçador ou consultar uma CDN; se a marcação não estiver disponível, mostra o texto original.

Uma linguagem disponível precisa declarar `status: "implemented"` e pode informar `solutionFiles`, um mapa de ID do desafio para arquivo relativo à raiz, quando a organização da linguagem não seguir `src/<id>/<desafio>/index.<extensão>`. O gerador rejeita caminhos fora de `src/<id>/` e exige os dez arquivos. Linguagens planejadas mostram a issue e não anunciam código existente.

O conteúdo publicado é obtido de arquivos reais, sem cópias manuais de código dentro de HTML. Para as quatro linguagens implementadas, o site também oferece o código do auxiliar de listas ligadas usado por alguns desafios. A aba TypeScript mostra o `.ts` com suas anotações; Java mostra a classe `.java`; Kotlin mostra a função `.kt` original. O resumo de linguagens disponíveis é calculado pelo catálogo. `testFiles` indica caminhos dos testes quando o nome não segue `index.test.<extensão>`. `exerciseTestCommand` permite indicar o comando de um desafio usando `{testClass}` como marcador.

Acrescente uma lista `supportFiles` no catálogo para auxiliares usados em todos os desafios, ou um mapa `supportFilesByExercise` para arquivos específicos de cada desafio. Java e Kotlin usam esse mapa para mostrar `No.java` e `No.kt` apenas nos três desafios de listas ligadas. O gerador verifica que cada auxiliar pertence ao microprojeto da linguagem.

## Testes por microprojeto em Docker

Cada linguagem implementada possui `src/<id>/Dockerfile` e um serviço de mesmo ID no `compose.yaml`. Todos usam a raiz como contexto de build para acessar os casos canônicos e, quando necessário, o lockfile compartilhado. `.dockerignore` limita o contexto aos fontes, manifests e casos, excluindo builds e dependências locais.

JavaScript e TypeScript reutilizam a mesma imagem Node, com comandos e imagens de teste separados. TypeScript instala apenas as dependências do seu workspace. Java usa uma imagem JDK e seu próprio Maven Wrapper. Os fontes são copiados para a imagem e os testes rodam sem privilégios de administrador; não há checkout montado com escrita. Arquivos compilados são descartados junto com o container. Kotlin usa a mesma base JDK 21 com Gradle Wrapper. Os caches Maven e Gradle persistem em volumes separados do projeto; os builds são descartados com os containers.

`dockerTestCommand` documenta a execução de cada linguagem no catálogo e nas explicações geradas. A CI calcula a matriz Docker pelos IDs com `status: "implemented"` e executa cada serviço com `--build --rm`. Um novo microprojeto não pode ser anunciado como pronto sem Dockerfile, serviço, documentação e testes em container. A execução nativa continua disponível. Veja [o guia Docker](docker.md).

## GitHub Pages e Wiki

A CI executa testes, verifica documentação e gera o site nas PRs. O workflow Pages publica `dist` após um push na `main`, com permissões declaradas por job. O job de build recebe `contents: read` e `pages: write` para configurar o site; o job de implantação recebe `pages: write` e `id-token: write` para publicar o artefato. Habilite Pages com origem GitHub Actions nas configurações do repositório.

GitHub Wiki usa outro repositório Git, com sufixo `.wiki.git`. Antes de publicá-la pela primeira vez, crie a página Home na interface do GitHub. Depois execute `scripts/publish-wiki.ps1`, que gera os documentos, clona a Wiki em uma pasta temporária e atualiza somente as páginas geradas. O script não apaga páginas adicionais. O catálogo do Pages e `docs/tests` podem ser usados mesmo sem a Wiki inicializada.

## Evolução

Cada linguagem tem uma issue principal e dez sub-issues reais. O roteiro preserva a ordem desejada; não há um porte parcial anunciado como linguagem pronta. Novos desafios começam por uma issue com escopo e critérios de aceitação, depois ganham contrato, casos, documentação e implementações.
