package anagramavalido_test

import (
	"math/rand/v2"
	"slices"
	"strings"
	"testing"
	"unicode"

	"github.com/marcosrocha85/testes-live-coding/src/go/anagrama_valido"
	"github.com/marcosrocha85/testes-live-coding/src/go/internal/testutil"
)

type entrada struct {
	Primeiro string `json:"primeiro"`
	Segundo  string `json:"segundo"`
}

func TestCasosCompartilhados(t *testing.T) {
	for _, c := range testutil.LerCasos[entrada, bool](t, "anagrama_valido") {
		t.Run(c.Name, func(t *testing.T) {
			if c.Expected == nil {
				t.Fatal("resultado ausente")
			}
			if obtido := anagramavalido.AnagramaValido(c.Input.Primeiro, c.Input.Segundo); obtido != *c.Expected {
				t.Fatalf("obtido %v", obtido)
			}
		})
	}
}

func referencia(a, b string) bool {
	primeiro, segundo := []rune(a), []rune(b)
	slices.Sort(primeiro)
	slices.Sort(segundo)
	return slices.Equal(primeiro, segundo)
}

func TestReferenciaPorOrdenacao(t *testing.T) {
	rng := rand.New(rand.NewPCG(100, 109))
	alfabeto := []rune("aaA ée\u0301😀🚀漢\x00")
	for range 2000 {
		a, b := make([]rune, rng.IntN(40)), make([]rune, rng.IntN(40))
		for i := range a {
			a[i] = alfabeto[rng.IntN(len(alfabeto))]
		}
		for i := range b {
			b[i] = alfabeto[rng.IntN(len(alfabeto))]
		}
		if obtido := anagramavalido.AnagramaValido(string(a), string(b)); obtido != referencia(string(a), string(b)) {
			t.Fatalf("divergência: %q/%q", a, b)
		}
		original := string(a)
		rng.Shuffle(len(a), func(i, j int) { a[i], a[j] = a[j], a[i] })
		if !anagramavalido.AnagramaValido(original, string(a)) {
			t.Fatal("não reconhece os mesmos pontos")
		}
		if anagramavalido.AnagramaValido(original, string(a)+"🚀") {
			t.Fatal("ignorou um ponto adicional")
		}
	}
}

func TestPontosUnicodeESemContagemDeBytes(t *testing.T) {
	for _, par := range [][2]string{{"é", "e\u0301"}, {"A", "a"}, {"a b", "ab"}, {"é¨", "è©"}, {"\uFFFD", "😀"}} {
		if anagramavalido.AnagramaValido(par[0], par[1]) {
			t.Fatalf("igualou %q e %q", par[0], par[1])
		}
	}
	var pontos []rune
	for r := rune(0); r <= unicode.MaxRune; r++ {
		if r < 0xD800 || r > 0xDFFF {
			pontos = append(pontos, r)
		}
	}
	original := string(pontos)
	slices.Reverse(pontos)
	if !anagramavalido.AnagramaValido(original, string(pontos)) {
		t.Fatal("perdeu pontos escalares Unicode")
	}
	if !anagramavalido.AnagramaValido(strings.Repeat("😀a", 5000), strings.Repeat("a😀", 5000)) {
		t.Fatal("multiplicidade longa")
	}
}
