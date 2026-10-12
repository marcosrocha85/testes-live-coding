package livecoding._tests

import java.util.Random
import livecoding.soma_de_dois.somaDeDois
import livecoding.busca_binaria.buscaBinaria
import livecoding.compra_e_venda_de_acoes.maiorLucro
import livecoding.subarray_maximo.subarrayMaximo
import livecoding.parenteses_validos.parentesesValidos
import livecoding.anagrama_valido.anagramaValido
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

class ReferenciaTest {
    private fun entradas(): List<IntArray> {
        val random = Random(20261012)
        return List(150) { IntArray(random.nextInt(15)) { random.nextInt(21) - 10 } }
    }

    @Test
    fun somaConcordaComTodosOsParesNaOrdemDoContrato() {
        for (numeros in entradas()) for (alvo in -20..20) {
            var esperado: IntArray? = null
            procurar@ for (segundo in numeros.indices) {
                for (primeiro in 0 until segundo) {
                    if (numeros[primeiro] + numeros[segundo] == alvo) {
                        esperado = intArrayOf(primeiro, segundo)
                        break@procurar
                    }
                }
            }
            assertArrayEquals(esperado, somaDeDois(numeros, alvo))
        }
    }

    @Test
    fun buscaConcordaComBuscaLinear() {
        for (numeros in entradas()) {
            numeros.sort()
            for (alvo in -11..11) {
                val indice = buscaBinaria(numeros, alvo)
                if (alvo in numeros) {
                    assertTrue(indice in numeros.indices)
                    assertEquals(alvo, numeros[indice])
                } else assertEquals(-1, indice)
            }
        }
    }

    @Test
    fun lucroConcordaComTodasAsComprasEVendas() {
        for (entrada in entradas()) {
            val precos = entrada.map { it + 10 }
            var esperado = 0
            for (compra in precos.indices) for (venda in compra + 1 until precos.size) {
                esperado = maxOf(esperado, precos[venda] - precos[compra])
            }
            assertEquals(esperado, maiorLucro(precos.toIntArray()))
        }
    }

    @Test
    fun kadaneConcordaComTodosOsTrechosContiguos() {
        for (numeros in entradas()) {
            var esperado: Long? = null
            for (inicio in numeros.indices) {
                var soma = 0L
                for (fim in inicio..numeros.lastIndex) {
                    soma += numeros[fim]
                    if (esperado == null || soma > esperado) esperado = soma
                }
            }
            assertEquals(esperado, subarrayMaximo(numeros))
        }
    }

    @Test
    fun parentesesConcordaComRemocaoDeParesAdjacentes() {
        val random = Random(20261012)
        val simbolos = "()[]{}a"
        repeat(500) {
            val texto = buildString { repeat(random.nextInt(20)) { append(simbolos[random.nextInt(simbolos.length)]) } }
            var reduzido = texto
            do {
                val anterior = reduzido
                reduzido = reduzido.replace("()", "").replace("[]", "").replace("{}", "")
            } while (reduzido != anterior)
            assertEquals(reduzido.isEmpty(), parentesesValidos(texto))
        }
    }

    @Test
    fun anagramaConcordaComOrdenacaoDePontosDeCodigo() {
        val random = Random(20261012)
        val alfabeto = "aAéé 😀🦀".codePoints().toArray()
        fun texto(): String = buildString {
            repeat(random.nextInt(20)) { appendCodePoint(alfabeto[random.nextInt(alfabeto.size)]) }
        }
        repeat(200) {
            val a = texto()
            val b = texto()
            val esperado = a.codePoints().sorted().toArray().contentEquals(b.codePoints().sorted().toArray())
            assertEquals(esperado, anagramaValido(a, b))
            // Reconstrua pela ordem dos pontos completos, sem separar os pares substitutos.
            val permutado = buildString { a.codePoints().toArray().reversed().forEach { appendCodePoint(it) } }
            assertTrue(anagramaValido(a, permutado))
        }
    }
}
