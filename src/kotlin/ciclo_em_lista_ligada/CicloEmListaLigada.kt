package livecoding.ciclo_em_lista_ligada

import livecoding._shared.No

fun temCiclo(cabeca: No?): Boolean {
    var lento = cabeca
    var rapido = cabeca
    while (rapido?.proximo != null) {
        lento = lento?.proximo
        rapido = rapido.proximo?.proximo
        // Compare os próprios objetos, não os valores guardados neles.
        if (lento === rapido) return true
    }
    return false
}
