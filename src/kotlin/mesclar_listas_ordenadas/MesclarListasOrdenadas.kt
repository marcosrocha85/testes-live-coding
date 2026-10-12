package livecoding.mesclar_listas_ordenadas

import livecoding._shared.No

fun mesclarListasOrdenadas(primeira: No?, segunda: No?): No? {
    val sentinela = No(0) // Facilita a primeira ligação e fica fora do resultado.
    var cauda = sentinela
    var a = primeira
    var b = segunda
    while (a != null && b != null) {
        val escolhido: No
        if (a.valor <= b.valor) { // No empate, o nó da primeira lista vem antes.
            escolhido = a
            a = a.proximo
        } else {
            escolhido = b
            b = b.proximo
        }
        cauda.proximo = escolhido
        cauda = escolhido
    }
    cauda.proximo = a ?: b // Reaproveita também o restante da lista não vazia.
    return sentinela.proximo
}
