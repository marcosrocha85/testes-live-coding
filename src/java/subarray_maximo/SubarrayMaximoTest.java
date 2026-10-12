package tinker.livecoding.subarray_maximo;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;
import java.util.Arrays;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class SubarrayMaximoTest {
    @Test void somaDoContratoPodeUltrapassarInt() {
        int[] numeros = new int[10_000];
        Arrays.fill(numeros, 1_000_000);
        assertEquals(Long.valueOf(10_000_000_000L), SubarrayMaximo.subarrayMaximo(numeros));
    }
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("subarray_maximo", entrada -> Casos.semMutacao(Casos.inteiros(entrada, "numeros"), SubarrayMaximo::subarrayMaximo));
    }
}
