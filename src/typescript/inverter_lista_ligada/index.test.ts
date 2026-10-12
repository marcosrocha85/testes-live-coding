import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { No, criarLista, valoresDaLista } from '../_shared/lista.js';
import { inverterListaLigada } from './index.js';

verificarCasos('inverter_lista_ligada', ({ valores }) => valoresDaLista(inverterListaLigada(criarLista(valores))));
test('reutiliza exatamente os nós originais e termina em null', () => {
  const terceiro = new No(3);
  const segundo = new No(2, terceiro);
  const primeiro = new No(1, segundo);
  const invertida = inverterListaLigada(primeiro);
  assert.equal(invertida, terceiro);
  assert.equal(terceiro.proximo, segundo);
  assert.equal(segundo.proximo, primeiro);
  assert.equal(primeiro.proximo, null);
  assert.equal(inverterListaLigada(invertida), primeiro);
  assert.deepEqual(valoresDaLista(primeiro), [1, 2, 3]);
});
