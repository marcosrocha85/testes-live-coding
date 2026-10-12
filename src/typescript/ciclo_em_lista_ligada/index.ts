import type { No } from '../_shared/lista.js';

/** Detecta um ciclo por identidade dos nós, sem mudar ponteiros. */
export function temCiclo(cabeca: No | null): boolean {
  let lento = cabeca;
  let rapido = cabeca;
  while (lento !== null && rapido !== null && rapido.proximo !== null) {
    lento = lento.proximo;
    rapido = rapido.proximo.proximo;
    // Valores iguais em nós distintos não são um ciclo.
    if (lento === rapido) return true;
  }
  return false;
}
