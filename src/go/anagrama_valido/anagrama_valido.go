// Package anagramavalido compara pontos Unicode de strings UTF-8 bem formadas.
package anagramavalido

func AnagramaValido(primeiro, segundo string) bool {
	contagens := make(map[rune]int64)
	// range lê runes completas, sem normalizar ou agrupar grafemas.
	for _, ponto := range primeiro {
		contagens[ponto]++
	}
	for _, ponto := range segundo {
		quantidade := contagens[ponto]
		if quantidade == 0 {
			return false
		}
		if quantidade == 1 {
			delete(contagens, ponto)
		} else {
			contagens[ponto]--
		}
	}
	return len(contagens) == 0
}
