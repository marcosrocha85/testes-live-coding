import Testing
import LiveCoding

@Suite struct CompraEVendaDeAcoesTest {
    @Test(arguments: casos("compra_e_venda_de_acoes", entrada: EntradaPrecos.self, saida: Int.self))
    func compartilhados(_ caso: Caso<EntradaPrecos, Int>) {
        let entrada = caso.input.precos
        #expect(maiorLucro(entrada) == caso.expected)
        #expect(entrada == caso.input.precos)
    }
}
