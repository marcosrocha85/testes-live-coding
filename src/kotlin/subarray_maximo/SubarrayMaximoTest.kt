package livecoding.subarray_maximo

import livecoding._tests.Casos
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestFactory

class SubarrayMaximoTest {
    @TestFactory
    fun casosCompartilhados() = Casos.verificar("subarray_maximo") {
        Casos.semMutacao(Casos.inteiros(it, "numeros"), ::subarrayMaximo)
    }

    @Test
    fun somaExcedeIntSemPerderPrecisao() {
        assertEquals(10_000_000_000L, subarrayMaximo(IntArray(10_000) { 1_000_000 }))
        assertEquals(-1_000_000L, subarrayMaximo(IntArray(10_000) { -1_000_000 }))
    }
}
