package livecoding.parenteses_validos

fun parentesesValidos(texto: String): Boolean {
    val pilha = ArrayDeque<Char>()
    val aberturas = mapOf(')' to '(', ']' to '[', '}' to '{')
    for (simbolo in texto) {
        when (simbolo) {
            '(', '[', '{' -> pilha.addLast(simbolo)
            ')', ']', '}' -> {
                // O último par aberto precisa ser o primeiro a fechar.
                if (pilha.removeLastOrNull() != aberturas[simbolo]) return false
            }
            else -> return false
        }
    }
    return pilha.isEmpty()
}
