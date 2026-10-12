package tinker.livecoding.soma_de_dois;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;

class SomaDeDoisTest {
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("soma_de_dois", entrada -> Casos.semMutacao(Casos.inteiros(entrada, "numeros"), numeros -> SomaDeDois.somaDeDois(numeros, entrada.get("alvo").getAsInt())));
    }
}
