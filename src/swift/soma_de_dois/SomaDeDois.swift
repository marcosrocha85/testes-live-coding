public func somaDeDois(_ numeros: [Int], _ alvo: Int) -> [Int]? {
    var vistos: [Int: Int] = [:]
    for (indice, numero) in numeros.enumerated() {
        // Consultar antes de registrar impede usar o mesmo índice duas vezes.
        if let anterior = vistos[alvo - numero] {
            return [anterior, indice]
        }
        // A primeira ocorrência deve continuar disponível quando há repetidos.
        if vistos[numero] == nil { vistos[numero] = indice }
    }
    return nil
}
