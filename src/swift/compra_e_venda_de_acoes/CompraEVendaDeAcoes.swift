public func maiorLucro(_ precos: [Int]) -> Int {
    guard var menorPreco = precos.first else { return 0 }
    var lucro = 0
    for preco in precos.dropFirst() {
        // O menor preço pertence somente a dias anteriores à venda atual.
        lucro = max(lucro, preco - menorPreco)
        menorPreco = min(menorPreco, preco)
    }
    return lucro
}
