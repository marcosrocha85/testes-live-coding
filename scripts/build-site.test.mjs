import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { buildSite, lerCodigo, projectRoot } from './build-site.mjs';
import { destacarCodigo } from './highlight-code.mjs';

// Reconstrói o texto visível sem interpretar HTML, para detectar perdas no código.
function textoDoDestaque(html) {
  const semSpans = html.replace(/<span class="hljs-[^"]*">|<\/span>/g, '');
  const entidades = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': "'" };
  return semSpans.replace(/&(?:amp|lt|gt|quot|#x27);/g, (entidade) => entidades[entidade]);
}

test('site contém os fontes e auxiliares das onze linguagens implementadas', async (t) => {
  const output = await mkdtemp(resolve(tmpdir(), 'live-coding-site-'));
  t.after(() => rm(output, { recursive: true, force: true }));
  const resultado = await buildSite({ output });
  assert.equal(resultado.exercises, 10);
  assert.equal(resultado.languages, 11);
  const dados = JSON.parse(await readFile(resolve(output, 'catalogo.json'), 'utf8'));
  const disponiveis = dados.languages.filter((linguagem) => linguagem.status === 'implemented');
  assert.deepEqual(disponiveis.map((linguagem) => linguagem.id), ['javascript', 'typescript', 'java', 'kotlin', 'php', 'swift', 'pascal', 'cpp', 'go', 'rust', 'csharp']);
  for (const exercicio of dados.exercises) {
    assert.ok(exercicio.cases.length > 0);
    assert.ok(exercicio.why.length > 0);
    assert.ok(exercicio.skills.length > 0);
    for (const linguagem of disponiveis) {
      const solucao = exercicio.solutions.find((item) => item.language === linguagem.id);
      assert.equal(solucao.code, await readFile(resolve(projectRoot, solucao.path), 'utf8'));
      assert.match(solucao.highlightedCode, /class="hljs-/);
      assert.equal(textoDoDestaque(solucao.highlightedCode), solucao.code);
      const usaLista = ['inverter_lista_ligada', 'mesclar_listas_ordenadas', 'ciclo_em_lista_ligada'].includes(exercicio.id);
      const usaUnicode = linguagem.id === 'php' && exercicio.id === 'anagrama_valido';
      const auxiliaresPascal = {
        soma_de_dois: ['tipos.pas', 'mapa_inteiro.pas'],
        inverter_lista_ligada: ['no.pas'],
        mesclar_listas_ordenadas: ['no.pas'],
        subarray_maximo: ['tipos.pas'],
        anagrama_valido: ['mapa_inteiro.pas', 'unicode.pas'],
        ciclo_em_lista_ligada: ['no.pas']
      };
      if (linguagem.id === 'pascal') {
        assert.deepEqual(solucao.support.map(item => item.path), (auxiliaresPascal[exercicio.id] ?? []).map(nome => `src/pascal/_shared/${nome}`));
      } else if (linguagem.id === 'cpp') {
        const esperados = [`src/cpp/${exercicio.id}/${exercicio.id}.hpp`];
        if (usaLista) esperados.push('src/cpp/_shared/no.hpp');
        if (exercicio.id === 'anagrama_valido') esperados.push('src/cpp/_shared/unicode.hpp');
        assert.deepEqual(solucao.support.map(item => item.path), esperados);
      } else if (linguagem.id === 'go') {
        assert.deepEqual(solucao.support.map(item => item.path), usaLista ? ['src/go/lista/no.go'] : []);
        assert.match(solucao.code, /package /);
        assert.match(solucao.code, /func /);
      } else if (linguagem.id === 'rust') {
        const esperados = ['src/rust/lib.rs'];
        if (usaLista) esperados.push('src/rust/_shared/no.rs');
        assert.deepEqual(solucao.support.map(item => item.path), esperados);
        assert.match(solucao.code, /pub fn /);
      } else if (linguagem.id === 'csharp') {
        assert.deepEqual(solucao.support.map(item => item.path), usaLista ? ['src/csharp/_shared/No.cs'] : []);
        assert.match(solucao.code, /namespace LiveCoding;/);
        assert.match(solucao.code, /public static /);
      } else assert.equal(solucao.support.length, usaLista || usaUnicode ? 1 : 0);
      for (const auxiliar of solucao.support) {
        assert.equal(auxiliar.code, await readFile(resolve(projectRoot, auxiliar.path), 'utf8'));
        assert.match(auxiliar.highlightedCode, /class="hljs-/);
        assert.equal(textoDoDestaque(auxiliar.highlightedCode), auxiliar.code);
        assert.ok(auxiliar.path.startsWith(`src/${linguagem.id}/`));
      }
    }
    assert.equal(exercicio.solutions.filter((solucao) => solucao.code === null).length, 0);
  }
  assert.match(await readFile(resolve(output, 'index.html'), 'utf8'), /lang="pt-BR"/);
  assert.ok((await readFile(resolve(output, 'app.js'), 'utf8')).includes('textContent'));
});

test('destaque reconhece as onze linguagens do roteiro sem alterar o texto', () => {
  const exemplos = {
    javascript: 'const valor = 42; // número',
    typescript: 'const valor: number = 42; // tipo',
    java: 'public final class Exemplo { int valor = 42; }',
    kotlin: 'val valor: Int = 42',
    php: '<?php $valor = 42; echo "exemplo";',
    swift: 'let valor: Int = 42',
    pascal: 'program Exemplo; var valor: integer; begin valor := 42; end.',
    cpp: 'int main() { return 42; }',
    go: 'package exemplo\nfunc valor() int64 { return 42 }',
    rust: 'fn valor() -> i64 { 42 }',
    csharp: 'public static class Exemplo { public static long Valor() => 42; }'
  };
  for (const [linguagem, codigo] of Object.entries(exemplos)) {
    const html = destacarCodigo(codigo, linguagem);
    assert.match(html, /class="hljs-keyword"/, linguagem);
    assert.match(html, /class="hljs-number"/, linguagem);
    assert.equal(textoDoDestaque(html), codigo, linguagem);
  }
});

test('HTML dentro de comentários e strings aparece literalmente no destaque', () => {
  const codigo = '// <script>alert("olá")</script> &amp;\r\nconst texto = `<img src=x onerror=alert(1)>`;\nconst aspas = "\'&<>";';
  const html = destacarCodigo(codigo, 'javascript');
  assert.doesNotMatch(html, /<(?!\/?span\b)/);
  assert.equal(textoDoDestaque(html), codigo);
  assert.match(html, /hljs-comment/);
  assert.match(html, /hljs-string/);
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
