package livecoding._shared

// Cada objeto é um nó real. A referência proximo pode ser alterada ou terminar em null.
// Uma classe comum evita igualdade estrutural recursiva em listas com ciclos.
class No(val valor: Int, var proximo: No? = null)
