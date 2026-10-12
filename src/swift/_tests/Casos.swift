import Foundation
import Testing

struct Caso<Entrada: Decodable & Sendable, Saida: Decodable & Sendable>: Decodable, Sendable, CustomTestStringConvertible {
    let name: String
    let input: Entrada
    let expected: Saida?
    let expectedIndices: [Int]?
    let error: String?
    var testDescription: String { name }
}

func casos<E: Decodable & Sendable, S: Decodable & Sendable>(
    _ desafio: String, entrada: E.Type, saida: S.Type
) -> [Caso<E, S>] {
    // Partir do arquivo de testes permite executar de qualquer diretório.
    let raiz = URL(fileURLWithPath: #filePath)
        .deletingLastPathComponent().deletingLastPathComponent()
        .deletingLastPathComponent().deletingLastPathComponent()
    let arquivo = raiz.appendingPathComponent("docs/casos/" + desafio + ".json")
    do {
        let dados = try Data(contentsOf: arquivo)
        let resultado = try JSONDecoder().decode([Caso<E, S>].self, from: dados)
        precondition(!resultado.isEmpty, "Nenhum caso carregado: " + desafio)
        return resultado
    } catch {
        fatalError("Falha nos casos canônicos de " + desafio + ": " + String(describing: error))
    }
}

struct EntradaNumeros: Decodable, Sendable { let numeros: [Int]; let alvo: Int }
struct EntradaTexto: Decodable, Sendable { let texto: String }
struct EntradaLista: Decodable, Sendable { let valores: [Int] }
struct EntradaListas: Decodable, Sendable { let primeira: [Int]; let segunda: [Int] }
struct EntradaPrecos: Decodable, Sendable { let precos: [Int] }
struct EntradaSubarray: Decodable, Sendable { let numeros: [Int] }
struct EntradaEscadas: Decodable, Sendable { let degraus: Double }
struct EntradaAnagrama: Decodable, Sendable { let primeiro: String; let segundo: String }
struct EntradaCiclo: Decodable, Sendable { let valores: [Int]; let indiceCiclo: Int }
