public func parentesesValidos(_ texto: String) -> Bool {
    var pilha: [UInt32] = []
    for ponto in texto.unicodeScalars {
        switch ponto.value {
        case 40, 91, 123: // (, [, {
            pilha.append(ponto.value)
        case 41, 93, 125: // ), ], }
            let abertura: UInt32 = ponto.value == 41 ? 40 : ponto.value == 93 ? 91 : 123
            // Falta de abertura ou fechamento fora de ordem invalida a sequência.
            if pilha.popLast() != abertura { return false }
        default:
            return false
        }
    }
    return pilha.isEmpty
}
