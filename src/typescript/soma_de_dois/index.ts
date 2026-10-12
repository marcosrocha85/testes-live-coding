/** Retorna dois índices diferentes, ou null se nenhum par somar o alvo. */
export function somaDeDois(numeros: readonly number[], alvo: number): [number, number] | null {
  const vistos = new Map<number, number>();
  for (const [indice, numero] of numeros.entries()) {
    const indiceComplemento = vistos.get(alvo - numero);
    // undefined é ausência; o índice 0 é uma resposta válida.
    if (indiceComplemento !== undefined) return [indiceComplemento, indice];
    // Consultamos antes de guardar, sem reutilizar o índice atual.
    if (!vistos.has(numero)) vistos.set(numero, indice);
  }
  return null;
}
