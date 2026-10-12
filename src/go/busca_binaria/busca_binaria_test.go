package buscabinaria_test

import (
	"math/rand/v2"
	"slices"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/busca_binaria"
	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
)

type entrada struct {
	Numeros []int64 `json:"numeros"`
	Alvo    int64   `json:"alvo"`
}

func conferir(t *testing.T, numeros []int64, alvo int64, indices []int) {
	t.Helper()
	antes := slices.Clone(numeros)
	obtido := buscabinaria.BuscaBinaria(numeros, alvo)
	if !slices.Contains(indices, obtido) {
		t.Fatalf("%v, alvo %d: índice %d fora de %v", numeros, alvo, obtido, indices)
	}
	if !slices.Equal(numeros, antes) {
		t.Fatal("entrada modificada")
	}
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, int](t, "busca_binaria") {
		t.Run(c.Name, func(t *testing.T) {
			indices := c.ExpectedIndices
			if c.Expected != nil {
				indices = []int{*c.Expected}
			}
			conferir(t, c.Input.Numeros, c.Input.Alvo, indices)
		})
	}
}

func TestReferenciaLinearEDuplicatas(t *testing.T) {
	rng := rand.New(rand.NewPCG(100, 104))
	for range 1000 {
		numeros := make([]int64, rng.IntN(100))
		for i := range numeros {
			numeros[i] = int64(rng.IntN(21) - 10)
		}
		slices.Sort(numeros)
		for alvo := int64(-12); alvo <= 12; alvo++ {
			var indices []int
			for i, valor := range numeros {
				if valor == alvo {
					indices = append(indices, i)
				}
			}
			if len(indices) == 0 {
				indices = []int{-1}
			}
			conferir(t, numeros, alvo, indices)
		}
	}
	conferir(t, nil, 0, []int{-1})
}

func TestListaLongaELimites(t *testing.T) {
	numeros := make([]int64, 10000)
	for i := range numeros {
		numeros[i] = int64(i) - 5000
	}
	for _, i := range []int{0, 1, 4999, 5000, 9998, 9999} {
		conferir(t, numeros, numeros[i], []int{i})
	}
	conferir(t, []int64{-1000000, 1000000}, 1000000, []int{1})
}
