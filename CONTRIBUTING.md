# Como contribuir

1. Encontre a issue da linguagem em [docs/roadmap.md](docs/roadmap.md) e escolha uma sub-issue. Para um novo desafio, abra primeiro uma issue pelo template.
2. Crie uma branch a partir de `main`. Use um nome como `codex/typescript-soma-de-dois`.
3. Leia o contrato em `docs/tests/<desafio>.md` e os casos em `docs/casos/<desafio>.json`.
4. Implemente a solução no microprojeto da linguagem. Inclua testes dos casos compartilhados e verificações de identidade, precisão, Unicode e mutação quando se aplicarem.
5. Escreva comentários e um README que um iniciante consiga acompanhar. Documente ferramentas, versões e comando de teste da linguagem.
6. Adicione os testes à CI. Quando todos os dez desafios da linguagem estiverem prontos, registre seus arquivos reais em `docs/catalogo.json` conforme [a arquitetura](docs/arquitetura.md).
7. Rode os testes afetados, `npm run docs:check` e `npm run build`. Descreva os resultados na PR e use `Closes #numero` para cada sub-issue concluída.

Evite renomear contratos para acomodar uma única linguagem. Quando não existir o mesmo conceito de `null` ou de exceção, documente o equivalente e mantenha o comportamento observável. Não altere testes só para fazer uma solução incorreta passar.

Na revisão, explique a decisão, não apenas o código. Por exemplo: “guardei o próximo nó antes de mudar o ponteiro para não perder a lista restante”.
