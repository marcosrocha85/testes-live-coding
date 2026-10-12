package tinker.livecoding.inverter_lista_ligada;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;
import tinker.livecoding._tests.Listas;
import tinker.livecoding._shared.No;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class InverterListaLigadaTest {
    @Test void reutilizaNosETerminaEmNull() {
        No terceiro = new No(3);
        No segundo = new No(2, terceiro);
        No primeiro = new No(1, segundo);
        assertSame(terceiro, InverterListaLigada.inverterListaLigada(primeiro));
        assertSame(segundo, terceiro.proximo);
        assertSame(primeiro, segundo.proximo);
        assertNull(primeiro.proximo);
        assertSame(primeiro, InverterListaLigada.inverterListaLigada(terceiro));
        assertArrayEquals(new int[] {1, 2, 3}, Listas.valoresDaLista(primeiro));
    }
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("inverter_lista_ligada", entrada -> Listas.valoresDaLista(InverterListaLigada.inverterListaLigada(Listas.criarLista(Casos.inteiros(entrada, "valores")))));
    }
}
