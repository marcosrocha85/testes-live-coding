// Package somadedois encontra o primeiro par que soma o alvo.
package somadedois

// SomaDeDois devolve dois índices distintos e ok, sem modificar numeros.
func SomaDeDois(numeros []int64, alvo int64) (par [2]int, ok bool) {
	vistos := make(map[int64]int)
	for atual, valor := range numeros {
		// Consultar antes de inserir impede usar a mesma posição duas vezes.
		if anterior, existe := vistos[alvo-valor]; existe {
			return [2]int{anterior, atual}, true
		}
		if _, existe := vistos[valor]; !existe {
			vistos[valor] = atual // Conserva o primeiro índice de cada valor.
		}
	}
	return [2]int{}, false
}
