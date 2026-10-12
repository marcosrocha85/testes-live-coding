// Package mesclarlistasordenadas religa duas listas ordenadas e independentes.
package mesclarlistasordenadas

import "github.com/marcosrocha85/testes-live-coding/src/go/lista"

func MesclarListasOrdenadas(primeira, segunda *lista.No) *lista.No {
	var sentinela lista.No
	cauda := &sentinela
	for primeira != nil && segunda != nil {
		if primeira.Valor <= segunda.Valor { // Empate favorece a primeira lista.
			cauda.Proximo = primeira
			primeira = primeira.Proximo
		} else {
			cauda.Proximo = segunda
			segunda = segunda.Proximo
		}
		cauda = cauda.Proximo
	}
	cauda.Proximo = primeira
	if primeira == nil {
		cauda.Proximo = segunda
	}
	return sentinela.Proximo // O sentinela não faz parte do resultado.
}
