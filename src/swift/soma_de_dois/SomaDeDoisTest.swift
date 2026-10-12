import Testing
import LiveCoding

@Suite struct SomaDeDoisTest {
    @Test(arguments: casos("soma_de_dois", entrada: EntradaNumeros.self, saida: [Int].self))
    func compartilhados(_ caso: Caso<EntradaNumeros, [Int]>) {
        let entrada = caso.input.numeros
        #expect(somaDeDois(entrada, caso.input.alvo) == caso.expected)
        #expect(entrada == caso.input.numeros)
    }
}
