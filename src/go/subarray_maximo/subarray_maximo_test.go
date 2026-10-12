package subarraymaximo_test

import (
	"math/rand/v2"
	"slices"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
	"github.com/marcosrocha85/testes-live-coding/src/go/subarray_maximo"
)

type entrada struct {
	Numeros []int64 `json:"numeros"`
}

func conferir(t *testing.T, numeros []int64, esperado int64, existe bool) {
	t.Helper()
	antes := slices.Clone(numeros)
	soma, ok := subarraymaximo.SubarrayMaximo(numeros)
	if ok != existe || (ok && soma != esperado) {
		t.Fatalf("%v: %d/%v, esperado %d/%v", numeros, soma, ok, esperado, existe)
	}
	if !slices.Equal(numeros, antes) {
		t.Fatal("entrada modificada")
	}
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, int64](t, "subarray_maximo") {
		t.Run(c.Name, func(t *testing.T) {
			var esperado int64
			if c.Expected != nil {
				esperado = *c.Expected
			}
			conferir(t, c.Input.Numeros, esperado, c.Expected != nil)
		})
	}
}

func TestReferenciaDeTodosOsTrechos(t *testing.T) {
	rng := rand.New(rand.NewPCG(100, 107))
	for range 2000 {
		numeros := make([]int64, rng.IntN(40))
		for i := range numeros {
			numeros[i] = int64(rng.IntN(2000001) - 1000000)
		}
		var melhor int64
		if len(numeros) > 0 {
			melhor = numeros[0]
			for inicio := range numeros {
				for fim := inicio + 1; fim <= len(numeros); fim++ {
					var soma int64
					for _, valor := range numeros[inicio:fim] {
						soma += valor
					}
					melhor = max(melhor, soma)
				}
			}
		}
		conferir(t, numeros, melhor, len(numeros) > 0)
	}
	conferir(t, nil, 0, false)
	conferir(t, []int64{0}, 0, true)
	conferir(t, []int64{-2, -1}, -1, true)
}

func TestPrecisaoInt64(t *testing.T) {
	numeros := make([]int64, 10000)
	for i := range numeros {
		numeros[i] = 1000000
	}
	conferir(t, numeros, 10000000000, true)
	for i := range numeros {
		numeros[i] = -1000000
	}
	conferir(t, numeros, -1000000, true)
}
