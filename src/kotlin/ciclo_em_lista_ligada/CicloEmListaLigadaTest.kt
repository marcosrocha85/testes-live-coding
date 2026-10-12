package livecoding.ciclo_em_lista_ligada

import livecoding._tests.Casos
import livecoding._tests.Listas
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestFactory

class CicloEmListaLigadaTest {
    private fun verificar(valores: IntArray, retorno: Int): Boolean {
        val cabeca = Listas.criarLista(valores, retorno)
        var atual = cabeca
        // Número conhecido de nós: esta leitura termina mesmo se houver um ciclo.
        val nos = List(valores.size) { checkNotNull(atual).also { atual = it.proximo } }
        val seguintes = nos.map { it.proximo }
        val resultado = temCiclo(cabeca)
        nos.zip(seguintes).forEach { (no, proximo) -> assertSame(proximo, no.proximo) }
        return resultado
    }

    @TestFactory
    fun casosCompartilhados() = Casos.verificar("ciclo_em_lista_ligada") {
        verificar(Casos.inteiros(it, "valores"), it["indiceCiclo"].asInt)
    }

    @Test
    fun detectaTodasAsPosicoesComValoresRepetidosSemMudarPonteiros() {
        for (tamanho in 0..20) {
            for (retorno in -1 until tamanho) {
                assertEquals(retorno >= 0, verificar(IntArray(tamanho), retorno))
            }
        }
    }
}
