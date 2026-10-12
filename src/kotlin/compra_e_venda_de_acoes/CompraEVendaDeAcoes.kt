package livecoding.compra_e_venda_de_acoes

fun maiorLucro(precos: IntArray): Int {
    if (precos.isEmpty()) return 0
    var menor = precos[0]
    var melhor = 0
    for (dia in 1..precos.lastIndex) {
        // O menor preço é de um dia anterior: comprar precisa preceder vender.
        melhor = maxOf(melhor, precos[dia] - menor)
        menor = minOf(menor, precos[dia])
    }
    return melhor
}
