import Testing
import LiveCoding

func montarLista(_ valores: [Int]) -> (cabeca: No?, nos: [No]) {
    let nos = valores.map { No($0) }
    for indice in nos.indices.dropLast() { nos[indice].proximo = nos[indice + 1] }
    return (nos.first, nos)
}

func desmontarLista(_ nos: [No]) {
    // ARC não coleta ciclos de referências fortes. Desfaça também cadeias longas.
    for no in nos { no.proximo = nil }
}

func percorrerLista(_ cabeca: No?) throws -> [No] {
    var visitados: Set<ObjectIdentifier> = []
    var resultado: [No] = []
    var atual = cabeca
    while let no = atual {
        try #require(visitados.insert(ObjectIdentifier(no)).inserted, "Ciclo inesperado no resultado")
        resultado.append(no)
        atual = no.proximo
    }
    return resultado
}

func verificarReuso(_ resultado: [No], _ originais: [No]) {
    #expect(resultado.count == originais.count)
    #expect(Set(resultado.map(ObjectIdentifier.init)) == Set(originais.map(ObjectIdentifier.init)))
}
