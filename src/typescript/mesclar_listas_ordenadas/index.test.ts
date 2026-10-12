import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { No, criarLista, valoresDaLista } from '../_shared/lista.js';
import { mesclarListasOrdenadas } from './index.js';

verificarCasos('mesclar_listas_ordenadas', ({ primeira, segunda }) =>
  valoresDaLista(mesclarListasOrdenadas(criarLista(primeira), criarLista(segunda))));
test('reutiliza os nós e prefere a primeira lista em empate', () => {
  const ultimoDaPrimeira = new No(2);
  const ultimoDaSegunda = new No(2);
  const primeira = new No(1, ultimoDaPrimeira);
  const segunda = new No(1, ultimoDaSegunda);
  const esperados = [primeira, segunda, ultimoDaPrimeira, ultimoDaSegunda];
  let atual = mesclarListasOrdenadas(primeira, segunda);
  for (const no of esperados) {
    assert.equal(atual, no);
    assert.ok(atual !== null);
    atual = atual.proximo;
  }
  assert.equal(atual, null);
});
