package livecoding.soma_de_dois

fun somaDeDois(numeros: IntArray, alvo: Int): IntArray? {
    val vistos = mutableMapOf<Int, Int>()
    for ((indice, numero) in numeros.withIndex()) {
        val anterior = vistos[alvo - numero]
        // Procure antes de guardar: uma posição não pode formar par consigo mesma.
        if (anterior != null) return intArrayOf(anterior, indice)
        vistos.putIfAbsent(numero, indice) // Preserve a primeira ocorrência.
    }
    return null
}
