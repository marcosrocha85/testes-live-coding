package inverterlistaligada_test

import (
	"slices"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
	"github.com/marcosrocha85/testes-live-coding/src/go/inverter_lista_ligada"
)

type entrada struct {
	Valores []int64 `json:"valores"`
}

func conferir(t *testing.T, valores, esperados []int64) {
	t.Helper()
	cabeca, nos := testutil.Montar(valores)
	ordem := slices.Clone(nos)
	slices.Reverse(ordem)
	resultado := inverterlistaligada.InverterListaLigada(cabeca)
	testutil.ConferirNos(t, resultado, ordem)
	for i, no := range ordem {
		if no.Valor != esperados[i] {
			t.Fatalf("valor %d foi alterado", i)
		}
	}
	// Inverter novamente deve restaurar todos os ponteiros originais.
	testutil.ConferirNos(t, inverterlistaligada.InverterListaLigada(resultado), nos)
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, []int64](t, "inverter_lista_ligada") {
		t.Run(c.Name, func(t *testing.T) {
			if c.Expected == nil {
				t.Fatal("resultado ausente")
			}
			conferir(t, c.Input.Valores, *c.Expected)
		})
	}
}

func TestIdentidadeDuplicatasEListaLonga(t *testing.T) {
	for _, tamanho := range []int{0, 1, 2, 20, 10000} {
		valores := make([]int64, tamanho)
		for i := range valores {
			valores[i] = int64(i%5) - 2
		}
		esperados := slices.Clone(valores)
		slices.Reverse(esperados)
		conferir(t, valores, esperados)
	}
	conferir(t, nil, nil)
}
