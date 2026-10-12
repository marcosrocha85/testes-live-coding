/** Retorna um índice do alvo em um array ordenado, ou -1 quando ele não existe. */
export function buscaBinaria(numeros, alvo) {
  let esquerda = 0;
  let direita = numeros.length - 1;
  while (esquerda <= direita) {
    const meio = esquerda + Math.floor((direita - esquerda) / 2);
    if (numeros[meio] === alvo) return meio;
    // A ordenação permite descartar toda a metade que não pode conter o alvo.
    if (numeros[meio] < alvo) esquerda = meio + 1;
    else direita = meio - 1;
  }
  return -1;
}
