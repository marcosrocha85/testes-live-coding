public func inverterListaLigada(_ cabeca: No?) -> No? {
    var anterior: No? = nil
    var atual = cabeca
    while let no = atual {
        // Preserve a ligação antiga antes de apontar o nó para trás.
        let seguinte = no.proximo
        no.proximo = anterior
        anterior = no
        atual = seguinte
    }
    return anterior
}
