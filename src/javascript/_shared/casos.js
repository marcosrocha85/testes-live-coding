import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

// Cada linguagem deverá consumir estes mesmos exemplos, sem copiar os resultados.
export function verificarCasos(exercicio, executar) {
  const casos = JSON.parse(readFileSync(new URL(`../../../docs/casos/${exercicio}.json`, import.meta.url), 'utf8'));
  for (const caso of casos) {
    test(caso.name, () => {
      const entrada = structuredClone(caso.input);
      if (caso.error) {
        assert.throws(() => executar(entrada), { name: caso.error });
      } else {
        const resultado = executar(entrada);
        if (caso.expectedIndices) assert.ok(caso.expectedIndices.includes(resultado));
        else assert.deepEqual(resultado, caso.expected);
      }
      assert.deepEqual(entrada, caso.input, 'Os arrays e strings de entrada não devem mudar.');
    });
  }
}
