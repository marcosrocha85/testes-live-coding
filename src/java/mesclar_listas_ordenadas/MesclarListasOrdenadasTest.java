package tinker.livecoding.mesclar_listas_ordenadas;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;
import tinker.livecoding._tests.Listas;
import tinker.livecoding._shared.No;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class MesclarListasOrdenadasTest {
    @Test void reutilizaNosEPreferePrimeiraListaEmEmpate() {
        No ultimoDaPrimeira = new No(2);
        No ultimoDaSegunda = new No(2);
        No primeira = new No(1, ultimoDaPrimeira);
        No segunda = new No(1, ultimoDaSegunda);
        No atual = MesclarListasOrdenadas.mesclarListasOrdenadas(primeira, segunda);
        for (No esperado : new No[] {primeira, segunda, ultimoDaPrimeira, ultimoDaSegunda}) {
            assertSame(esperado, atual);
            atual = atual.proximo;
        }
        assertNull(atual);
    }
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("mesclar_listas_ordenadas", entrada -> Listas.valoresDaLista(MesclarListasOrdenadas.mesclarListasOrdenadas(Listas.criarLista(Casos.inteiros(entrada, "primeira")), Listas.criarLista(Casos.inteiros(entrada, "segunda")))));
    }
}
