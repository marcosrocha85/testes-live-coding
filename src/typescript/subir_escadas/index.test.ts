import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { subirEscadas } from './index.js';

verificarCasos('subir_escadas', ({ degraus }) => subirEscadas(degraus));
test('todo o domínio concorda com uma contagem combinatória exata em BigInt', () => {
  // Com k passos duplos há n-k passos no total; escolhemos quais k são duplos.
  function combinacao(n: number, k: number): bigint {
    let resultado = 1n;
    for (let i = 1; i <= k; i++) resultado = resultado * BigInt(n - i + 1) / BigInt(i);
    return resultado;
  }
  for (let n = 0; n <= 77; n++) {
    let esperado = 0n;
    for (let k = 0; k <= Math.floor(n / 2); k++) esperado += combinacao(n - k, k);
    assert.equal(BigInt(subirEscadas(n)), esperado, `degraus=${n}`);
  }
});
test('rejeita números não finitos', () => {
  for (const valor of [NaN, Infinity, -Infinity]) assert.throws(() => subirEscadas(valor), RangeError);
});
