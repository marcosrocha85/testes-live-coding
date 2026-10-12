import Testing
import LiveCoding

@Suite struct BuscaBinariaTest {
    @Test(arguments: casos("busca_binaria", entrada: EntradaNumeros.self, saida: Int.self))
    func compartilhados(_ caso: Caso<EntradaNumeros, Int>) {
        let entrada = caso.input.numeros
        let resultado = buscaBinaria(entrada, caso.input.alvo)
        if let indices = caso.expectedIndices { #expect(indices.contains(resultado)) }
        else { #expect(resultado == caso.expected) }
        #expect(entrada == caso.input.numeros)
    }

    @Test func extremosListaLonga() {
        let numeros = Array(0..<10_000)
        #expect(buscaBinaria(numeros, 0) == 0)
        #expect(buscaBinaria(numeros, 9_999) == 9_999)
        #expect(buscaBinaria(numeros, 10_000) == -1)
        #expect(buscaBinaria(numeros, -1) == -1)
    }
}
