import assert from 'node:assert/strict';
import test from 'node:test';
import { subirEscadas } from './dist/subir_escadas/index.js';

// Um consumidor JavaScript não passa pela checagem estática do TypeScript.
test('escadas mantém sua validação em execução para consumidores JavaScript', () => {
  for (const valor of ['3', null, undefined, {}, [], true]) {
    assert.throws(() => subirEscadas(valor), RangeError);
  }
});
