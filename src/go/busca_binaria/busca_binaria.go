// Package buscabinaria procura em números já ordenados.
package buscabinaria

// BuscaBinaria devolve um índice do alvo ou -1, sem ordenar ou alterar numeros.
func BuscaBinaria(numeros []int64, alvo int64) int {
	esquerda, direita := 0, len(numeros)
	// O intervalo [esquerda, direita) exclui direita e também admite vazio.
	for esquerda < direita {
		meio := esquerda + (direita-esquerda)/2
		switch {
		case numeros[meio] == alvo:
			return meio
		case numeros[meio] < alvo:
			esquerda = meio + 1
		default:
			direita = meio
		}
	}
	return -1
}
