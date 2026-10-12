import Testing
import LiveCoding

@Suite struct InverterListaLigadaTest {
    @Test(arguments: casos("inverter_lista_ligada", entrada: EntradaLista.self, saida: [Int].self))
    func compartilhados(_ caso: Caso<EntradaLista, [Int]>) throws {
        let lista = montarLista(caso.input.valores)
        defer { desmontarLista(lista.nos) }
        let resultado = try percorrerLista(inverterListaLigada(lista.cabeca))
        #expect(resultado.map(\.valor) == caso.expected)
        #expect(resultado.map(ObjectIdentifier.init) == lista.nos.reversed().map(ObjectIdentifier.init))
        verificarReuso(resultado, lista.nos)
    }

    @Test func listaLonga() throws {
        let lista = montarLista(Array(0..<10_000))
        defer { desmontarLista(lista.nos) }
        let resultado = try percorrerLista(inverterListaLigada(lista.cabeca))
        #expect(resultado.map(\.valor) == Array((0..<10_000).reversed()))
        verificarReuso(resultado, lista.nos)
    }

    @Test func duasInversoesRestauramIdentidade() throws {
        let lista = montarLista([1, 1, 2, 1])
        defer { desmontarLista(lista.nos) }
        let resultado = try percorrerLista(inverterListaLigada(inverterListaLigada(lista.cabeca)))
        #expect(resultado.map(ObjectIdentifier.init) == lista.nos.map(ObjectIdentifier.init))
    }
}
