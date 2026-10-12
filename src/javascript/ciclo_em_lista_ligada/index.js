/** Detecta um ciclo usando dois ponteiros, sem modificar a lista. */
export function temCiclo(cabeca) {
  let lento = cabeca;
  let rapido = cabeca;
  while (rapido !== null && rapido.proximo !== null) {
    lento = lento.proximo;
    rapido = rapido.proximo.proximo;
    // Comparamos os próprios nós, pois valores iguais não significam um ciclo.
    if (lento === rapido) return true;
  }
  return false;
}
