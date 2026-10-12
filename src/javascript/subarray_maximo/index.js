/** Retorna a maior soma de um trecho contíguo não vazio, ou null para um array vazio. */
export function subarrayMaximo(numeros) {
  if (numeros.length === 0) return null;
  let somaAtual = numeros[0];
  let melhorSoma = numeros[0];
  for (let indice = 1; indice < numeros.length; indice++) {
    // Podemos estender o trecho anterior ou começar um trecho neste número.
    somaAtual = Math.max(numeros[indice], somaAtual + numeros[indice]);
    melhorSoma = Math.max(melhorSoma, somaAtual);
  }
  return melhorSoma;
}
