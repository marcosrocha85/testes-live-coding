package livecoding.busca_binaria

import livecoding._tests.Casos
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestFactory

class BuscaBinariaTest {
    @TestFactory
    fun casosCompartilhados() = Casos.verificar("busca_binaria") { entrada ->
        Casos.semMutacao(Casos.inteiros(entrada, "numeros")) {
            buscaBinaria(it, entrada["alvo"].asInt)
        }
    }

    @Test
    fun encontraExtremosEmArrayLongo() {
        val numeros = IntArray(10_000) { it * 2 }
        assertEquals(0, buscaBinaria(numeros, 0))
        assertEquals(9_999, buscaBinaria(numeros, 19_998))
        assertEquals(-1, buscaBinaria(numeros, 19_997))
    }
}
