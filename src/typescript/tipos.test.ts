import assert from 'node:assert/strict';
import test from 'node:test';
import { somaDeDois } from './soma_de_dois/index.js';
import { buscaBinaria } from './busca_binaria/index.js';
import { maiorLucro } from './compra_e_venda_de_acoes/index.js';
import { subarrayMaximo } from './subarray_maximo/index.js';
import { inverterListaLigada } from './inverter_lista_ligada/index.js';
import { criarLista } from './_shared/lista.js';

test('funções numéricas aceitam arrays readonly e não escrevem nas entradas', () => {
  const numeros: readonly number[] = Object.freeze([1, 2, 3]);
  const par: [number, number] | null = somaDeDois(numeros, 5);
  assert.deepEqual(par, [1, 2]);
  assert.equal(buscaBinaria(numeros, 3), 2);
  assert.equal(maiorLucro(numeros), 2);
  assert.equal(subarrayMaximo(numeros), 6);
  assert.deepEqual(numeros, [1, 2, 3]);
});

// O compilador verifica estes exemplos; o ramo nunca é executado pelo Node.
// Se uma assinatura passar a aceitar a chamada inválida, @ts-expect-error falha.
if (false) {
  // @ts-expect-error Os valores precisam ser números.
  somaDeDois(['2', '7'], 9);
  // @ts-expect-error O alvo precisa ser um número.
  buscaBinaria([1, 2], '2');
  // @ts-expect-error Uma lista ligada recebe um nó, não um array.
  inverterListaLigada([1, 2, 3]);
  // @ts-expect-error Nós guardam valores numéricos.
  criarLista(['a']);
  // @ts-expect-error O resultado pode ser null e exige tratamento.
  const [primeiro, segundo] = somaDeDois([], 0);
  console.log(primeiro, segundo);
}
