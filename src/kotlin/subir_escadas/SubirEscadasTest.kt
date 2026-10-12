package livecoding.subir_escadas

import java.math.BigInteger
import livecoding._tests.Casos
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestFactory

class SubirEscadasTest {
    @TestFactory
    fun casosCompartilhados() = Casos.verificar("subir_escadas") { subirEscadas(it["degraus"].asDouble) }

    @Test
    fun todoDominioConcordaComCombinacoesExatas() {
        // Escolher as posições dos passos duplos conta as sequências sem usar Fibonacci.
        for (n in 0..77) {
            val esperado = (0..n / 2).fold(BigInteger.ZERO) { soma, duplos ->
                soma + combinacao(n - duplos, duplos)
            }
            assertEquals(esperado, BigInteger.valueOf(subirEscadas(n.toDouble())), "degraus=$n")
        }
    }

    private fun combinacao(n: Int, k: Int): BigInteger =
        (1..k).fold(BigInteger.ONE) { resultado, i ->
            resultado * BigInteger.valueOf((n - i + 1).toLong()) / BigInteger.valueOf(i.toLong())
        }

    @Test
    fun rejeitaNaNEInfinitos() {
        for (numero in doubleArrayOf(Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY)) {
            assertThrows(IllegalArgumentException::class.java) { subirEscadas(numero) }
        }
    }
}
