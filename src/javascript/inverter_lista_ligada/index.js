/** Inverte uma lista sem ciclo reaproveitando seus nós. Retorna a nova cabeça. */
export function inverterListaLigada(cabeca) {
  let anterior = null;
  let atual = cabeca;
  while (atual !== null) {
    // Guardamos o próximo antes de mudar a seta, para não perder o resto da lista.
    const seguinte = atual.proximo;
    atual.proximo = anterior;
    anterior = atual;
    atual = seguinte;
  }
  return anterior;
}
