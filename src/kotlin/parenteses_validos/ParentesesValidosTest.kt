package livecoding.parenteses_validos

import livecoding._tests.Casos
import org.junit.jupiter.api.TestFactory

class ParentesesValidosTest {
    @TestFactory
    fun casosCompartilhados() = Casos.verificar("parenteses_validos") {
        parentesesValidos(it["texto"].asString)
    }
}
