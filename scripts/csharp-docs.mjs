// Fonte única das notas e dos trechos compilados pelo executável de exemplos.
export const notasCSharp = {
  soma_de_dois: '`ReadOnlySpan<long>` empresta uma vista dos números para leitura, sem copiar o array. Dictionary<long, int> liga valores a índices. TryGetValue distingue índice zero de ausência; TryAdd conserva a primeira ocorrência. O retorno `(int Anterior, int Atual)?` é uma tupla opcional: null significa ausência. long mantém os complementos em 64 bits.',
  parenteses_validos: '`Stack<char>` é uma pilha; TryPop retorna false se não houver abertura. Percorrer char é suficiente aqui porque os seis símbolos válidos são ASCII e qualquer outra unidade torna a entrada inválida. Isso não serve para o anagrama. String vazia retorna true.',
  inverter_lista_ligada: '`No?` é uma referência que admite null. No é uma classe real; atribuir a referência não copia o objeto. seguinte preserva a ligação antiga antes de mudar Proximo. A função reutiliza todos os nós e devolve a nova cabeça. ReferenceEquals e Assert.Same verificam identidade. O coletor de lixo administra a memória, inclusive cadeias longas sem destruição recursiva.',
  busca_binaria: 'int representa índices e tamanhos; os valores usam long. O intervalo [esquerda, direita) exclui direita e permite entrada vazia sem acessar elemento. ReadOnlySpan<long> impede escrever nos valores. A função não ordena a entrada e retorna -1 para ausência; duplicatas aceitam qualquer índice correspondente.',
  mesclar_listas_ordenadas: 'A sentinela é o único objeto novo e fica fora do resultado. <= mantém a primeira lista em empate. `primeira ?? segunda` escolhe a referência não nula restante. Os nós são reutilizados e Proximo é alterado. As listas precisam estar ordenadas, sem ciclos e sem nós compartilhados. Valor tem apenas get, preservando os valores.',
  compra_e_venda_de_acoes: 'ReadOnlySpan<long> permite somente ler os preços; precos[1..] é uma vista sem copiar o restante. long preserva preços e diferenças exatas. Avaliar a venda antes de atualizar o menor preço mantém a cronologia. Entradas vazias, unitárias ou sem ganho retornam zero.',
  subarray_maximo: '`long?` distingue null, para entrada vazia, de uma soma presente, inclusive zero ou negativa. Começar no primeiro valor evita escolher um trecho vazio em entradas só negativas. Dez mil valores de um milhão somam dez bilhões: os acumuladores usam long de 64 bits.',
  subir_escadas: 'double é usado somente para receber e rejeitar frações, NaN e infinitos. A validação ocorre antes de converter para int; valores fora de 0 a 77 lançam ArgumentOutOfRangeException, equivalente a RangeError. Contagens e saída usam long, sem arredondamento. O erro identifica o parâmetro degraus. Zero tem uma sequência vazia.',
  anagrama_valido: 'string usa UTF-16: Length e foreach(char) contam unidades, não pontos completos. `EnumerateRunes()` produz System.Text.Rune, preservando emojis e outros valores escalares. Dictionary<Rune, long> conta os pontos sem normalização, comparação de grafemas ou remoção de espaços. O contrato pressupõe strings bem formadas; sequências UTF-16 inválidas seriam substituídas por U+FFFD. Ambas vazias retornam true.',
  ciclo_em_lista_ligada: '`rapido?.Proximo` só acessa o campo se a referência existe. ReferenceEquals compara o próprio objeto, não seus valores. Floyd apenas lê as ligações. O coletor de lixo .NET recolhe também ciclos que deixam de ser alcançáveis, sem precisar quebrar ligações no algoritmo ou usar IDisposable para nós.'
};

export const exemplosCSharp = {
  soma_de_dois: `var par = SomaDeDois.Resolver([2, 7, 11, 15], 9);
Exigir(par == (0, 1));
Console.WriteLine(par); // (0, 1)`,
  parenteses_validos: `bool resultado = ParentesesValidos.Validar("{[()]}");
Exigir(resultado);
Console.WriteLine(resultado); // True`,
  inverter_lista_ligada: `var terceiro = new No(3);
var segundo = new No(2, terceiro);
var primeiro = new No(1, segundo);
No? resultado = InverterListaLigada.Inverter(primeiro);
Exigir(ReferenceEquals(resultado, terceiro));
Exigir(ReferenceEquals(terceiro.Proximo, segundo));
Exigir(ReferenceEquals(segundo.Proximo, primeiro) && primeiro.Proximo is null);
Console.WriteLine(resultado?.Valor); // 3; 3 → 2 → 1 → null`,
  busca_binaria: `int indice = BuscaBinaria.Buscar([1, 3, 5, 7, 9], 7);
Exigir(indice == 3);
Console.WriteLine(indice); // 3`,
  mesclar_listas_ordenadas: `var tres = new No(3);
var quatro = new No(4);
var um = new No(1, tres);
var dois = new No(2, quatro);
No? resultado = MesclarListasOrdenadas.Mesclar(um, dois);
Exigir(ReferenceEquals(resultado, um) && ReferenceEquals(um.Proximo, dois));
Exigir(ReferenceEquals(dois.Proximo, tres) && ReferenceEquals(tres.Proximo, quatro));
Exigir(quatro.Proximo is null);
Console.WriteLine(resultado?.Valor); // 1; 1 → 2 → 3 → 4 → null`,
  compra_e_venda_de_acoes: `long lucro = CompraEVendaDeAcoes.MaiorLucro([7, 1, 5, 3, 6, 4]);
Exigir(lucro == 5);
Console.WriteLine(lucro); // 5`,
  subarray_maximo: `long? soma = SubarrayMaximo.Somar([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
Exigir(soma == 6);
Console.WriteLine(soma); // 6`,
  subir_escadas: `long formas = SubirEscadas.Contar(5);
Exigir(formas == 8);
Console.WriteLine(formas); // 8`,
  anagrama_valido: `bool resultado = AnagramaValido.Validar("😀a😀", "😀😀a");
Exigir(resultado);
Console.WriteLine(resultado); // True`,
  ciclo_em_lista_ligada: `var primeiro = new No(1);
var segundo = new No(2, primeiro);
primeiro.Proximo = segundo;
bool resultado = CicloEmListaLigada.TemCiclo(primeiro);
Exigir(resultado && ReferenceEquals(primeiro.Proximo, segundo));
Exigir(ReferenceEquals(segundo.Proximo, primeiro));
Console.WriteLine(resultado); // True`
};

export function programaCSharp(exercicios) {
  const blocos = exercicios.map(({ id }) => `    case "${id}":
        {
${exemplosCSharp[id].split('\n').map(linha => '            ' + linha).join('\n')}
            break;
        }`).join('\n');
  return `// Gerado por npm run docs. Consulte os READMEs dos desafios.
using LiveCoding;

static void Exigir(bool condicao)
{
    if (!condicao) throw new InvalidOperationException("Resultado inesperado no exemplo.");
}

string id = args.Length > 0 ? args[0] : "soma_de_dois";
Console.Write(id + ": ");
switch (id)
{
${blocos}
    default:
        Console.Error.WriteLine("ID de desafio inválido.");
        return 2;
}
return 0;
`;
}
