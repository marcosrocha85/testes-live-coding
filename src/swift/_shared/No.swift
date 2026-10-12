// Classe: atribuir a outra variável conserva a identidade do nó.
public final class No {
    public let valor: Int
    public var proximo: No?

    public init(_ valor: Int, _ proximo: No? = nil) {
        self.valor = valor
        self.proximo = proximo
    }
}
