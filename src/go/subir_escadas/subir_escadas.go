// Package subirescadas conta sequências de passos de um ou dois degraus.
package subirescadas

import (
	"errors"
	"math"
)

var ErrDegrausInvalidos = errors.New("degraus deve ser um inteiro de 0 a 77")

// SubirEscadas usa float64 apenas na entrada, para poder rejeitar frações.
func SubirEscadas(degraus float64) (int64, error) {
	if math.IsNaN(degraus) || math.IsInf(degraus, 0) ||
		degraus < 0 || degraus > 77 || math.Trunc(degraus) != degraus {
		return 0, ErrDegrausInvalidos
	}
	// As contagens são inteiras; zero tem uma sequência vazia.
	anterior, atual := int64(1), int64(1)
	for passo := 2; passo <= int(degraus); passo++ {
		anterior, atual = atual, anterior+atual
	}
	return atual, nil
}
