// Gerado por npm run docs. Consulte os READMEs dos desafios.
package main

import (
	"fmt"
	"os"

	"github.com/marcosrocha85/testes-live-coding/src/go/anagrama_valido"
	"github.com/marcosrocha85/testes-live-coding/src/go/busca_binaria"
	"github.com/marcosrocha85/testes-live-coding/src/go/ciclo_em_lista_ligada"
	"github.com/marcosrocha85/testes-live-coding/src/go/compra_e_venda_de_acoes"
	"github.com/marcosrocha85/testes-live-coding/src/go/inverter_lista_ligada"
	"github.com/marcosrocha85/testes-live-coding/src/go/lista"
	"github.com/marcosrocha85/testes-live-coding/src/go/mesclar_listas_ordenadas"
	"github.com/marcosrocha85/testes-live-coding/src/go/parenteses_validos"
	"github.com/marcosrocha85/testes-live-coding/src/go/soma_de_dois"
	"github.com/marcosrocha85/testes-live-coding/src/go/subarray_maximo"
	"github.com/marcosrocha85/testes-live-coding/src/go/subir_escadas"
)

func exigir(condicao bool) {
	if !condicao {
		panic("resultado inesperado no exemplo")
	}
}

func main() {
	id := "soma_de_dois"
	if len(os.Args) > 1 {
		id = os.Args[1]
	}
	fmt.Print(id + ": ")
	switch id {
	case "soma_de_dois":
		par, ok := somadedois.SomaDeDois([]int64{2, 7, 11, 15}, 9)
		exigir(ok && par == [2]int{0, 1})
		fmt.Println(par) // [0 1]
	case "parenteses_validos":
		resultado := parentesesvalidos.ParentesesValidos("{[()]}")
		exigir(resultado)
		fmt.Println(resultado) // true
	case "inverter_lista_ligada":
		terceiro := &lista.No{Valor: 3}
		segundo := &lista.No{Valor: 2, Proximo: terceiro}
		primeiro := &lista.No{Valor: 1, Proximo: segundo}
		resultado := inverterlistaligada.InverterListaLigada(primeiro)
		exigir(resultado == terceiro && terceiro.Proximo == segundo && primeiro.Proximo == nil)
		fmt.Println(resultado.Valor) // 3; ligações: 3 → 2 → 1 → nil
	case "busca_binaria":
		indice := buscabinaria.BuscaBinaria([]int64{1, 3, 5, 7, 9}, 7)
		exigir(indice == 3)
		fmt.Println(indice) // 3
	case "mesclar_listas_ordenadas":
		tres, quatro := &lista.No{Valor: 3}, &lista.No{Valor: 4}
		um := &lista.No{Valor: 1, Proximo: tres}
		dois := &lista.No{Valor: 2, Proximo: quatro}
		resultado := mesclarlistasordenadas.MesclarListasOrdenadas(um, dois)
		exigir(resultado == um && um.Proximo == dois && dois.Proximo == tres && tres.Proximo == quatro)
		fmt.Println(resultado.Valor) // 1; ligações: 1 → 2 → 3 → 4 → nil
	case "compra_e_venda_de_acoes":
		lucro := compraevendadeacoes.MaiorLucro([]int64{7, 1, 5, 3, 6, 4})
		exigir(lucro == 5)
		fmt.Println(lucro) // 5
	case "subarray_maximo":
		soma, ok := subarraymaximo.SubarrayMaximo([]int64{-2, 1, -3, 4, -1, 2, 1, -5, 4})
		exigir(ok && soma == 6)
		fmt.Println(soma) // 6
	case "subir_escadas":
		formas, err := subirescadas.SubirEscadas(5)
		exigir(err == nil && formas == 8)
		fmt.Println(formas) // 8
	case "anagrama_valido":
		resultado := anagramavalido.AnagramaValido("😀a😀", "😀😀a")
		exigir(resultado)
		fmt.Println(resultado) // true
	case "ciclo_em_lista_ligada":
		primeiro := &lista.No{Valor: 1}
		segundo := &lista.No{Valor: 2, Proximo: primeiro}
		primeiro.Proximo = segundo
		resultado := cicloemlistaligada.TemCiclo(primeiro)
		exigir(resultado && primeiro.Proximo == segundo && segundo.Proximo == primeiro)
		fmt.Println(resultado) // true
	default:
		fmt.Fprintln(os.Stderr, "ID de desafio inválido")
		os.Exit(2)
	}
}
