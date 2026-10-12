package tinker.livecoding.parenteses_validos;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ParentesesValidosTest {
    @Test void aceitaAninhamentoProfundoSemRecursao() {
        assertTrue(ParentesesValidos.parentesesValidos("(".repeat(20_000) + ")".repeat(20_000)));
        assertFalse(ParentesesValidos.parentesesValidos("😀"));
    }
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("parenteses_validos", entrada -> ParentesesValidos.parentesesValidos(entrada.get("texto").getAsString()));
    }
}
