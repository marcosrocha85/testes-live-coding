/** Recebe números ordenados. Retorna um índice do alvo ou -1. */
export function buscaBinaria(numeros: readonly number[], alvo: number): number {
  let esquerda = 0;
  let direita = numeros.length - 1;
  while (esquerda <= direita) {
    const meio = esquerda + Math.floor((direita - esquerda) / 2);
    // Os limites garantem que meio está no array; ! não valida em execução.
    const valor = numeros[meio]!;
    if (valor === alvo) return meio;
    if (valor < alvo) esquerda = meio + 1;
    else direita = meio - 1;
  }
  return -1;
}
