import { readFile, writeFile, mkdir, copyFile, realpath } from 'node:fs/promises';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

export const projectRoot = fileURLToPath(new URL('../', import.meta.url));

// Uma solução publicada precisa pertencer ao microprojeto da própria linguagem.
export async function lerCodigo(root, linguagem, caminho) {
  const base = await realpath(resolve(root, 'src', linguagem.id));
  const arquivo = await realpath(resolve(root, caminho));
  const dentro = relative(base, arquivo);
  if (!dentro || dentro.startsWith('..') || isAbsolute(dentro)) {
    throw new Error(`Arquivo de ${linguagem.id} fora de seu microprojeto: ${caminho}`);
  }
  return readFile(arquivo, 'utf8');
}

export async function buildSite({ root = projectRoot, output = resolve(root, 'dist') } = {}) {
  const catalogo = JSON.parse(await readFile(resolve(root, 'docs/catalogo.json'), 'utf8'));
  let issues = [];
  try { issues = JSON.parse(await readFile(resolve(root, 'docs/roadmap-issues.json'), 'utf8')); }
  catch (erro) { if (erro.code !== 'ENOENT') throw erro; }
  catalogo.languages = catalogo.languages.map((linguagem) => ({
    ...linguagem,
    issueUrl: issues.find((issue) => issue.language === linguagem.id)?.url ?? linguagem.issueUrl
  }));
  const exercises = [];
  for (const exercicio of catalogo.exercises) {
    const cases = JSON.parse(await readFile(resolve(root, `docs/casos/${exercicio.id}.json`), 'utf8'));
    const solutions = [];
    for (const linguagem of catalogo.languages) {
      if (linguagem.status !== 'implemented') {
        solutions.push({ language: linguagem.id, code: null, support: [] });
        continue;
      }
      const path = linguagem.solutionFiles?.[exercicio.id] ?? `src/${linguagem.id}/${exercicio.id}/index.${linguagem.extension}`;
      const code = await lerCodigo(root, linguagem, path);
      const usaLista = ['javascript', 'typescript'].includes(linguagem.id) && ['inverter_lista_ligada', 'mesclar_listas_ordenadas', 'ciclo_em_lista_ligada'].includes(exercicio.id);
      const auxiliares = linguagem.supportFiles ?? (usaLista ? [`src/${linguagem.id}/_shared/lista.${linguagem.extension}`] : []);
      const support = [];
      for (const path of auxiliares) support.push({ path, code: await lerCodigo(root, linguagem, path) });
      solutions.push({ language: linguagem.id, path, code, support });
    }
    exercises.push({ ...exercicio, cases, solutions });
  }
  await mkdir(output, { recursive: true });
  for (const arquivo of ['index.html', 'style.css', 'app.js']) {
    await copyFile(resolve(root, 'docs/site', arquivo), resolve(output, arquivo));
  }
  await writeFile(resolve(output, 'catalogo.json'), JSON.stringify({ languages: catalogo.languages, exercises }, null, 2) + '\n');
  await writeFile(resolve(output, '.nojekyll'), '');
  return { output, exercises: exercises.length, languages: catalogo.languages.length };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  console.log(await buildSite());
}
