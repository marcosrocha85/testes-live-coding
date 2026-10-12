import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';

interface Entradas {
  soma_de_dois: { numeros: number[]; alvo: number };
  parenteses_validos: { texto: string };
  inverter_lista_ligada: { valores: number[] };
  busca_binaria: { numeros: number[]; alvo: number };
  mesclar_listas_ordenadas: { primeira: number[]; segunda: number[] };
  compra_e_venda_de_acoes: { precos: number[] };
  subarray_maximo: { numeros: number[] };
  subir_escadas: { degraus: number };
  anagrama_valido: { primeiro: string; segundo: string };
  ciclo_em_lista_ligada: { valores: number[]; indiceCiclo: number };
}

interface Resultados {
  soma_de_dois: [number, number] | null;
  parenteses_validos: boolean;
  inverter_lista_ligada: number[];
  busca_binaria: number;
  mesclar_listas_ordenadas: number[];
  compra_e_venda_de_acoes: number;
  subarray_maximo: number | null;
  subir_escadas: number;
  anagrama_valido: boolean;
  ciclo_em_lista_ligada: boolean;
}

type Caso<K extends keyof Entradas> = { name: string; input: Entradas[K] } & (
  | { expected: Resultados[K]; expectedIndices?: never; error?: never }
  | { expectedIndices: number[]; expected?: never; error?: never }
  | { error: 'RangeError'; expected?: never; expectedIndices?: never }
);

/** O nome do exercício determina os tipos da entrada e do resultado do adaptador. */
export function verificarCasos<K extends keyof Entradas>(
  exercicio: K,
  executar: (entrada: Entradas[K]) => Resultados[K]
): void {
  // O arquivo compilado fica em src/typescript/dist/_shared: quatro níveis até a raiz.
  const arquivo = new URL(`../../../../docs/casos/${exercicio}.json`, import.meta.url);
  // Esta asserção descreve fixtures versionadas; não valida JSON externo em execução.
  const casos = JSON.parse(readFileSync(arquivo, 'utf8')) as Caso<K>[];
  for (const caso of casos) {
    test(`${exercicio}: ${caso.name}`, () => {
      const entrada = structuredClone(caso.input);
      if (caso.error) {
        assert.throws(() => executar(entrada), { name: caso.error });
      } else {
        const resultado = executar(entrada);
        if (caso.expectedIndices) assert.ok(caso.expectedIndices.some((indice) => indice === resultado));
        else assert.deepEqual(resultado, caso.expected);
      }
      assert.deepEqual(entrada, caso.input, 'Os arrays e strings de entrada não devem mudar.');
    });
  }
}
