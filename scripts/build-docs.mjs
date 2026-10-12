import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const catalogo = JSON.parse(await readFile(resolve(root, 'docs/catalogo.json'), 'utf8'));
const aviso = '<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->\n\n';
const baseGitHub = 'https://github.com/marcosrocha85/testes-live-coding';
let desatualizados = 0;

async function salvar(caminho, conteudo) {
  const destino = resolve(root, caminho);
  if (process.argv.includes('--check')) {
    let atual;
    try { atual = await readFile(destino, 'utf8'); } catch { atual = ''; }
    if (atual !== conteudo) {
      console.error(`Documento desatualizado: ${caminho}`);
      desatualizados++;
    }
  } else {
    await mkdir(dirname(destino), { recursive: true });
    await writeFile(destino, conteudo);
  }
}

for (const exercicio of catalogo.exercises) {
  const casos = JSON.parse(await readFile(resolve(root, `docs/casos/${exercicio.id}.json`), 'utf8'));
  const listaCasos = casos.map((caso) => {
    const esperado = caso.error ? `erro ${caso.error}` : caso.expectedIndices ? `um dos índices ${JSON.stringify(caso.expectedIndices)}` : JSON.stringify(caso.expected);
    return `- **${caso.name}**: entrada \`${JSON.stringify(caso.input)}\`; saída \`${esperado}\`.`;
  }).join('\n');
  const corpo = `# ${exercicio.name}\n\nNome na entrevista: **${exercicio.problemName}**. Pasta: \`${exercicio.id}\`.\n\n## Problema\n\n${exercicio.problem}\n\n## Ideia\n\n${exercicio.idea}\n\n${exercicio.steps.map((passo, indice) => `${indice + 1}. ${passo}`).join('\n')}\n\n## Exemplo explicado\n\n${exercicio.walkthrough}\n\n\`\`\`js\n${exercicio.example}\n\`\`\`\n\n## Por que pedir este teste?\n\n${exercicio.why}\n\nCapacidades avaliadas:\n\n${exercicio.skills.map((habilidade) => `- ${habilidade}`).join('\n')}\n\nO exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.\n\n## Contrato\n\n${exercicio.contract}\n\n## Complexidade\n\n- Tempo: ${exercicio.time}.\n- Espaço adicional: ${exercicio.space}.\n\nConsulte as definições de complexidade e o domínio das entradas em [Contratos](${baseGitHub}/blob/main/docs/contratos.md).\n\n## Erros comuns\n\n${exercicio.pitfalls.map((erro) => `- ${erro}`).join('\n')}\n\n## Casos compartilhados\n\n${listaCasos}\n\nOs portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.\n\n## Implementação e testes\n\n- [Solução JavaScript](${baseGitHub}/blob/main/src/javascript/${exercicio.id}/index.js)\n- [Testes JavaScript](${baseGitHub}/blob/main/src/javascript/${exercicio.id}/index.test.js)\n- [Casos JSON](${baseGitHub}/blob/main/docs/casos/${exercicio.id}.json)\n- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#${exercicio.id}.javascript)\n\nDa raiz do repositório:\n\n\`\`\`sh\nnode --test src/javascript/${exercicio.id}/index.test.js\n\`\`\`\n`;
  await salvar(`docs/tests/${exercicio.id}.md`, aviso + corpo);
  await salvar(`docs/wiki/${exercicio.id}.md`, aviso + corpo);
  await salvar(`src/javascript/${exercicio.id}/README.md`, aviso + corpo);
}

await salvar('docs/tests/README.md', aviso + '# Desafios de live coding\n\nCada página explica o problema, a ideia, o contrato, os casos de borda e o que o exercício avalia.\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id}.md) — ${exercicio.problemName}`).join('\n') + '\n');
await salvar('docs/wiki/Home.md', aviso + '# Testes de live coding\n\nEstude o problema, tente resolvê-lo e depois compare a implementação e os testes. Cada página explica por que o desafio aparece em entrevistas e quais capacidades ele avalia.\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id}) — ${exercicio.problemName}`).join('\n') + `\n\n[Implementações por linguagem](https://marcosrocha85.github.io/testes-live-coding/) · [Arquitetura](${baseGitHub}/blob/main/docs/arquitetura.md) · [Roteiro](${baseGitHub}/blob/main/docs/roadmap.md) · [Sugerir novo desafio](${baseGitHub}/issues/new/choose)\n`);
await salvar('docs/wiki/_Sidebar.md', aviso + '[Início](Home)\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id})`).join('\n') + '\n');

let issues = [];
try { issues = JSON.parse(await readFile(resolve(root, 'docs/roadmap-issues.json'), 'utf8')); }
catch (erro) { if (erro.code !== 'ENOENT') throw erro; }
let roteiro = aviso + '# Roteiro de implementação\n\nTrabalhamos uma linguagem por vez, nesta ordem: JavaScript, TypeScript, Java, Kotlin, PHP, Swift, Pascal e C++. Cada etapa tem uma issue principal e dez sub-issues reais. JavaScript é a primeira entrega; as outras sete linguagens ainda estão planejadas.\n\nAs issues de JavaScript permanecem abertas até a integração da PR inicial. Uma linguagem só está concluída quando seus dez desafios, testes, explicações e CI estiverem prontos e revisados.\n\nNovos desafios são registrados pelo [template de issue](https://github.com/marcosrocha85/testes-live-coding/issues/new/choose). Eles recebem contrato e casos antes da implementação.\n';
for (const linguagem of catalogo.languages) {
  const etapa = issues.find((issue) => issue.language === linguagem.id);
  roteiro += `\n## ${linguagem.name}\n\nEstado da implementação: ${linguagem.status === 'implemented' ? 'disponível na base inicial' : 'planejada'}.\n\n`;
  roteiro += etapa ? `[Issue principal #${etapa.number}](${etapa.url})\n\n` : 'Issues ainda não registradas.\n\n';
  roteiro += catalogo.exercises.map((exercicio) => {
    const issue = etapa?.exercises.find((item) => item.exercise === exercicio.id);
    return issue ? `- [#${issue.number} — ${exercicio.name}](${issue.url})` : `- ${exercicio.name}`;
  }).join('\n') + '\n';
}
await salvar('docs/roadmap.md', roteiro);

if (desatualizados) process.exitCode = 1;
else console.log(process.argv.includes('--check') ? 'Documentação gerada está atualizada.' : 'Documentação e fontes da Wiki atualizadas.');
