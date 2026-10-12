package tinker.livecoding.soma_de_dois;

import java.util.HashMap;
import java.util.Map;

public final class SomaDeDois {
    private SomaDeDois() {}

    /** Retorna dois índices diferentes ou null quando não há solução. */
    public static int[] somaDeDois(int[] numeros, int alvo) {
        Map<Integer, Integer> vistos = new HashMap<>();
        for (int indice = 0; indice < numeros.length; indice++) {
            Integer anterior = vistos.get(alvo - numeros[indice]);
            // null indica ausência; o índice zero também é válido.
            if (anterior != null) return new int[] {anterior, indice};
            // Consulte antes de guardar, e preserve o primeiro índice de cada valor.
            vistos.putIfAbsent(numeros[indice], indice);
        }
        return null;
    }
}
