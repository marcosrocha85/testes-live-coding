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

PHP usa funções com namespaces e nós reais da classe `No`. As soluções são carregadas por `bootstrap.php`, sem bibliotecas externas ou servidor web. O microprojeto exige PHP 8.4 ou 8.5 de 64 bits; escadas e somas usam `int`, e subarray vazio usa `null`. Anagrama percorre UTF-8 por um gerador em `_shared/unicode.php`, preservando pontos completos e memória proporcional aos símbolos distintos.

Composer 2.9.8 instala PHPUnit 12.5.34 e dependências de teste do lockfile. A suíte lê os 86 JSON canônicos diretamente da raiz e acrescenta 20 testes de identidade, mutação, listas longas, precisão, tipos, Unicode e referências independentes. `composer --working-dir=src/php check` combina lint e testes. A CI testa PHP 8.4 e 8.5, e o Docker usa PHP 8.4.26. Pages também executa essa suíte antes de publicar. Os arquivos `exemplo.php` de cada desafio são gerados pela mesma fonte dos READMEs.

Swift usa Swift 6.3.3, Swift Package Manager e Swift Testing, sem pacotes externos. As soluções e os testes ficam nas dez pastas e são separados pelo manifesto; o executável de exemplos fica em `_examples`, gerado pela documentação. `Int` de 64 bits preserva somas e contagens; `No?` representa referências opcionais. Anagrama usa chaves `UInt32` de `unicodeScalars`, evitando grafemas e equivalência canônica de `String`. Nós reais usam referências fortes e os testes quebram ciclos com `defer` para liberar memória por ARC.

A suíte Swift lê diretamente os 86 casos JSON da raiz e acrescenta 21 testes específicos e de referências independentes, totalizando 107 execuções. A CI testa Swift em Linux, macOS e no Docker do microprojeto; Pages roda Docker Swift antes de publicar. A imagem oficial tem digest fixado, executa sem privilégios e não monta o checkout. Artefatos `.build` e `.swiftpm` ficam fora do Git e do contexto. Nenhum SDK Swift é necessário no host.

Pascal usa Free Pascal 3.2.2 em modo Object Pascal, com uma unit de solução e uma unit de teste por pasta. `_shared` contém tipos opcionais, nós reais (`PNo`), tabela hash e leitura UTF-8 por pontos de código. As somas e contagens usam `Int64`. O parser dos testes é `fpjson` da FCL; os executáveis inicializam `fpwidestring` para preservar Unicode no container mínimo. Não há dependências externas das soluções.

O runner Pascal lê os 86 casos JSON e compara os algoritmos com referências independentes, incluindo combinatória para todo o domínio de escadas. Confere identidade, estabilidade, mutação e listas longas; `heaptrc` faz vazamentos falharem. `compilar.sh` trata avisos como erros e ativa verificações de limites e overflow. Docker fixa Debian por digest e os pacotes FPC/RTL/FCL em `3.2.2+dfsg-20`; compilação, testes e dez exemplos rodam como usuário sem privilégios. A CI inclui Pascal pela matriz do catálogo e Pages executa a mesma suíte antes de publicar. Não há compilador instalado no host nem montagem do checkout.

C++ usa C++20 e GCC 15.2.0 na imagem oficial fixada por digest. Cada pasta tem solução `.cpp`, header `.hpp` e teste `*_test.cpp`. As soluções usam somente a biblioteca padrão, `int64_t` para somas e contagens e `optional` para ausência. `No*` liga nós reais sem possuir a memória; fixtures usam um `unique_ptr` por nó, permitindo liberar listas longas e cíclicas sem recursão. Anagrama lê pontos UTF-8 completos em `char32_t`.

