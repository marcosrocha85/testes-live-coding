package tinker.livecoding.mesclar_listas_ordenadas;

import tinker.livecoding._shared.No;

public final class MesclarListasOrdenadas {
    private MesclarListasOrdenadas() {}

    /** Mescla listas ordenadas, independentes e sem ciclos, reutilizando os nós. */
    public static No mesclarListasOrdenadas(No primeira, No segunda) {
        No sentinela = new No(0);
        No cauda = sentinela;
        while (primeira != null && segunda != null) {
            // Em empate, o nó da primeira lista vem antes do nó da segunda.
            if (primeira.valor <= segunda.valor) {
                cauda.proximo = primeira;
                primeira = primeira.proximo;
            } else {
                cauda.proximo = segunda;
                segunda = segunda.proximo;
            }
            cauda = cauda.proximo;
        }
        cauda.proximo = primeira != null ? primeira : segunda;
        return sentinela.proximo;
    }
}
