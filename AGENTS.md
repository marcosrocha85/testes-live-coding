# Orientações para contribuir

Este repositório é um guia de estudo de live coding para iniciantes. A prioridade é código correto, idiomático e explicado com palavras simples. Os dez desafios iniciais estão em `docs/catalogo.json`; novos desafios entram por GitHub Issues.

## Estrutura e conteúdo

- `src/<linguagem>/<desafio>/`: solução, testes e README local. Preserve os nomes de pasta dos desafios.
- `docs/`: arquitetura, contratos, casos compartilhados, conceitos das linguagens e fontes da Wiki e do site.
- `scripts/`: geração de documentação e GitHub Pages.
- Não marque uma linguagem como implementada antes de concluir seus dez desafios, testes, instruções e CI.
- Toda linguagem implementada deve ter seu próprio `src/<linguagem>/Dockerfile`, um serviço de mesmo ID no `compose.yaml` e um comando de teste Docker documentado. Essa entrega é obrigatória para cada novo microprojeto, inclusive Kotlin e as próximas linguagens.
- Trabalhe uma linguagem por vez, na ordem do roteiro em `docs/roadmap.md`. C++ é a linguagem escolhida para a família C.
- Os diretórios planejados podem conter apenas README. Não publique soluções fictícias ou testes sem implementação como concluídos.

## Código e explicações

- Use comentários curtos em português para explicar decisões, invariantes e pontos difíceis. Não descreva apenas o que a linha já diz.
- Explique problema, entrada, saída, ideia, passo a passo, exemplo, complexidade, erros comuns e capacidades avaliadas.
- Preserve os contratos em `docs/tests/` e os casos JSON em `docs/casos/`. Mudanças de contrato precisam de justificativa na issue e atualização de todos os portes afetados.
- Implemente estruturas reais quando o exercício as exige. Não substitua listas ligadas por arrays na solução; arrays são apenas o formato de entrada dos testes.
- Não adicione dependências só para resolver um exercício que usa a biblioteca padrão.
- Documente precisão de inteiros, Unicode, mutação e tratamento de entradas vazias em cada linguagem.

## Testes e validação

- Toda implementação precisa de testes automatizados executáveis e integração na CI.
- Consuma os casos compartilhados e acrescente verificações específicas da linguagem. Não copie a lógica da solução para calcular o resultado esperado.
- Confira identidade de nós e mutação dos ponteiros nos exercícios de listas ligadas.
- Para a base atual, use Node.js 24 ou superior: `npm ci`, `npm test`, `npm run docs:check`, `npm run build`.
- Para Java, use JDK 21 ou superior e execute `./src/java/mvnw -f src/java/pom.xml clean verify` (Linux/macOS) ou `.\src\java\mvnw.cmd -f src/java/pom.xml clean verify` (PowerShell). `npm test` não executa os testes Java.
- Para Kotlin, prefira `docker compose run --build --rm kotlin`, sem instalar SDK no host. Com JDK 21 local, execute `./src/kotlin/gradlew --no-daemon -p src/kotlin clean check jar` ou `.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin clean check jar` no PowerShell. O Wrapper fixa Gradle e verifica o SHA-256. `npm test` não executa os testes Kotlin.
- `npm run test:coverage` ajuda a investigar cobertura; cobertura não substitui testes que detectem erros reais.
- Para PHP, prefira `docker compose run --build --rm php`. Com PHP 8.4 ou 8.5 de 64 bits e Composer local, use `composer --working-dir=src/php install` e `composer --working-dir=src/php check`. Preserve `composer.lock`; PHPUnit é dependência apenas dos testes. `npm test` não executa PHP. O gerador mantém também os arquivos `exemplo.php` dos desafios; não os edite manualmente.
- Para Swift, prefira `docker compose run --build --rm swift`, sem instalar SDK no host. Com Swift 6.3.3 de 64 bits local, use `swift test --package-path src/swift --jobs 2 -Xswiftc -warnings-as-errors`. Preserve contagem por `unicodeScalars` e identidade de nós com `===`; desfaça ciclos nas fixtures após a consulta para liberar memória por ARC. O gerador mantém `_examples/main.swift`; não o edite manualmente. `npm test` não executa Swift.
- Atualize `docs/catalogo.json` e execute `npm run docs` quando mudar as explicações. Não edite manualmente os arquivos gerados indicados no cabeçalho.
- Para Pascal, use `docker compose run --build --rm pascal`, sem instalar compilador no host. Free Pascal 3.2.2 usa `{$mode objfpc}`, `Int64` nas somas e `UTF8String` com leitura de pontos completos. O runner inicializa `fpwidestring` antes de ler JSON, trata avisos como erros, verifica limites/overflow e falha por vazamentos com `heaptrc`. O comando padrão testa também os dez exemplos. `npm test` não executa Pascal. O gerador mantém `_examples/exemplos.pas` a partir de `scripts/pascal-docs.mjs`; não edite o arquivo gerado manualmente.
- Antes de concluir, registre na issue ou PR o que mudou e quais comandos passaram. Não afirme ter executado compiladores ou testes que não foram executados.
- Para C++, use `docker compose run --build --rm cpp`, sem instalar compilador no host. O microprojeto fixa C++20 e GCC 15.2.0 na imagem oficial por digest. `sh src/cpp/executar.sh check` compila com avisos como erros, ASan/UBSan e detecção de vazamentos e valida os dez exemplos. Preserve `json.sha256` e nlohmann JSON 3.12.0, usados apenas nos testes. As soluções usam `int64_t`, UTF-8 por pontos completos e ligações `No*` sem propriedade da memória; cada dono deve viver até o fim do uso da lista. O gerador mantém `_examples/main.cpp` a partir de `scripts/cpp-docs.mjs`. `npm test` não executa C++.
- Para Go, use `docker compose run --build --rm go`, sem instalar SDK no host. O microprojeto fixa Go 1.27.2 no módulo, no script e na imagem oficial por digest; `GOTOOLCHAIN=local` impede baixar outra toolchain. `sh src/go/executar.sh check` exige gofmt, executa go vet, a suíte completa com detector de corridas, testes em 32 bits e os dez exemplos compilados, como usuário sem privilégios. Use `int64` para valores, somas e contagens; `int` apenas para índices e tamanhos. Preserve `range`/`rune` sem normalização no anagrama e identidade por `*lista.No` nas listas. Ausência usa `ok=false` ou `nil`; escadas retorna `ErrDegrausInvalidos` e mantém 0 a 77. O gerador mantém `cmd/exemplos/main.go` a partir de `scripts/go-docs.mjs`; não edite o arquivo gerado. `npm test` não executa Go.

