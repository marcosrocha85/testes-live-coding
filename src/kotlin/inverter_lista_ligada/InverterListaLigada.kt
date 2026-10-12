package livecoding.inverter_lista_ligada

import livecoding._shared.No

fun inverterListaLigada(cabeca: No?): No? {
    var anterior: No? = null
    var atual = cabeca
    while (atual != null) {
        val seguinte = atual.proximo // Salve o restante antes de inverter a seta.
        atual.proximo = anterior
        anterior = atual
        atual = seguinte
    }
    return anterior
}
