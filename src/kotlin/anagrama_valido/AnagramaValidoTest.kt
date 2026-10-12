package livecoding.anagrama_valido

import livecoding._tests.Casos
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestFactory

class AnagramaValidoTest {
    @TestFactory
    fun casosCompartilhados() = Casos.verificar("anagrama_valido") {
        anagramaValido(it["primeiro"].asString, it["segundo"].asString)
    }

    @Test
    fun unidadesUtf16IguaisNaoGarantemPontosDeCodigoIguais() {
        assertFalse(anagramaValido("\uD83D\uDE00\uD83E\uDD00", "\uD83D\uDD00\uD83E\uDE00"))
    }
}
