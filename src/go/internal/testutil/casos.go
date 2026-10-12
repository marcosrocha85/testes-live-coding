// Package testutil prepara entradas e lê os casos canônicos somente nos testes.
package testutil

import (
	"bytes"
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"testing"

	"github.com/marcosrocha85/testes-live-coding/src/go/lista"
)

type Caso[I, E any] struct {
	Name            string `json:"name"`
	Input           I      `json:"input"`
	Expected        *E     `json:"expected"`
	ExpectedIndices []int  `json:"expectedIndices"`
	Error           string `json:"error"`
}

func LerCasos[I, E any](t *testing.T, id string) []Caso[I, E] {
	t.Helper()
	_, arquivo, _, ok := runtime.Caller(0)
	if !ok {
		t.Fatal("não foi possível localizar os casos")
	}
	caminho := filepath.Join(filepath.Dir(arquivo), "../../../..", "docs/casos", id+".json")
	dados, err := os.ReadFile(caminho)
	if err != nil {
		t.Fatal(err)
	}
	var casos []Caso[I, E]
	decoder := json.NewDecoder(bytes.NewReader(dados))
	decoder.DisallowUnknownFields()
	if err := decoder.Decode(&casos); err != nil {
		t.Fatal(err)
	}
	if len(casos) == 0 {
		t.Fatal("arquivo de casos vazio")
	}
	return casos
}

// Montar cria nós distintos, inclusive quando os valores se repetem.
func Montar(valores []int64) (*lista.No, []*lista.No) {
	nos := make([]*lista.No, len(valores))
	for i, valor := range valores {
		nos[i] = &lista.No{Valor: valor}
		if i > 0 {
			nos[i-1].Proximo = nos[i]
		}
	}
	if len(nos) == 0 {
		return nil, nos
	}
	return nos[0], nos
}

// ConferirNos limita a travessia para falhar também diante de ciclos inesperados.
func ConferirNos(t *testing.T, cabeca *lista.No, esperados []*lista.No) {
	t.Helper()
	atual := cabeca
	for i, esperado := range esperados {
		if atual != esperado {
			t.Fatalf("nó %d: ponteiro %p, esperado %p", i, atual, esperado)
		}
		atual = atual.Proximo
	}
	if atual != nil {
		t.Fatal("sobrou nó ou ciclo na saída")
	}
}
