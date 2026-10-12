package livecoding.anagrama_valido

fun anagramaValido(primeiro: String, segundo: String): Boolean {
    val contagens = mutableMapOf<Int, Int>()
    // Char é uma unidade UTF-16. codePoints() lê um emoji inteiro, por exemplo.
    val pontosPrimeiro = primeiro.codePoints().iterator()
    while (pontosPrimeiro.hasNext()) {
        val ponto = pontosPrimeiro.nextInt()
        contagens[ponto] = (contagens[ponto] ?: 0) + 1
    }
    val pontosSegundo = segundo.codePoints().iterator()
    while (pontosSegundo.hasNext()) {
        val ponto = pontosSegundo.nextInt()
        val quantidade = contagens[ponto] ?: return false
        if (quantidade == 1) contagens.remove(ponto)
        else contagens[ponto] = quantidade - 1
    }
    return contagens.isEmpty()
}
