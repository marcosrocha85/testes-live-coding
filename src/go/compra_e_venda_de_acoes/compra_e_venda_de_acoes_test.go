package compraevendadeacoes_test

import (
	"math/rand/v2"
	"slices"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/compra_e_venda_de_acoes"
	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
)

type entrada struct {
	Precos []int64 `json:"precos"`
}

func conferir(t *testing.T, precos []int64, esperado int64) {
	t.Helper()
	antes := slices.Clone(precos)
	if obtido := compraevendadeacoes.MaiorLucro(precos); obtido != esperado {
		t.Fatalf("%v: %d, esperado %d", precos, obtido, esperado)
	}
	if !slices.Equal(precos, antes) {
		t.Fatal("entrada modificada")
	}
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, int64](t, "compra_e_venda_de_acoes") {
		t.Run(c.Name, func(t *testing.T) {
			if c.Expected == nil {
				t.Fatal("resultado ausente")
			}
			conferir(t, c.Input.Precos, *c.Expected)
		})
	}
}

func TestReferenciaExaustiva(t *testing.T) {
	rng := rand.New(rand.NewPCG(100, 106))
	for range 2000 {
		precos := make([]int64, rng.IntN(40))
		for i := range precos {
			precos[i] = int64(rng.IntN(1000001))
		}
		var esperado int64
		for compra := range precos {
			for venda := compra + 1; venda < len(precos); venda++ {
				esperado = max(esperado, precos[venda]-precos[compra])
			}
		}
		conferir(t, precos, esperado)
	}
	conferir(t, nil, 0)
}

func TestListaLongaELimites(t *testing.T) {
	precos := make([]int64, 10000)
	for i := range precos {
		precos[i] = 1000000
	}
	precos[9998] = 0
	conferir(t, precos, 1000000)
	conferir(t, []int64{1000000, 0}, 0)
}
