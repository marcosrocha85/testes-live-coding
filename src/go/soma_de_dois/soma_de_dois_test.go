package somadedois_test

import (
	"math/rand/v2"
	"slices"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
	"github.com/marcosrocha85/testes-live-coding/src/go/soma_de_dois"
)

type entrada struct {
	Numeros []int64 `json:"numeros"`
	Alvo    int64   `json:"alvo"`
}

func conferir(t *testing.T, numeros []int64, alvo int64, esperado [2]int, existe bool) {
	t.Helper()
	antes := slices.Clone(numeros)
	par, ok := somadedois.SomaDeDois(numeros, alvo)
	if ok != existe || (ok && par != esperado) {
		t.Fatalf("%v, alvo %d: %v/%v; esperado %v/%v", numeros, alvo, par, ok, esperado, existe)
	}
	if !slices.Equal(numeros, antes) {
		t.Fatal("entrada modificada")
	}
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, [2]int](t, "soma_de_dois") {
		t.Run(c.Name, func(t *testing.T) {
			var esperado [2]int
			if c.Expected != nil {
				esperado = *c.Expected
			}
			conferir(t, c.Input.Numeros, c.Input.Alvo, esperado, c.Expected != nil)
		})
	}
}

// Os laços enumeram pares pela ordem do contrato, sem mapa de complementos.
func referencia(numeros []int64, alvo int64) ([2]int, bool) {
	for j := 1; j < len(numeros); j++ {
		for i := 0; i < j; i++ {
			if numeros[i]+numeros[j] == alvo {
				return [2]int{i, j}, true
			}
		}
	}
	return [2]int{}, false
}

func TestReferenciaEDuplicatas(t *testing.T) {
	rng := rand.New(rand.NewPCG(100, 101))
	for range 2000 {
		numeros := make([]int64, rng.IntN(30))
		for i := range numeros {
			numeros[i] = int64(rng.IntN(21) - 10)
		}
		alvo := int64(rng.IntN(31) - 15)
		par, ok := referencia(numeros, alvo)
		conferir(t, numeros, alvo, par, ok)
	}
	conferir(t, nil, 0, [2]int{}, false)
}

func TestListaLongaELimites(t *testing.T) {
	numeros := make([]int64, 10000)
	for i := range numeros {
		numeros[i] = 1000000
	}
	numeros[9999] = -1000000
	conferir(t, numeros, 0, [2]int{0, 9999}, true)
}
