// Package cicloemlistaligada detecta ciclos sem modificar a lista.
package cicloemlistaligada

import "github.com/marcosrocha85/testes-live-coding/src/go/lista"

func TemCiclo(cabeca *lista.No) bool {
	lento, rapido := cabeca, cabeca
	for rapido != nil && rapido.Proximo != nil {
		lento = lento.Proximo
		rapido = rapido.Proximo.Proximo
		if lento == rapido { // Compara endereços, não valores dos nós.
			return true
		}
	}
	return false
}
