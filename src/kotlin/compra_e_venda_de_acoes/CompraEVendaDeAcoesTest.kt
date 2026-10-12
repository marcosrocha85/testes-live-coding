package livecoding.compra_e_venda_de_acoes

import livecoding._tests.Casos
import org.junit.jupiter.api.TestFactory

class CompraEVendaDeAcoesTest {
    @TestFactory
    fun casosCompartilhados() = Casos.verificar("compra_e_venda_de_acoes") {
        Casos.semMutacao(Casos.inteiros(it, "precos"), ::maiorLucro)
    }
}
