import type { No } from '../_shared/lista.js';

/** Reutiliza os nós de uma lista sem ciclo e devolve sua nova cabeça. */
export function inverterListaLigada(cabeca: No | null): No | null {
  let anterior: No | null = null;
  let atual = cabeca;
  while (atual !== null) {
    // Salve a referência antes de mudar a seta, para não perder o restante.
    const seguinte: No | null = atual.proximo;
    atual.proximo = anterior;
    anterior = atual;
    atual = seguinte;
  }
  return anterior;
}
