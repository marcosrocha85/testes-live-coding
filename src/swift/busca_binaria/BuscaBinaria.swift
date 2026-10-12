public func buscaBinaria(_ numeros: [Int], _ alvo: Int) -> Int {
    var inicio = 0
    var fim = numeros.count - 1
    while inicio <= fim {
        let meio = inicio + (fim - inicio) / 2
        if numeros[meio] == alvo { return meio }
        // A ordenação garante que a metade descartada não contém o alvo.
        if numeros[meio] < alvo {
            inicio = meio + 1
        } else {
            fim = meio - 1
        }
    }
    return -1
}
