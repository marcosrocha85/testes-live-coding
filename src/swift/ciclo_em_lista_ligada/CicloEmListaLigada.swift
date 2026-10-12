public func temCiclo(_ cabeca: No?) -> Bool {
    var lento = cabeca
    var rapido = cabeca
    while let primeiroPasso = rapido?.proximo {
        lento = lento?.proximo
        rapido = primeiroPasso.proximo
        // Compare o próprio objeto, mesmo quando vários nós têm o mesmo valor.
        if let noLento = lento, let noRapido = rapido, noLento === noRapido {
            return true
        }
    }
    return false
}
