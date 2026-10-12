import { No } from '../_shared/lista.js';

/** Mescla listas ordenadas, sem ciclos ou nós compartilhados, reutilizando os nós. */
export function mesclarListasOrdenadas(primeira: No | null, segunda: No | null): No | null {
  const sentinela = new No(0);
  let cauda = sentinela;
  while (primeira !== null && segunda !== null) {
    // <= mantém o nó da primeira lista antes do nó da segunda em empate.
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
