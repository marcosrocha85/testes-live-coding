package livecoding.mesclar_listas_ordenadas

import livecoding._shared.No
import livecoding._tests.Casos
import livecoding._tests.Listas
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestFactory

class MesclarListasOrdenadasTest {
    private fun verificar(a: No?, b: No?): IntArray {
        // A ordenação estável é uma referência independente da mesclagem por ponteiros.
        val esperados = (Listas.nosDaLista(a) + Listas.nosDaLista(b)).sortedBy { it.valor }
        val resultado = mesclarListasOrdenadas(a, b)
        val atuais = Listas.nosDaLista(resultado)
        assertEquals(esperados.size, atuais.size)
        esperados.zip(atuais).forEach { (esperado, atual) -> assertSame(esperado, atual) }
        return Listas.valoresDaLista(resultado)
    }

    @TestFactory
    fun casosCompartilhados() = Casos.verificar("mesclar_listas_ordenadas") {
        verificar(Listas.criarLista(Casos.inteiros(it, "primeira")), Listas.criarLista(Casos.inteiros(it, "segunda")))
    }

    @Test
    fun empateMantemOrdemEIdentidade() {
        assertArrayEquals(intArrayOf(1, 1, 2, 2), verificar(No(1, No(2)), No(1, No(2))))
    }

    @Test
    fun mesclaListasLongasSemCopiarNos() {
        val pares = Listas.criarLista(IntArray(5_000) { 2 * it })
        val impares = Listas.criarLista(IntArray(5_000) { 2 * it + 1 })
        assertArrayEquals(IntArray(10_000) { it }, verificar(pares, impares))
    }
}
