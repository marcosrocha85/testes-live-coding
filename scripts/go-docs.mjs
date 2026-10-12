// Fonte única das notas e dos trechos compilados pelo executável de exemplos.
export const notasGo = {
  soma_de_dois: '`[]int64` é um slice: descreve um trecho de um array, sem copiar seus elementos. A função somente lê esse trecho. `map[int64]int` associa valores a índices; a consulta com `existe` distingue índice zero de ausência. O retorno `([2]int, bool)` contém o par e `ok`: consulte o par somente se ok for true. Em empate, o primeiro índice de cada valor é preservado.',
  parenteses_validos: '`range` lê pontos Unicode, mas o contrato aceita somente os seis símbolos ASCII. Qualquer outro ponto é rejeitado. `[]rune` forma a pilha; `append` acrescenta uma abertura e `pilha[:len(pilha)-1]` retira a última. A consulta ao topo só ocorre após verificar o tamanho. A string vazia retorna true.',
  inverter_lista_ligada: '`*lista.No` guarda o endereço de um nó real; `nil` indica o fim ou uma lista vazia. Atribuir um ponteiro não copia o nó. `seguinte` salva a ligação antes da mutação. A função altera Proximo e devolve a nova cabeça, reutilizando todos os nós. O coletor de lixo administra a memória; não há liberação manual nem recursão.',
  busca_binaria: '`int` é adequado para índices de slices, cujo tamanho também é int. Os valores usam int64. O intervalo [esquerda, direita) exclui direita e admite uma entrada vazia sem acessar o slice. A função não ordena nem modifica numeros. Retorna -1 se o alvo não existe; em duplicatas, qualquer índice correspondente serve.',
  mesclar_listas_ordenadas: '`var sentinela lista.No` cria um nó auxiliar fora do resultado. As ligações usam ponteiros para reutilizar os nós das entradas. `<=` mantém a preferência pela primeira lista em empate. As listas precisam estar ordenadas, sem ciclos e sem nós compartilhados. A saída muda as ligações originais; guarde a cabeça devolvida.',
  compra_e_venda_de_acoes: '`int64` preserva exatamente os preços e as diferenças do contrato, inclusive em plataformas de 32 bits. `precos[1:]` é uma vista dos dias após o primeiro. Calcular o lucro antes de atualizar o menor preço preserva a cronologia. `max` e `min` são funções da linguagem. Entradas vazias ou sem ganho retornam zero.',
  subarray_maximo: '`(int64, bool)` distingue uma soma presente de uma entrada vazia. Zero e valores negativos são respostas válidas com ok=true; ok=false equivale ao null do contrato. Iniciar no primeiro elemento evita escolher um trecho vazio quando todos são negativos. Dez mil valores de um milhão somam dez bilhões: não use int para esse acumulador.',
  subir_escadas: '`float64` aparece somente na entrada, para permitir rejeitar as frações dos casos compartilhados. A validação elimina NaN, infinitos e valores fora de 0 a 77 antes da conversão para int. As contagens e a saída usam int64, sem arredondamento. `(int64, error)` é o retorno idiomático: err=nil significa sucesso; `errors.Is(err, ErrDegrausInvalidos)` identifica o erro equivalente a RangeError. Para zero, há uma sequência vazia.',
  anagrama_valido: 'Strings contêm bytes UTF-8; len(texto) conta bytes. `range` decodifica cada ponto completo em uma rune, cujo tipo é int32. `map[rune]int64` conta esses pontos sem normalização, equivalência de grafemas ou remoção de espaços. O contrato pressupõe UTF-8 bem formado; em bytes inválidos, range produziria U+FFFD. Ambas vazias retornam true. O mapa ocupa espaço proporcional aos pontos distintos da primeira string.',
  ciclo_em_lista_ligada: '`lento == rapido` compara endereços, não valores. Verificar rapido e rapido.Proximo antes de avançar evita acessar nil. Floyd apenas lê os campos: as ligações e valores ficam intactos. Valores repetidos não indicam ciclo. O coletor de lixo Go pode recolher ciclos que deixam de ser alcançáveis, sem precisar desfazer suas ligações.'
};

