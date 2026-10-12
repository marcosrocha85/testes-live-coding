package tinker.livecoding.anagrama_valido;

import java.util.HashMap;
import java.util.Map;
import java.util.PrimitiveIterator;

public final class AnagramaValido {
    private AnagramaValido() {}

    /** Compara pontos de código Unicode; maiúsculas e espaços importam. */
    public static boolean anagramaValido(String primeiro, String segundo) {
        Map<Integer, Integer> contagem = new HashMap<>();
        // codePoints mantém emojis completos; charAt isolaria unidades UTF-16.
        PrimitiveIterator.OfInt pontos = primeiro.codePoints().iterator();
        while (pontos.hasNext()) {
            int ponto = pontos.nextInt();
            contagem.merge(ponto, 1, Integer::sum);
        }
        pontos = segundo.codePoints().iterator();
        while (pontos.hasNext()) {
            int ponto = pontos.nextInt();
            Integer quantidade = contagem.get(ponto);
            if (quantidade == null) return false;
            if (quantidade == 1) contagem.remove(ponto);
            else contagem.put(ponto, quantidade - 1);
        }
        return contagem.isEmpty();
    }
}
