import Testing
import LiveCoding

@Suite struct MesclarListasOrdenadasTest {
    @Test(arguments: casos("mesclar_listas_ordenadas", entrada: EntradaListas.self, saida: [Int].self))
    func compartilhados(_ caso: Caso<EntradaListas, [Int]>) throws {
        let a = montarLista(caso.input.primeira)
        let b = montarLista(caso.input.segunda)
        defer { desmontarLista(a.nos + b.nos) }
        let resultado = try percorrerLista(mesclarListasOrdenadas(a.cabeca, b.cabeca))
        #expect(resultado.map(\.valor) == caso.expected)
        verificarReuso(resultado, a.nos + b.nos)
    }

    @Test func empatePreservaOrdemDosNos() throws {
        let a = montarLista([1, 1, 3])
        let b = montarLista([1, 2, 3])
        defer { desmontarLista(a.nos + b.nos) }
        let resultado = try percorrerLista(mesclarListasOrdenadas(a.cabeca, b.cabeca))
        let esperado = [a.nos[0], a.nos[1], b.nos[0], b.nos[1], a.nos[2], b.nos[2]]
        #expect(resultado.map(ObjectIdentifier.init) == esperado.map(ObjectIdentifier.init))
    }

    @Test func listasLongas() throws {
        let a = montarLista(Array(stride(from: 0, to: 10_000, by: 2)))
        let b = montarLista(Array(stride(from: 1, to: 10_000, by: 2)))
        defer { desmontarLista(a.nos + b.nos) }
        let resultado = try percorrerLista(mesclarListasOrdenadas(a.cabeca, b.cabeca))
        #expect(resultado.map(\.valor) == Array(0..<10_000))
        verificarReuso(resultado, a.nos + b.nos)
    }
}
