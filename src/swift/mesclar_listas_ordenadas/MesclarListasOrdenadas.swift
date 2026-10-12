public func mesclarListasOrdenadas(_ primeira: No?, _ segunda: No?) -> No? {
    let sentinela = No(0)
    var cauda = sentinela
    var a = primeira
    var b = segunda
    while let noA = a, let noB = b {
        // Empates preservam a preferência pelos nós da primeira lista.
        if noA.valor <= noB.valor {
            cauda.proximo = noA
            a = noA.proximo
            cauda = noA
        } else {
            cauda.proximo = noB
            b = noB.proximo
            cauda = noB
        }
    }
    // O restante já está ordenado; os nós originais são reaproveitados.
    cauda.proximo = a ?? b
    return sentinela.proximo
}
