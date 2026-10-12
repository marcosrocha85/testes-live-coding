public func anagramaValido(_ primeira: String, _ segunda: String) -> Bool {
    var frequencias: [UInt32: Int] = [:]
    // Valores numéricos dos pontos evitam a equivalência canônica de String.
    for ponto in primeira.unicodeScalars {
        frequencias[ponto.value, default: 0] += 1
    }
    for ponto in segunda.unicodeScalars {
        guard let quantidade = frequencias[ponto.value] else { return false }
        if quantidade == 1 {
            frequencias.removeValue(forKey: ponto.value)
        } else {
            frequencias[ponto.value] = quantidade - 1
        }
    }
    return frequencias.isEmpty
}
