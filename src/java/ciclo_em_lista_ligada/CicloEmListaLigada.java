package tinker.livecoding.ciclo_em_lista_ligada;

import tinker.livecoding._shared.No;

public final class CicloEmListaLigada {
    private CicloEmListaLigada() {}

    /** Detecta ciclos por identidade dos nós, sem modificar as ligações. */
    public static boolean temCiclo(No cabeca) {
        No lento = cabeca;
        No rapido = cabeca;
        while (rapido != null && rapido.proximo != null) {
            lento = lento.proximo;
            rapido = rapido.proximo.proximo;
            // == compara referências; valores iguais em nós distintos não são ciclo.
            if (lento == rapido) return true;
        }
        return false;
    }
}
