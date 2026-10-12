package tinker.livecoding.anagrama_valido;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class AnagramaValidoTest {
    @Test void mesmasUnidadesUtf16PodemFormarPontosDiferentes() {
        assertFalse(AnagramaValido.anagramaValido("\uD83D\uDE00\uD83E\uDD00", "\uD83D\uDD00\uD83E\uDE00"));
    }
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("anagrama_valido", entrada -> AnagramaValido.anagramaValido(entrada.get("primeiro").getAsString(), entrada.get("segundo").getAsString()));
    }
}
