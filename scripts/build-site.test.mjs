import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { buildSite, lerCodigo, projectRoot } from './build-site.mjs';

test('site contém as dez soluções reais e distingue as sete linguagens planejadas', async (t) => {
  const output = await mkdtemp(resolve(tmpdir(), 'live-coding-site-'));
  t.after(() => rm(output, { recursive: true, force: true }));
  const resultado = await buildSite({ output });
  assert.equal(resultado.exercises, 10);
  assert.equal(resultado.languages, 8);
  const dados = JSON.parse(await readFile(resolve(output, 'catalogo.json'), 'utf8'));
  for (const exercicio of dados.exercises) {
    assert.ok(exercicio.cases.length > 0);
    assert.ok(exercicio.why.length > 0);
    assert.ok(exercicio.skills.length > 0);
    const js = exercicio.solutions.find((solucao) => solucao.language === 'javascript');
    assert.equal(js.code, await readFile(resolve(projectRoot, js.path), 'utf8'));
    assert.equal(exercicio.solutions.filter((solucao) => solucao.code === null).length, 7);
  }
  assert.match(await readFile(resolve(output, 'index.html'), 'utf8'), /lang="pt-BR"/);
  assert.ok((await readFile(resolve(output, 'app.js'), 'utf8')).includes('textContent'));
});
test('publicação rejeita arquivos fora do microprojeto da linguagem', async () => {
  await assert.rejects(lerCodigo(projectRoot, { id: 'javascript' }, 'README.md'), /fora de seu microprojeto/);
  await assert.rejects(lerCodigo(projectRoot, { id: 'javascript' }, 'src/cpp/README.md'), /fora de seu microprojeto/);
});
test('linguagem anunciada como implementada precisa de todos os arquivos', async (t) => {
  const root = await mkdtemp(resolve(tmpdir(), 'live-coding-missing-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(resolve(root, 'docs/casos'), { recursive: true });
  await mkdir(resolve(root, 'src/example'), { recursive: true });
  await writeFile(resolve(root, 'docs/catalogo.json'), JSON.stringify({ languages: [{ id: 'example', status: 'implemented', extension: 'txt' }], exercises: [{ id: 'soma_de_dois' }] }));
  await writeFile(resolve(root, 'docs/casos/soma_de_dois.json'), '[]');
  await assert.rejects(buildSite({ root }), { code: 'ENOENT' });
});
