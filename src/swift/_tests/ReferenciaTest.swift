import Foundation
import Testing
import LiveCoding

private struct Aleatorio {
    var estado: UInt64 = 20_261_012
    mutating func numero(_ limite: Int) -> Int {
        // A aritmética modular é intencional somente no gerador de dados de teste.
        estado = estado &* 6_364_136_223_846_793_005 &+ 1
        return Int((estado >> 32) % UInt64(limite))
    }
    mutating func array() -> [Int] { (0..<numero(15)).map { _ in numero(21) - 10 } }
}

@Suite struct ReferenciaTest {
    @Test func somaContraTodosOsPares() {
        var rng = Aleatorio()
        for _ in 0..<150 {
            let numeros = rng.array()
            let alvo = rng.numero(31) - 15
            var esperado: [Int]? = nil
            busca: for j in numeros.indices {
                for i in 0..<j where numeros[i] + numeros[j] == alvo {
                    esperado = [i, j]; break busca
                }
            }
            #expect(somaDeDois(numeros, alvo) == esperado)
        }
    }

    @Test func buscaContraProcuraLinear() {
        var rng = Aleatorio()
        for _ in 0..<150 {
            let numeros = rng.array().sorted()
            let alvo = rng.numero(31) - 15
            let resultado = buscaBinaria(numeros, alvo)
            if numeros.contains(alvo) {
                #expect(numeros.indices.contains(resultado))
                if numeros.indices.contains(resultado) { #expect(numeros[resultado] == alvo) }
            } else { #expect(resultado == -1) }
        }
    }

    @Test func lucroContraTodosOsDias() {
        var rng = Aleatorio()
        for _ in 0..<150 {
            let precos = rng.array().map { abs($0) }
            var esperado = 0
            for compra in precos.indices {
                for venda in (compra + 1)..<precos.count { esperado = max(esperado, precos[venda] - precos[compra]) }
            }
            #expect(maiorLucro(precos) == esperado)
        }
    }

    @Test func subarrayContraTodosOsTrechos() {
        var rng = Aleatorio()
        for _ in 0..<150 {
            let numeros = rng.array()
            var esperado: Int? = nil
            for inicio in numeros.indices {
                for fim in inicio..<numeros.count {
                    let soma = numeros[inicio...fim].reduce(0, +)
                    esperado = max(esperado ?? soma, soma)
                }
            }
            #expect(subarrayMaximo(numeros) == esperado)
        }
    }

    @Test func parentesesContraRemocaoDePares() {
        var rng = Aleatorio()
        let alfabeto = Array("()[]{}x")
        for _ in 0..<500 {
            let texto = String((0..<rng.numero(18)).map { _ in alfabeto[rng.numero(alfabeto.count)] })
            var restante = texto
            while true {
                let novo = restante.replacingOccurrences(of: "()", with: "")
                    .replacingOccurrences(of: "[]", with: "").replacingOccurrences(of: "{}", with: "")
                if novo == restante { break }
                restante = novo
            }
            #expect(parentesesValidos(texto) == restante.isEmpty)
        }
    }

    @Test func anagramaContraOrdenacaoDePontos() {
        var rng = Aleatorio()
        let alfabeto = Array("abAé😀 \u{301}".unicodeScalars)
        for _ in 0..<200 {
            let a = String(String.UnicodeScalarView((0..<rng.numero(12)).map { _ in alfabeto[rng.numero(alfabeto.count)] }))
            let b = String(String.UnicodeScalarView((0..<rng.numero(12)).map { _ in alfabeto[rng.numero(alfabeto.count)] }))
            let esperado = a.unicodeScalars.map(\.value).sorted() == b.unicodeScalars.map(\.value).sorted()
            #expect(anagramaValido(a, b) == esperado)
            #expect(anagramaValido(a, String(String.UnicodeScalarView(a.unicodeScalars.reversed()))))
        }
    }
}
