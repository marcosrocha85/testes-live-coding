import Testing
import LiveCoding

@Suite struct SubarrayMaximoTest {
    @Test(arguments: casos("subarray_maximo", entrada: EntradaSubarray.self, saida: Int.self))
    func compartilhados(_ caso: Caso<EntradaSubarray, Int>) {
        let entrada = caso.input.numeros
        #expect(subarrayMaximo(entrada) == caso.expected)
        #expect(entrada == caso.input.numeros)
    }

    @Test func somaExige64Bits() {
        #expect(Int.bitWidth == 64)
        #expect(subarrayMaximo(Array(repeating: 1_000_000, count: 10_000)) == 10_000_000_000)
        #expect(subarrayMaximo(Array(repeating: -1_000_000, count: 10_000)) == -1_000_000)
    }
}