export const exemplosGo = {
  soma_de_dois: `par, ok := somadedois.SomaDeDois([]int64{2, 7, 11, 15}, 9)
exigir(ok && par == [2]int{0, 1})
fmt.Println(par) // [0 1]`,
  parenteses_validos: `resultado := parentesesvalidos.ParentesesValidos("{[()]}")
exigir(resultado)
fmt.Println(resultado) // true`,
  inverter_lista_ligada: `terceiro := &lista.No{Valor: 3}
segundo := &lista.No{Valor: 2, Proximo: terceiro}
primeiro := &lista.No{Valor: 1, Proximo: segundo}
resultado := inverterlistaligada.InverterListaLigada(primeiro)
exigir(resultado == terceiro && terceiro.Proximo == segundo && primeiro.Proximo == nil)
fmt.Println(resultado.Valor) // 3; ligações: 3 → 2 → 1 → nil`,
  busca_binaria: `indice := buscabinaria.BuscaBinaria([]int64{1, 3, 5, 7, 9}, 7)
exigir(indice == 3)
fmt.Println(indice) // 3`,
  mesclar_listas_ordenadas: `tres, quatro := &lista.No{Valor: 3}, &lista.No{Valor: 4}
um := &lista.No{Valor: 1, Proximo: tres}
dois := &lista.No{Valor: 2, Proximo: quatro}
resultado := mesclarlistasordenadas.MesclarListasOrdenadas(um, dois)
exigir(resultado == um && um.Proximo == dois && dois.Proximo == tres && tres.Proximo == quatro)
fmt.Println(resultado.Valor) // 1; ligações: 1 → 2 → 3 → 4 → nil`,
  compra_e_venda_de_acoes: `lucro := compraevendadeacoes.MaiorLucro([]int64{7, 1, 5, 3, 6, 4})
exigir(lucro == 5)
fmt.Println(lucro) // 5`,
  subarray_maximo: `soma, ok := subarraymaximo.SubarrayMaximo([]int64{-2, 1, -3, 4, -1, 2, 1, -5, 4})
exigir(ok && soma == 6)
fmt.Println(soma) // 6`,
  subir_escadas: `formas, err := subirescadas.SubirEscadas(5)
exigir(err == nil && formas == 8)
fmt.Println(formas) // 8`,
  anagrama_valido: `resultado := anagramavalido.AnagramaValido("😀a😀", "😀😀a")
exigir(resultado)
fmt.Println(resultado) // true`,
  ciclo_em_lista_ligada: `primeiro := &lista.No{Valor: 1}
segundo := &lista.No{Valor: 2, Proximo: primeiro}
primeiro.Proximo = segundo
resultado := cicloemlistaligada.TemCiclo(primeiro)
exigir(resultado && primeiro.Proximo == segundo && segundo.Proximo == primeiro)
fmt.Println(resultado) // true`
};

const modulo = 'github.com/marcosrocha85/testes-live-coding/src/go';
export function programaGo(exercicios) {
  const imports = [...exercicios.map(({ id }) => id), 'lista'].sort().map(id => `\t"${modulo}/${id}"`).join('\n');
  const blocos = exercicios.map(({ id }) => `\tcase "${id}":\n${exemplosGo[id].split('\n').map(linha => '\t\t' + linha).join('\n')}`).join('\n');
  return `// Gerado por npm run docs. Consulte os READMEs dos desafios.
package main

import (
\t"fmt"
\t"os"

${imports}
)

func exigir(condicao bool) {
\tif !condicao {
\t\tpanic("resultado inesperado no exemplo")
\t}
}

func main() {
\tid := "soma_de_dois"
\tif len(os.Args) > 1 {
\t\tid = os.Args[1]
\t}
\tfmt.Print(id + ": ")
\tswitch id {
${blocos}
\tdefault:
\t\tfmt.Fprintln(os.Stderr, "ID de desafio inválido")
\t\tos.Exit(2)
\t}
}
`;
}
