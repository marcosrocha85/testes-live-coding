public enum ErroDeEntrada: Error, Equatable {
    case degrausForaDoDominio
}

public func subirEscadas(_ degraus: Double) throws -> Int {
    guard degraus.isFinite, let quantidade = Int(exactly: degraus),
          degraus >= 0, degraus <= 77 else {
        throw ErroDeEntrada.degrausForaDoDominio
    }
    var anterior = 1
    var atual = 1
    // Double permite validar frações; a contagem usa apenas inteiros de 64 bits.
    for _ in 0..<quantidade {
        (anterior, atual) = (atual, anterior + atual)
    }
    return anterior
}
