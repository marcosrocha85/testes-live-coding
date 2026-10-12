package tinker.livecoding._tests;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.function.Function;
import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import static org.junit.jupiter.api.Assertions.*;

/** Lê os JSON canônicos copiados pelo Maven para os recursos de teste. */
public final class Casos {
    private static final Gson GSON = new Gson();
    private Casos() {}

    public static Stream<DynamicTest> verificar(String desafio, Function<JsonObject, Object> executar) {
        var arquivo = Casos.class.getResourceAsStream("/casos/" + desafio + ".json");
        if (arquivo == null) throw new IllegalStateException("Casos não encontrados: " + desafio);
        try (var leitor = new InputStreamReader(arquivo, StandardCharsets.UTF_8)) {
            return JsonParser.parseReader(leitor).getAsJsonArray().asList().stream().map(elemento -> {
                JsonObject caso = elemento.getAsJsonObject();
                return DynamicTest.dynamicTest(caso.get("name").getAsString(), () -> {
                    JsonObject entrada = caso.getAsJsonObject("input").deepCopy();
                    if (caso.has("error")) {
                        assertEquals("RangeError", caso.get("error").getAsString());
                        assertThrows(IllegalArgumentException.class, () -> executar.apply(entrada));
                    } else {
                        Object resultado = executar.apply(entrada);
                        if (caso.has("expectedIndices")) {
                            assertTrue(caso.getAsJsonArray("expectedIndices").asList().stream()
                                    .anyMatch(indice -> indice.getAsInt() == ((Number) resultado).intValue()));
                        } else {
                            assertEquals(caso.get("expected"), GSON.toJsonTree(resultado));
                        }
                    }
                    assertEquals(caso.get("input"), entrada, "O adaptador não deve modificar o JSON.");
                });
            });
        } catch (java.io.IOException erro) {
            throw new IllegalStateException("Falha ao ler os casos de " + desafio, erro);
        }
    }

    public static int[] inteiros(JsonObject entrada, String campo) {
        return entrada.getAsJsonArray(campo).asList().stream().mapToInt(JsonElement::getAsInt).toArray();
    }

    public static Object semMutacao(int[] entrada, Function<int[], Object> executar) {
        int[] original = Arrays.copyOf(entrada, entrada.length);
        try {
            return executar.apply(entrada);
        } finally {
            assertArrayEquals(original, entrada, "A solução não deve alterar o array de entrada.");
        }
    }
}
