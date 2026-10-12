package subirescadas_test

import (
	"errors"
	"math"
	"math/big"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
	"github.com/marcosrocha85/testes-live-coding/src/go/subir_escadas"
)

type entrada struct {
	Degraus float64 `json:"degraus"`
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, int64](t, "subir_escadas") {
		t.Run(c.Name, func(t *testing.T) {
			obtido, err := subirescadas.SubirEscadas(c.Input.Degraus)
			if c.Error != "" {
				if !errors.Is(err, subirescadas.ErrDegrausInvalidos) {
					t.Fatalf("erro de domínio esperado, obtido %v", err)
				}
			} else if c.Expected == nil || err != nil || obtido != *c.Expected {
				t.Fatalf("obtido %d, erro %v", obtido, err)
			}
		})
	}
}

func TestReferenciaCombinatoriaTodoODominio(t *testing.T) {
	for n := int64(0); n <= 77; n++ {
		// Com k passos duplos, há n-k posições; escolhemos k delas.
		esperado := new(big.Int)
		for k := int64(0); k <= n/2; k++ {
			esperado.Add(esperado, new(big.Int).Binomial(n-k, k))
		}
		obtido, err := subirescadas.SubirEscadas(float64(n))
		if !esperado.IsInt64() || err != nil || obtido != esperado.Int64() {
			t.Fatalf("n=%d: %d, esperado %s; %v", n, obtido, esperado, err)
		}
	}
	obtido, err := subirescadas.SubirEscadas(77)
	if err != nil || obtido != 8944394323791464 {
		t.Fatal("perdeu precisão no limite")
	}
}

func TestErrosIdiomaticos(t *testing.T) {
	for _, n := range []float64{-1, -0.5, 0.5, 1.5, 77.5, 78, math.NaN(), math.Inf(1), math.Inf(-1), math.MaxFloat64} {
		valor, err := subirescadas.SubirEscadas(n)
		if valor != 0 || !errors.Is(err, subirescadas.ErrDegrausInvalidos) {
			t.Fatalf("aceitou %v: %d/%v", n, valor, err)
		}
	}
}
