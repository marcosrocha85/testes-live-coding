package cicloemlistaligada_test

import (
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/ciclo_em_lista_ligada"
	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
	"github.com/marcosrocha85/testes-live-coding/src/go/lista"
)

type entrada struct {
	Valores     []int64 `json:"valores"`
	IndiceCiclo int     `json:"indiceCiclo"`
}

// O conjunto de visitados é uma referência independente de Floyd.
func referencia(cabeca *lista.No) bool {
	vistos := make(map[*lista.No]bool)
	for no := cabeca; no != nil; no = no.Proximo {
		if vistos[no] {
			return true
		}
		vistos[no] = true
	}
	return false
}

func conferir(t *testing.T, valores []int64, indice int, esperado bool) {
	t.Helper()
	cabeca, nos := testutil.Montar(valores)
	if indice >= 0 {
		nos[len(nos)-1].Proximo = nos[indice]
	}
	ligacoes := make([]*lista.No, len(nos))
	for i, no := range nos {
		ligacoes[i] = no.Proximo
	}
	for range 2 {
		if obtido := cicloemlistaligada.TemCiclo(cabeca); obtido != esperado || obtido != referencia(cabeca) {
			t.Fatalf("índice %d: obtido %v", indice, obtido)
		}
		for i, no := range nos {
			if no.Proximo != ligacoes[i] || no.Valor != valores[i] {
				t.Fatalf("nó %d modificado", i)
			}
		}
	}
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, bool](t, "ciclo_em_lista_ligada") {
		t.Run(c.Name, func(t *testing.T) {
			if c.Expected == nil {
				t.Fatal("resultado ausente")
			}
			conferir(t, c.Input.Valores, c.Input.IndiceCiclo, *c.Expected)
		})
	}
}

func TestTodasAsPosicoesEIdentidade(t *testing.T) {
	for tamanho := 0; tamanho <= 20; tamanho++ {
		valores := make([]int64, tamanho)
		for i := range valores {
			valores[i] = 1
		}
		for indice := -1; indice < tamanho; indice++ {
			conferir(t, valores, indice, indice >= 0)
		}
	}
	conferir(t, nil, -1, false)
}

func TestListasLongasESemMutacao(t *testing.T) {
	valores := make([]int64, 10000)
	for i := range valores {
		valores[i] = int64(i % 3)
	}
	for _, indice := range []int{-1, 0, 1, 5000, 9999} {
		conferir(t, valores, indice, indice >= 0)
	}
}
