import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { No, criarLista } from '../_shared/lista.js';
import { temCiclo } from './index.js';

verificarCasos('ciclo_em_lista_ligada', ({ valores, indiceCiclo }) => temCiclo(criarLista(valores, indiceCiclo)));
test('detecta todas as posições de retorno e preserva os ponteiros', () => {
  for (let tamanho = 0; tamanho <= 20; tamanho++) {
    for (let retorno = -1; retorno < tamanho; retorno++) {
      const cabeca = criarLista(Array.from({ length: tamanho }, () => 1), retorno);
      const nos: No[] = [];
      let atual = cabeca;
      for (let indice = 0; indice < tamanho; indice++) {
        assert.ok(atual !== null);
        nos.push(atual);
        atual = atual.proximo;
      }
      const proximos = nos.map((no) => no.proximo);
      // Qualquer tentativa de escrever nos nós passa a lançar um erro.
      nos.forEach((no) => Object.freeze(no));
      assert.equal(temCiclo(cabeca), retorno >= 0, `tamanho=${tamanho}, retorno=${retorno}`);
      nos.forEach((no, indice) => assert.equal(no.proximo, proximos[indice]));
    }
  }
});
