package tinker.livecoding.busca_binaria;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;

class BuscaBinariaTest {
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("busca_binaria", entrada -> Casos.semMutacao(Casos.inteiros(entrada, "numeros"), numeros -> BuscaBinaria.buscaBinaria(numeros, entrada.get("alvo").getAsInt())));
    }
}
