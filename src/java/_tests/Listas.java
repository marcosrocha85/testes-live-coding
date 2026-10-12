package tinker.livecoding._tests;

import java.util.ArrayList;
import java.util.Collections;
import java.util.IdentityHashMap;
import java.util.Set;
import tinker.livecoding._shared.No;

/** Arrays servem somente para montar e conferir os nós reais nos testes. */
public final class Listas {
    private Listas() {}

    public static No criarLista(int[] valores) {
        return criarLista(valores, -1);
    }

    public static No criarLista(int[] valores, int indiceCiclo) {
        if (indiceCiclo < -1 || indiceCiclo >= valores.length) {
            throw new IllegalArgumentException("Índice de ciclo fora da lista.");
        }
        No[] nos = new No[valores.length];
        for (int indice = 0; indice < valores.length; indice++) nos[indice] = new No(valores[indice]);
        for (int indice = 0; indice < nos.length - 1; indice++) nos[indice].proximo = nos[indice + 1];
        if (indiceCiclo >= 0) nos[nos.length - 1].proximo = nos[indiceCiclo];
        return nos.length == 0 ? null : nos[0];
    }

    public static int[] valoresDaLista(No cabeca) {
        var valores = new ArrayList<Integer>();
        Set<No> visitados = Collections.newSetFromMap(new IdentityHashMap<>());
        for (No atual = cabeca; atual != null; atual = atual.proximo) {
            if (!visitados.add(atual)) throw new IllegalArgumentException("A lista contém um ciclo.");
            valores.add(atual.valor);
        }
        return valores.stream().mapToInt(Integer::intValue).toArray();
    }
}
