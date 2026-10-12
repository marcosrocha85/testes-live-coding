package livecoding._tests

import com.google.gson.Gson
import com.google.gson.JsonObject
import com.google.gson.JsonParser
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.DynamicTest

object Casos {
    private val gson = Gson()

    // As entradas canônicas são recursos de teste, copiados sem alterar os JSON.
    fun verificar(desafio: String, executar: (JsonObject) -> Any?): List<DynamicTest> {
        val arquivo = checkNotNull(javaClass.getResourceAsStream("/casos/$desafio.json")) {
            "Casos não encontrados: $desafio"
        }
        val casos = arquivo.bufferedReader(Charsets.UTF_8).use { JsonParser.parseReader(it).asJsonArray }
        return casos.map { elemento ->
            val caso = elemento.asJsonObject
            DynamicTest.dynamicTest(caso["name"].asString) {
                val entrada = caso.getAsJsonObject("input").deepCopy()
                if (caso.has("error")) {
                    assertEquals("RangeError", caso["error"].asString)
                    assertThrows(IllegalArgumentException::class.java) { executar(entrada) }
                } else {
                    val resultado = executar(entrada)
                    if (caso.has("expectedIndices")) {
                        assertTrue(caso.getAsJsonArray("expectedIndices").any { it.asInt == resultado })
                    } else {
                        assertEquals(caso["expected"], gson.toJsonTree(resultado))
                    }
                }
                assertEquals(caso["input"], entrada, "O adaptador não deve modificar o JSON.")
            }
        }
    }

    fun inteiros(entrada: JsonObject, campo: String): IntArray =
        entrada.getAsJsonArray(campo).map { it.asInt }.toIntArray()

    fun semMutacao(entrada: IntArray, executar: (IntArray) -> Any?): Any? {
        val original = entrada.copyOf()
        return try { executar(entrada) }
        finally { assertArrayEquals(original, entrada, "A solução não deve modificar o array.") }
    }
}
