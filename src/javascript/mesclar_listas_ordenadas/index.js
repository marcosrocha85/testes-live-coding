import { No } from '../_shared/lista.js';

/** Mescla listas ordenadas, sem ciclos e sem nós compartilhados. Reutiliza os nós. */
export function mesclarListasOrdenadas(primeira, segunda) {
  const sentinela = new No(0);
  let cauda = sentinela;
  while (primeira !== null && segunda !== null) {
    // O menor nó disponível é sempre o próximo da lista resultante.
    if (primeira.valor <= segunda.valor) {
      cauda.proximo = primeira;
      primeira = primeira.proximo;
    } else {
      cauda.proximo = segunda;
      segunda = segunda.proximo;
    }
    cauda = cauda.proximo;
  }
  cauda.proximo = primeira ?? segunda;
  return sentinela.proximo;
}
