import Testing
import LiveCoding

@Suite struct ParentesesValidosTest {
    @Test(arguments: casos("parenteses_validos", entrada: EntradaTexto.self, saida: Bool.self))
    func compartilhados(_ caso: Caso<EntradaTexto, Bool>) {
        #expect(parentesesValidos(caso.input.texto) == caso.expected)
    }

    @Test func escalaresInvalidos() {
        #expect(!parentesesValidos("(\u{301})"))
        #expect(!parentesesValidos("\u{ff08}\u{ff09}"))
    }
}
