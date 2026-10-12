import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { criarLista, valoresDaLista } from '../_shared/lista.js';
import { mesclarListasOrdenadas } from './index.js';

verificarCasos('mesclar_listas_ordenadas', ({ primeira, segunda }) =>
  valoresDaLista(mesclarListasOrdenadas(criarLista(primeira), criarLista(segunda))));
test('reutiliza os nós e preserva a preferência pela primeira lista em empate', () => {
  const primeira = criarLista([1, 2]);
  const segunda = criarLista([1, 2]);
  const nosEsperados = [primeira, segunda, primeira.proximo, segunda.proximo];
  let atual = mesclarListasOrdenadas(primeira, segunda);
  for (const no of nosEsperados) {
    assert.equal(atual, no);
    atual = atual.proximo;
  }
  assert.equal(atual, null);
});
