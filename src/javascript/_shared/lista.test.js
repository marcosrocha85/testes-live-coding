import assert from 'node:assert/strict';
import test from 'node:test';
import { criarLista, valoresDaLista } from './lista.js';

test('adaptador de lista não percorre ciclos indefinidamente', () => {
  assert.throws(() => valoresDaLista(criarLista([1, 2], 0)), /ciclo/);
});
test('adaptador rejeita índices de ciclo impossíveis', () => {
  for (const indice of [-2, 2, 0.5]) assert.throws(() => criarLista([1, 2], indice), RangeError);
  assert.throws(() => criarLista([], 0), RangeError);
});
