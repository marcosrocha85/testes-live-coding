package tinker.livecoding.inverter_lista_ligada;

import tinker.livecoding._shared.No;

public final class InverterListaLigada {
    private InverterListaLigada() {}

    /** Inverte uma lista sem ciclo, reutilizando seus nós, e retorna a nova cabeça. */
    public static No inverterListaLigada(No cabeca) {
        No anterior = null;
        No atual = cabeca;
        while (atual != null) {
            // Guarde o próximo antes de mudar a seta, para não perder o restante.
            No seguinte = atual.proximo;
            atual.proximo = anterior;
            anterior = atual;
            atual = seguinte;
        }
        return anterior;
    }
}
