package livecoding.subarray_maximo

fun subarrayMaximo(numeros: IntArray): Long? {
    if (numeros.isEmpty()) return null
    // Long comporta a soma de 10.000 elementos, mesmo que cada um caiba em Int.
    var atual = numeros[0].toLong()
    var melhor = atual
    for (indice in 1..numeros.lastIndex) {
        val numero = numeros[indice].toLong()
        atual = maxOf(numero, atual + numero) // Comece aqui ou estenda o trecho.
        melhor = maxOf(melhor, atual)
    }
    return melhor
}
