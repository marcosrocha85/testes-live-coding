import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { parentesesValidos } from './index.js';

verificarCasos('parenteses_validos', ({ texto }) => parentesesValidos(texto));
test('aninhamento profundo sem usar recursão', () => {
  assert.equal(parentesesValidos('('.repeat(10000) + ')'.repeat(10000)), true);
});
