package livecoding.soma_de_dois

import livecoding._tests.Casos
import org.junit.jupiter.api.TestFactory

class SomaDeDoisTest {
    @TestFactory
    fun casosCompartilhados() = Casos.verificar("soma_de_dois") { entrada ->
        Casos.semMutacao(Casos.inteiros(entrada, "numeros")) {
            somaDeDois(it, entrada["alvo"].asInt)
        }
    }
}
