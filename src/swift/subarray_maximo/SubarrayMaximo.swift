public func subarrayMaximo(_ numeros: [Int]) -> Int? {
    guard var somaAtual = numeros.first else { return nil }
    var melhor = somaAtual
    for numero in numeros.dropFirst() {
        // Se carregar o trecho anterior prejudica a soma, recomece aqui.
        somaAtual = max(numero, somaAtual + numero)
        melhor = max(melhor, somaAtual)
    }
    return melhor
}
