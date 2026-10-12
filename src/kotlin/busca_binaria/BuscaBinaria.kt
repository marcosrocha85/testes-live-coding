package livecoding.busca_binaria

fun buscaBinaria(numeros: IntArray, alvo: Int): Int {
    var inicio = 0
    var fim = numeros.lastIndex
    while (inicio <= fim) {
        val meio = inicio + (fim - inicio) / 2
        when {
            numeros[meio] == alvo -> return meio
            numeros[meio] < alvo -> inicio = meio + 1
            else -> fim = meio - 1
        }
        // O centro já foi conferido; os novos limites sempre reduzem o intervalo.
    }
    return -1
}
