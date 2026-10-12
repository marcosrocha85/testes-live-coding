/** Maior soma de um trecho contíguo não vazio; null indica array vazio. */
export function subarrayMaximo(numeros: readonly number[]): number | null {
  const primeiro = numeros[0];
  if (primeiro === undefined) return null;
  let somaAtual = primeiro;
  let melhorSoma = primeiro;
  for (let indice = 1; indice < numeros.length; indice++) {
    const numero = numeros[indice]!; // O laço mantém indice dentro do array.
    // Estenda o trecho anterior ou comece um trecho no número atual.
    somaAtual = Math.max(numero, somaAtual + numero);
    melhorSoma = Math.max(melhorSoma, somaAtual);
  }
  return melhorSoma;
}