O runner C++ consome os 86 JSON com nlohmann JSON 3.12.0, dependência apenas dos testes, cujo header é verificado por SHA-256. Referências independentes conferem os dez algoritmos; a suíte inclui identidade, estabilidade, mutação, listas longas, inteiros exatos e todos os pontos escalares Unicode. Avisos são erros e ASan/UBSan com detecção de vazamentos fazem falhas de memória encerrarem os testes. A CI compila diretamente na imagem GCC como usuário sem privilégios e executa também o serviço Compose; Pages testa o mesmo serviço antes da publicação. Não há SDK instalado no host, montagem do checkout ou volume de cache C++.

Go usa um módulo independente, fixado em Go 1.27.2, com um package por pasta de desafio. As funções e seus `*_test.go` ficam juntos; os testes usam packages externos, `testing` e `encoding/json` da biblioteca padrão. `lista/no.go` fornece nós reais com campos exportados e identidade por ponteiro. `int64` mantém valores, somas e contagens exatos; ausência usa `ok` ou `nil`, e escadas retorna `error`. Anagrama conta runes com `range`, sem normalização.

Os testes Go leem diretamente os 86 JSON e comparam referências independentes por enumeração, ordenação, remoção de pares, combinatória com `math/big` e conjunto de visitados. Conferem mutação, identidade, estabilidade, listas longas, Unicode e precisão. `executar.sh check` verifica a versão exata, gofmt, go vet, executa a suíte com detector de corridas, repete em 32 bits e compila e executa dez exemplos gerados. Docker copia fontes, executa como usuário sem privilégios e não monta o checkout. A CI inclui Go pela matriz do catálogo e Pages executa o serviço antes de publicar. Não há dependências externas, SDK instalado no host ou volume de cache Go.

## Uma fonte para as explicações

`docs/catalogo.json` guarda nomes, problemas, ideias, contratos, raciocínio e capacidades avaliadas. `docs/casos/*.json` guarda entradas e resultados independentes do código da solução. `npm run docs` gera os documentos em `docs/tests`, os READMEs dos desafios das linguagens implementadas e a projeção em `docs/wiki`. Os READMEs TypeScript, Java, Kotlin, PHP, Swift, Pascal, C++ e Go acrescentam explicações dos tipos e exemplos; o gerador mantém links e comandos das nove linguagens. Para PHP, Swift, Pascal, C++ e Go, também gera exemplos executáveis e verifica sua atualização em `docs:check`. `scripts/pascal-docs.mjs` mantém os trechos Pascal; `scripts/cpp-docs.mjs` mantém os trechos de `_examples/main.cpp` e dos READMEs C++; `scripts/go-docs.mjs` mantém os trechos de `cmd/exemplos/main.go` e dos READMEs Go.

`npm run docs:check` compara o conteúdo esperado com o versionado. A CI falha se uma explicação gerada estiver desatualizada. Documentos de arquitetura e linguagens são escritos diretamente em Markdown.

## Site

`npm run build` lê o catálogo, os casos e os arquivos de implementação e gera um site estático em `dist`. A interface em `docs/site` permite selecionar o exercício, ler o raciocínio e trocar a aba da linguagem. O código é mostrado como texto; não é executado no navegador.

