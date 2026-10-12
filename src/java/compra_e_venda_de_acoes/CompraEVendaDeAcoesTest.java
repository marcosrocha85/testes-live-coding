package tinker.livecoding.compra_e_venda_de_acoes;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;

class CompraEVendaDeAcoesTest {
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("compra_e_venda_de_acoes", entrada -> Casos.semMutacao(Casos.inteiros(entrada, "precos"), CompraEVendaDeAcoes::maiorLucro));
    }
}
