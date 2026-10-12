import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { criarLista, valoresDaLista } from '../_shared/lista.js';
import { inverterListaLigada } from './index.js';

verificarCasos('inverter_lista_ligada', ({ valores }) => valoresDaLista(inverterListaLigada(criarLista(valores))));
test('reutiliza exatamente os nós originais e termina em null', () => {
  const primeiro = criarLista([1, 2, 3]);
  const segundo = primeiro.proximo;
  const terceiro = segundo.proximo;
  const invertida = inverterListaLigada(primeiro);
  assert.equal(invertida, terceiro);
  assert.equal(terceiro.proximo, segundo);
  assert.equal(segundo.proximo, primeiro);
  assert.equal(primeiro.proximo, null);
  assert.equal(inverterListaLigada(invertida), primeiro);
  assert.deepEqual(valoresDaLista(primeiro), [1, 2, 3]);
});
