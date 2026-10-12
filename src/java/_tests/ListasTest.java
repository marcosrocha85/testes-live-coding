package tinker.livecoding._tests;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ListasTest {
    @Test void adaptadorRejeitaCiclo() {
        assertThrows(IllegalArgumentException.class, () -> Listas.valoresDaLista(Listas.criarLista(new int[] {1, 2}, 0)));
    }

    @Test void adaptadorRejeitaPosicoesImpossiveis() {
        for (int indice : new int[] {-2, 2}) {
            assertThrows(IllegalArgumentException.class, () -> Listas.criarLista(new int[] {1, 2}, indice));
        }
        assertThrows(IllegalArgumentException.class, () -> Listas.criarLista(new int[0], 0));
    }
}
