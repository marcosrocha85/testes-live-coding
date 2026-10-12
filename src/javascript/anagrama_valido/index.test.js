import assert from 'node:assert/strict';
import test from 'node:test';
import { verificarCasos } from '../_shared/casos.js';
import { anagramaValido } from './index.js';

verificarCasos('anagrama_valido', ({ primeiro, segundo }) => anagramaValido(primeiro, segundo));
test('as mesmas unidades UTF-16 podem representar pontos de código diferentes', () => {
  assert.equal(anagramaValido('\uD83D\uDE00\uD83E\uDD00', '\uD83D\uDD00\uD83E\uDE00'), false);
});
