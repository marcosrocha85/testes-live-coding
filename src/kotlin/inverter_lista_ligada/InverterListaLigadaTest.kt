package livecoding.inverter_lista_ligada

import livecoding._tests.Casos
import livecoding._tests.Listas
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestFactory

class InverterListaLigadaTest {
    private fun verificar(valores: IntArray): IntArray {
        val cabeca = Listas.criarLista(valores)
        val originais = Listas.nosDaLista(cabeca)
        val resultado = inverterListaLigada(cabeca)
        val invertidos = Listas.nosDaLista(resultado)
        assertEquals(originais.size, invertidos.size)
        originais.reversed().zip(invertidos).forEach { (esperado, atual) -> assertSame(esperado, atual) }
        return Listas.valoresDaLista(resultado)
    }

    @TestFactory
    fun casosCompartilhados() = Casos.verificar("inverter_lista_ligada") {
        verificar(Casos.inteiros(it, "valores"))
    }

    @Test
    fun suportaListaLongaSemRecursao() {
        val valores = IntArray(10_000) { it }
        assertArrayEquals(valores.reversedArray(), verificar(valores))
    }

    @Test
    fun duasInversoesRestauramAsReferencias() {
        val cabeca = Listas.criarLista(intArrayOf(1, 1, 2, 1))
        val nos = Listas.nosDaLista(cabeca)
        val resultado = inverterListaLigada(inverterListaLigada(cabeca))
        assertSame(cabeca, resultado)
        nos.zip(Listas.nosDaLista(resultado)).forEach { (esperado, atual) -> assertSame(esperado, atual) }
    }
}
