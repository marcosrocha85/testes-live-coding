import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { criarLista } from '../_shared/lista.js';
import { temCiclo } from './index.js';

verificarCasos('ciclo_em_lista_ligada', ({ valores, indiceCiclo }) => temCiclo(criarLista(valores, indiceCiclo)));
for (const indiceCiclo of [-1, 0, 1, 2]) {
  test(`detecção não muda os ponteiros: índice do ciclo ${indiceCiclo}`, () => {
    const primeiro = criarLista([1, 2, 3], indiceCiclo);
    const segundo = primeiro.proximo;
    const terceiro = segundo.proximo;
    const referencias = [primeiro.proximo, segundo.proximo, terceiro.proximo];
    assert.equal(temCiclo(primeiro), indiceCiclo !== -1);
    assert.equal(primeiro.proximo, referencias[0]);
    assert.equal(segundo.proximo, referencias[1]);
    assert.equal(terceiro.proximo, referencias[2]);
  });
}
