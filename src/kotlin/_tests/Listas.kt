package livecoding._tests

import java.util.Collections
import java.util.IdentityHashMap
import livecoding._shared.No

object Listas {
    fun criarLista(valores: IntArray, indiceCiclo: Int = -1): No? {
        require(indiceCiclo == -1 || indiceCiclo in valores.indices)
        val nos = valores.map { No(it) }
        nos.zipWithNext().forEach { (atual, proximo) -> atual.proximo = proximo }
        if (indiceCiclo >= 0) nos.last().proximo = nos[indiceCiclo]
        return nos.firstOrNull()
    }

    // Esta travessia é só para testes de listas sem ciclo, nunca para a solução de Floyd.
    fun nosDaLista(cabeca: No?): List<No> {
        val visitados = Collections.newSetFromMap(IdentityHashMap<No, Boolean>())
        val nos = mutableListOf<No>()
        var atual = cabeca
        while (atual != null) {
            check(visitados.add(atual)) { "A lista contém um ciclo inesperado." }
            nos.add(atual)
            atual = atual.proximo
        }
        return nos
    }

    fun valoresDaLista(cabeca: No?): IntArray = nosDaLista(cabeca).map { it.valor }.toIntArray()
}
