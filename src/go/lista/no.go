// Package lista define o nó compartilhado pelos três desafios de listas.
package lista

// No mantém um valor e a ligação para o próximo nó; nil indica o fim.
type No struct {
	Valor   int64
	Proximo *No
}
