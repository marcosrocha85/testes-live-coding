import Testing
import LiveCoding

@Suite struct SubirEscadasTest {
    @Test(arguments: casos("subir_escadas", entrada: EntradaEscadas.self, saida: Int.self))
    func compartilhados(_ caso: Caso<EntradaEscadas, Int>) throws {
        if let erro = caso.error {
            #expect(erro == "RangeError")
            #expect(throws: ErroDeEntrada.degrausForaDoDominio) { try subirEscadas(caso.input.degraus) }
        } else { #expect(try subirEscadas(caso.input.degraus) == caso.expected) }
    }

    @Test func rejeitaNaoFinitos() {
        for entrada in [Double.nan, Double.infinity, -Double.infinity] {
            #expect(throws: ErroDeEntrada.degrausForaDoDominio) { try subirEscadas(entrada) }
        }
    }

    @Test func dominioCompletoPorCombinacoes() throws {
        // Escolher posições dos passos duplos conta caminhos sem Fibonacci.
        for degraus in 0...77 {
            var total = 0
            for duplos in 0...(degraus / 2) {
                let passos = degraus - duplos
                var combinacao = 1
                for i in 0..<duplos { combinacao = combinacao * (passos - i) / (i + 1) }
                total += combinacao
            }
            #expect(try subirEscadas(Double(degraus)) == total)
        }
    }

    @Test func fronteirasDaValidacao() throws {
        #expect(try subirEscadas(-0.0) == 1)
        for entrada in [Double.leastNonzeroMagnitude, 77.5, Double.greatestFiniteMagnitude] {
            #expect(throws: ErroDeEntrada.degrausForaDoDominio) { try subirEscadas(entrada) }
        }
    }
}
