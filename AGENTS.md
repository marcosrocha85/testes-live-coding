# Orientações para contribuir

Este repositório é um guia de estudo de live coding para iniciantes. A prioridade é código correto, idiomático e explicado com palavras simples. Os dez desafios iniciais estão em `docs/catalogo.json`; novos desafios entram por GitHub Issues.

## Estrutura e conteúdo

- `src/<linguagem>/<desafio>/`: solução, testes e README local. Preserve os nomes de pasta dos desafios.
- `docs/`: arquitetura, contratos, casos compartilhados, conceitos das linguagens e fontes da Wiki e do site.
- `scripts/`: geração de documentação e GitHub Pages.
- Não marque uma linguagem como implementada antes de concluir seus dez desafios, testes, instruções e CI.
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
- `npm run test:coverage` ajuda a investigar cobertura; cobertura não substitui testes que detectem erros reais.
- Atualize `docs/catalogo.json` e execute `npm run docs` quando mudar as explicações. Não edite manualmente os arquivos gerados indicados no cabeçalho.
- Antes de concluir, registre na issue ou PR o que mudou e quais comandos passaram. Não afirme ter executado compiladores ou testes que não foram executados.

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
