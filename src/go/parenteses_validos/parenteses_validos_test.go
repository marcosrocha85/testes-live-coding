package parentesesvalidos_test

import (
	"strings"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
	"github.com/marcosrocha85/testes-live-coding/src/go/parenteses_validos"
)

type entrada struct {
	Texto string `json:"texto"`
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, bool](t, "parenteses_validos") {
		t.Run(c.Name, func(t *testing.T) {
			if c.Expected == nil {
				t.Fatal("resultado ausente")
			}
			if obtido := parentesesvalidos.ParentesesValidos(c.Input.Texto); obtido != *c.Expected {
				t.Fatalf("obtido %v", obtido)
			}
		})
	}
}

// Remover pares adjacentes reduz expressões válidas sem usar uma pilha.
func referencia(texto string) bool {
	for {
		antes := texto
		for _, par := range []string{"()", "[]", "{}"} {
			texto = strings.ReplaceAll(texto, par, "")
		}
		if antes == texto {
			return texto == ""
		}
	}
}

func TestReferenciaExaustiva(t *testing.T) {
	var explorar func(string, int)
	explorar = func(texto string, restantes int) {
		if obtido := parentesesvalidos.ParentesesValidos(texto); obtido != referencia(texto) {
			t.Fatalf("divergência em %q", texto)
		}
		if restantes > 0 {
			for _, simbolo := range "()[]{}a😀" {
				explorar(texto+string(simbolo), restantes-1)
			}
		}
	}
	explorar("", 5)
}

func TestAninhamentoLongoEUnicode(t *testing.T) {
	texto := strings.Repeat("(", 5000) + strings.Repeat(")", 5000)
	if !parentesesvalidos.ParentesesValidos(texto) {
		t.Fatal("aninhamento válido")
	}
	for _, invalido := range []string{texto + ")", "(😀)", "(é)", "( )", "\x00", "（ ）"} {
		if parentesesvalidos.ParentesesValidos(invalido) {
			t.Fatalf("aceitou %q", invalido)
		}
	}
}
