package tinker.livecoding.subir_escadas;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;
import java.math.BigInteger;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class SubirEscadasTest {
    @Test void dominioCompletoConcordaComContagemCombinatoriaExata() {
        for (int n = 0; n <= 77; n++) {
            BigInteger esperado = BigInteger.ZERO;
            for (int duplos = 0; duplos <= n / 2; duplos++) esperado = esperado.add(combinacao(n - duplos, duplos));
            assertEquals(esperado, BigInteger.valueOf(SubirEscadas.subirEscadas(n)), "degraus=" + n);
        }
    }

    private static BigInteger combinacao(int n, int k) {
        BigInteger resultado = BigInteger.ONE;
        for (int i = 1; i <= k; i++) resultado = resultado.multiply(BigInteger.valueOf(n - i + 1)).divide(BigInteger.valueOf(i));
        return resultado;
    }

    @Test void rejeitaNumerosNaoFinitos() {
        for (double valor : new double[] {Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY}) {
            assertThrows(IllegalArgumentException.class, () -> SubirEscadas.subirEscadas(valor));
        }
    }
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("subir_escadas", entrada -> SubirEscadas.subirEscadas(entrada.get("degraus").getAsDouble()));
    }
}