## Containers de teste

- Para validar sem instalar SDKs no computador, use `docker compose run --build --rm <linguagem>` da raiz. Execute os mesmos casos e testes da execução nativa; não mantenha uma suíte reduzida só para Docker.
- Use imagens oficiais com digest fixado, ferramentas e dependências versionadas. O contexto de build é a raiz para incluir `docs/casos` e lockfiles; mantenha `.dockerignore` atualizado para excluir artefatos locais.
- Copie os fontes para a imagem e compile dentro do container, como usuário sem privilégios. Não monte o checkout com escrita nem exija um compilador instalado no host.
- Containers devem terminar com o resultado dos testes e ser removidos com `--rm`. Não crie serviços permanentes, portas ou dependências de outras linguagens para executar os testes de um microprojeto.
- Caches podem persistir em volumes Docker exclusivos do projeto; documente sua finalidade e limpeza. Não remova caches ou containers de outros projetos.
- Ao adicionar uma linguagem, registre `dockerTestCommand` no catálogo, documente no README do microprojeto e em `docs/docker.md`, e valide o comando real antes de marcar `status: "implemented"`. A CI descobre os IDs implementados no catálogo e exige que seus serviços Docker passem.

## GitHub e publicação

- Use branches com prefixo `codex/` e PRs para revisão por Marcos Rocha.
- Cada linguagem tem uma issue principal e dez sub-issues reais, uma por desafio. Vincule a PR às sub-issues concluídas.
- Novos exercícios usam o template de issue e precisam de contrato, capacidades avaliadas e casos de borda antes da implementação.
- O site é gerado a partir do catálogo e dos arquivos reais das soluções. Abas de linguagens planejadas devem mostrar o status pendente e a issue correspondente.
- `docs/wiki/` contém a projeção para a Wiki; publique com `scripts/publish-wiki.ps1` quando a primeira página da Wiki já existir. Não duplique alterações manualmente.
- Ao corrigir revisão do GitHub Copilot, responda na própria thread com a correção, o commit e a validação realizada. Depois de confirmar a correção, resolva a conversa.
- Não solicite revisão do Copilot nas issues ou PRs. Use testes e revisão local; a revisão humana fica com Marcos Rocha.

## Preferências de nomenclatura

Em português, referir-se sempre à Gideon no feminino: a Gideon, da Gideon, à Gideon, ela e dela. Use Tinker e `tinkertecnologia.com` nas referências à empresa. Preserve caminhos e nomes públicos reais de ferramentas ao executar comandos.

Na apresentação pública deste projeto, use **MarcosRochaGPM** como marca do site e do material de apresentação.
