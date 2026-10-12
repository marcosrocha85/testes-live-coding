import assert from 'node:assert/strict';
import test from 'node:test';
import { somaDeDois } from './soma_de_dois/index.js';
import { buscaBinaria } from './busca_binaria/index.js';
import { maiorLucro } from './compra_e_venda_de_acoes/index.js';
import { subarrayMaximo } from './subarray_maximo/index.js';
import { parentesesValidos } from './parenteses_validos/index.js';

// Semente fixa torna os exemplos reproduzíveis, inclusive quando um teste falha.
let semente = 20261012;
function inteiro(limite: number): number {
  semente = (Math.imul(semente, 1664525) + 1013904223) >>> 0;
  return semente % limite;
}
const entradas = Array.from({ length: 150 }, () => Array.from({ length: inteiro(15) }, () => inteiro(21) - 10));

test('soma de dois concorda com busca exaustiva independente', () => {
  for (const numeros of entradas) {
    for (let alvo = -20; alvo <= 20; alvo++) {
      let esperado: [number, number] | null = null;
      procurar: for (let segundo = 1; segundo < numeros.length; segundo++) {
        for (let primeiro = 0; primeiro < segundo; primeiro++) {
          if (numeros[primeiro]! + numeros[segundo]! === alvo) {
            esperado = [primeiro, segundo];
            break procurar;
          }
        }
      }
      assert.deepEqual(somaDeDois(numeros, alvo), esperado, JSON.stringify({ numeros, alvo }));
    }
  }
});
test('busca binária concorda com busca linear', () => {
  for (const entrada of entradas) {
    const numeros = [...entrada].sort((a, b) => a - b);
    for (let alvo = -11; alvo <= 11; alvo++) {
      const indice = buscaBinaria(numeros, alvo);
      if (numeros.includes(alvo)) assert.equal(numeros[indice], alvo);
      else assert.equal(indice, -1);
    }
  }
});
test('lucro concorda com todas as compras e vendas possíveis', () => {
  for (const entrada of entradas) {
    const precos = entrada.map((numero) => numero + 10);
    let esperado = 0;
    for (let compra = 0; compra < precos.length; compra++) {
      for (let venda = compra + 1; venda < precos.length; venda++) {
        esperado = Math.max(esperado, precos[venda]! - precos[compra]!);
      }
    }
    assert.equal(maiorLucro(precos), esperado, JSON.stringify(precos));
  }
});
test('Kadane concorda com a soma de todos os trechos contíguos', () => {
  for (const numeros of entradas) {
    let esperado: number | null = null;
    for (let inicio = 0; inicio < numeros.length; inicio++) {
      let soma = 0;
      for (let fim = inicio; fim < numeros.length; fim++) {
        soma += numeros[fim]!;
        if (esperado === null || soma > esperado) esperado = soma;
      }
    }
    assert.equal(subarrayMaximo(numeros), esperado, JSON.stringify(numeros));
  }
});
test('parênteses concorda com remoção independente de pares adjacentes', () => {
  const simbolos = '()[]{}a';
  for (let caso = 0; caso < 500; caso++) {
    const texto = Array.from({ length: inteiro(20) }, () => simbolos[inteiro(simbolos.length)]!).join('');
    let reduzido = texto;
    let anterior: string;
    do {
      anterior = reduzido;
      reduzido = reduzido.replace(/\(\)|\[\]|\{\}/g, '');
    } while (reduzido !== anterior);
    assert.equal(parentesesValidos(texto), reduzido === '', texto);
  }
});
