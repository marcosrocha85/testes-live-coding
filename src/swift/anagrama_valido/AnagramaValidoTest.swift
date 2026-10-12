import Testing
import LiveCoding

@Suite struct AnagramaValidoTest {
    @Test(arguments: casos("anagrama_valido", entrada: EntradaAnagrama.self, saida: Bool.self))
    func compartilhados(_ caso: Caso<EntradaAnagrama, Bool>) {
        #expect(anagramaValido(caso.input.primeiro, caso.input.segundo) == caso.expected)
    }

    @Test func naoUsaEquivalenciaCanonicaDeString() {
        #expect("é" == "e\u{301}") // Swift considera estes textos equivalentes.
        #expect(!anagramaValido("é", "e\u{301}")) // O contrato exige pontos distintos.
        #expect(anagramaValido("a\u{301}b", "ab\u{301}")) // Grafemas agrupados não servem.
    }

    @Test func bytesIguaisNaoSaoPontosIguais() {
        #expect(!anagramaValido("\u{a0}\u{e1}", "\u{a1}\u{e0}"))
        #expect(anagramaValido("012 😀\u{0}", "\u{0}😀 210"))
        #expect(!anagramaValido("a a", "aa"))
        #expect(!anagramaValido("A", "a"))
    }

    @Test func limitesUnicode() {
        let texto = "\u{0}\u{7f}\u{80}\u{7ff}\u{800}\u{ffff}\u{10000}\u{10ffff}"
        let invertido = String(String.UnicodeScalarView(texto.unicodeScalars.reversed()))
        #expect(anagramaValido(texto, invertido))
    }
}
