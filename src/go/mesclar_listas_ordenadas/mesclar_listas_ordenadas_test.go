package mesclarlistasordenadas_test

import (
	"cmp"
	"math/rand/v2"
	"slices"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
	"github.com/marcosrocha85/testes-live-coding/src/go/lista"
	"github.com/marcosrocha85/testes-live-coding/src/go/mesclar_listas_ordenadas"
)

type entrada struct {
	Primeira []int64 `json:"primeira"`
	Segunda  []int64 `json:"segunda"`
}

func conferir(t *testing.T, a, b, valores []int64) {
	t.Helper()
	primeira, nosA := testutil.Montar(a)
	segunda, nosB := testutil.Montar(b)
	// Ordenação estável independente: todos os nós de A precedem B no empate.
	ordem := append(slices.Clone(nosA), nosB...)
	slices.SortStableFunc(ordem, func(a, b *lista.No) int { return cmp.Compare(a.Valor, b.Valor) })
	resultado := mesclarlistasordenadas.MesclarListasOrdenadas(primeira, segunda)
	testutil.ConferirNos(t, resultado, ordem)
	for i, no := range nosA {
		if no.Valor != a[i] {
			t.Fatal("valor de A alterado")
		}
	}
	for i, no := range nosB {
		if no.Valor != b[i] {
			t.Fatal("valor de B alterado")
		}
	}
	if valores != nil {
		for i, no := range ordem {
			if no.Valor != valores[i] {
				t.Fatalf("valor %d difere do caso compartilhado", i)
			}
		}
	}
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, []int64](t, "mesclar_listas_ordenadas") {
		t.Run(c.Name, func(t *testing.T) {
			if c.Expected == nil {
				t.Fatal("resultado ausente")
			}
			conferir(t, c.Input.Primeira, c.Input.Segunda, *c.Expected)
		})
	}
}

func TestReferenciaEstavelEMutacao(t *testing.T) {
	rng := rand.New(rand.NewPCG(100, 105))
	for range 1000 {
		a, b := make([]int64, rng.IntN(40)), make([]int64, rng.IntN(40))
		for i := range a {
			a[i] = int64(rng.IntN(7) - 3)
		}
		for i := range b {
			b[i] = int64(rng.IntN(7) - 3)
		}
		slices.Sort(a)
		slices.Sort(b)
		conferir(t, a, b, nil)
	}
	conferir(t, []int64{1, 1, 1}, []int64{1, 1, 1}, nil)
	conferir(t, nil, nil, nil)
}

func TestListasLongas(t *testing.T) {
	a, b := make([]int64, 5000), make([]int64, 5000)
	for i := range a {
		a[i] = int64(i)
		b[i] = int64(i)
	}
	conferir(t, a, b, nil)
	conferir(t, a, nil, nil)
	conferir(t, nil, b, nil)
}