O destaque de sintaxe usa [highlight.js](https://highlightjs.org/) 11.12.0 somente no build. `scripts/highlight-code.mjs` registra explicitamente as nove linguagens do roteiro, incluindo a gramática Delphi para Pascal e a gramática Go. O catálogo publicado mantém o código original em `code`, usado pelo botão de copiar, e acrescenta `highlightedCode` com a marcação escapada de cores. Soluções e auxiliares usam o mesmo tema em `docs/site/style.css`. A página não precisa baixar um realçador ou consultar uma CDN; se a marcação não estiver disponível, mostra o texto original.

Uma linguagem disponível precisa declarar `status: "implemented"` e pode informar `solutionFiles`, um mapa de ID do desafio para arquivo relativo à raiz, quando a organização da linguagem não seguir `src/<id>/<desafio>/index.<extensão>`. O gerador rejeita caminhos fora de `src/<id>/` e exige os dez arquivos. Linguagens planejadas mostram a issue e não anunciam código existente.

O conteúdo publicado é obtido de arquivos reais, sem cópias manuais de código dentro de HTML. Para as nove linguagens implementadas, o site oferece os auxiliares necessários. A aba TypeScript mostra `.ts`; Java, `.java`; Kotlin, `.kt`; PHP, `.php`; Swift, `.swift`; Pascal, `.pas`; C++, `.cpp` e seu header `.hpp`; Go, `.go` e `lista/no.go` nos três desafios de listas. C++ também apresenta nós nas listas e o leitor UTF-8 no anagrama. O resumo de linguagens disponíveis é calculado pelo catálogo. As abas mostram o nome da linguagem sem bolinhas e mantêm seleção por teclado e rótulos acessíveis. `testFiles` indica caminhos dos testes quando o nome não segue `index.test.<extensão>`. `exerciseTestCommand` permite indicar o comando de um desafio usando `{testClass}` como marcador; Go usa o ID da pasta em seu script.

Acrescente uma lista `supportFiles` no catálogo para auxiliares usados em todos os desafios, ou um mapa `supportFilesByExercise` para arquivos específicos de cada desafio. Java, Kotlin, PHP, Swift e Pascal usam esse mapa para mostrar seus nós apenas nos três desafios de listas ligadas. PHP acrescenta `unicode.php` somente no anagrama. Pascal também declara tipos em soma e subarray, mapa em soma e anagrama e leitura UTF-8 no anagrama. O gerador verifica que cada auxiliar pertence ao microprojeto da linguagem.

## Testes por microprojeto em Docker

Cada linguagem implementada possui `src/<id>/Dockerfile` e um serviço de mesmo ID no `compose.yaml`. Todos usam a raiz como contexto de build para acessar os casos canônicos e, quando necessário, o lockfile compartilhado. `.dockerignore` limita o contexto aos fontes, manifests e casos, excluindo builds e dependências locais.

JavaScript e TypeScript reutilizam a mesma imagem Node, com comandos e imagens de teste separados. TypeScript instala apenas as dependências do seu workspace. Java usa uma imagem JDK e seu próprio Maven Wrapper. Os fontes são copiados para a imagem e os testes rodam sem privilégios de administrador; não há checkout montado com escrita. Arquivos compilados são descartados junto com o container. Kotlin usa a mesma base JDK 21 com Gradle Wrapper. Os caches Maven e Gradle persistem em volumes separados do projeto; os builds são descartados com os containers. PHP copia Composer de uma imagem oficial e instala dependências pelo lockfile em uma camada da imagem; não precisa de volume de cache.

`dockerTestCommand` documenta a execução de cada linguagem no catálogo e nas explicações geradas. A CI calcula a matriz Docker pelos IDs com `status: "implemented"` e executa cada serviço com `--build --rm`. Um novo microprojeto não pode ser anunciado como pronto sem Dockerfile, serviço, documentação e testes em container. A execução nativa continua disponível. Veja [o guia Docker](docker.md).

## GitHub Pages e Wiki

A CI executa testes, verifica documentação e gera o site nas PRs. O workflow Pages publica `dist` após um push na `main`, com permissões declaradas por job. O job de build recebe `contents: read` e `pages: write` para configurar o site; o job de implantação recebe `pages: write` e `id-token: write` para publicar o artefato. Habilite Pages com origem GitHub Actions nas configurações do repositório.

GitHub Wiki usa outro repositório Git, com sufixo `.wiki.git`. Antes de publicá-la pela primeira vez, crie a página Home na interface do GitHub. Depois execute `scripts/publish-wiki.ps1`, que gera os documentos, clona a Wiki em uma pasta temporária e atualiza somente as páginas geradas. O script não apaga páginas adicionais. O catálogo do Pages e `docs/tests` podem ser usados mesmo sem a Wiki inicializada.

## Evolução

Cada linguagem tem uma issue principal e dez sub-issues reais. O roteiro preserva a ordem desejada; não há um porte parcial anunciado como linguagem pronta. Novos desafios começam por uma issue com escopo e critérios de aceitação, depois ganham contrato, casos, documentação e implementações.
