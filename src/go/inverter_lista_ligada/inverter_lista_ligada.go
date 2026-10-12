// Package inverterlistaligada inverte as ligações de uma lista sem ciclo.
package inverterlistaligada

import "github.com/marcosrocha85/testes-live-coding/src/go/lista"

// InverterListaLigada reutiliza todos os nós e devolve a nova cabeça.
func InverterListaLigada(cabeca *lista.No) *lista.No {
	var anterior *lista.No
	for atual := cabeca; atual != nil; {
		seguinte := atual.Proximo // Salva o restante antes de mudar a ligação.
		atual.Proximo = anterior
		anterior = atual
		atual = seguinte
	}
	return anterior
}
