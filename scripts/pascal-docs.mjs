// Fonte única dos exemplos executáveis e das notas dos READMEs Pascal.
export const notasPascal = {
  soma_de_dois: '`const Numeros: array of Int64` recebe um array aberto, com índices desde zero e sem escrever nele. `TParIndices.Encontrado` distingue ausência de resposta; zero é um índice válido. O mapa próprio usa uma tabela hash com colisões por sondagem e redimensionamento. Guardar somente a primeira ocorrência preserva o contrato. `try/finally` libera o mapa mesmo no retorno antecipado.',
  parenteses_validos: '`UTF8String` contém bytes, indexados desde 1. Os seis símbolos permitidos são ASCII, de um byte; qualquer outro byte é rejeitado. A pilha é um array dinâmico desde zero. `Topo` guarda quantos símbolos há nela. A função verifica o topo antes de acessar o array, inclusive na entrada vazia.',
  inverter_lista_ligada: '`PNo = ^TNo` é um ponteiro para um registro real, criado por `New`. `nil` indica o fim. `Atual^` acessa o registro apontado. Guardar `Seguinte` conserva o endereço antigo antes da mutação. A função reaproveita todos os nós. Quem chamou a função deve liberar a lista usando a nova cabeça, com `LiberarLista`.',
  busca_binaria: '`SizeInt` é um inteiro com sinal usado para índices. `High` devolve -1 para um array aberto vazio. `div` faz divisão inteira. A função exige números já ordenados e não escreve no array; -1 indica ausência. Em duplicatas, qualquer índice correspondente é aceito.',
  mesclar_listas_ordenadas: 'O sentinela é um registro local, com endereço obtido por `@`; ele fica fora do resultado. Os nós reais vêm das entradas e seus ponteiros são alterados. `<=` preserva a preferência pela primeira lista em empate. As duas listas precisam ser independentes, ordenadas e sem ciclos. Libere a saída uma única vez: liberar novamente as cabeças antigas causaria acesso a memória já liberada.',
  compra_e_venda_de_acoes: '`Int64` preserva os preços e as diferenças. A entrada vazia retorna zero. O menor preço representa os dias anteriores; o lucro é calculado antes de atualizar esse menor preço. O parâmetro `const` não é alterado. Zero representa a escolha de não negociar.',
  subarray_maximo: '`TSomaOpcional.Encontrada` distingue uma soma de ausência de elementos. A soma usa `Int64`, pois dez mil valores de um milhão chegam a dez bilhões, além de 32 bits. Inicializar pelo primeiro elemento preserva a resposta quando todos são negativos. Uma soma zero continua sendo uma resposta presente.',
  subir_escadas: '`Double` permite receber frações e não finitos para rejeitá-los. `EEntradaInvalida` é o equivalente do erro de domínio dos casos JSON. A função valida antes de usar `Trunc`. Os acumuladores e a saída são `Int64`: nenhuma contagem usa ponto flutuante. O domínio continua sendo 0 a 77; para zero há uma forma de não dar passos.',
  anagrama_valido: '`UTF8String` armazena bytes; contar cada byte seria incorreto. `ProximoPonto` lê de um a quatro bytes e devolve um `Cardinal` com o ponto Unicode completo. O mapa liga esse inteiro à frequência. Não há normalização, comparação de grafemas, remoção de espaços ou diferença ignorada entre maiúsculas e minúsculas. O contrato exige UTF-8 bem formado. Os pontos são lidos sem copiar o texto para arrays.',
  ciclo_em_lista_ligada: '`Lento = Rapido` compara endereços, não valores. Floyd apenas lê os campos `Proximo`. Os testes guardam todos os endereços para liberar cada nó uma vez mesmo com ciclos. Em um programa comum, quebre o ciclo antes de chamar `LiberarLista`; a rotina de liberação pressupõe uma lista sem ciclos.'
};

export const exemplosPascal = {
  soma_de_dois: `Par := SomaDeDois([2, 7, 11, 15], 9);
Exigir(Par.Encontrado and (Par.Primeiro = 0) and (Par.Segundo = 1));
WriteLn(Par.Primeiro, ' ', Par.Segundo); // 0 1`,
  parenteses_validos: `Exigir(ParentesesValidos('{[()]}'));
WriteLn(ParentesesValidos('{[()]}')); // TRUE`,
  inverter_lista_ligada: `A := NovoNo(1, NovoNo(2, NovoNo(3)));
R := InverterListaLigada(A);
try
  Exigir(R^.Valor = 3);
  WriteLn(R^.Valor); // 3; as ligações são 3 → 2 → 1 → nil
finally
  LiberarLista(R); // Usa a nova cabeça.
end;`,
  busca_binaria: `Exigir(BuscaBinaria([1, 3, 5, 7, 9], 7) = 3);
WriteLn(BuscaBinaria([1, 3, 5, 7, 9], 7)); // 3`,
  mesclar_listas_ordenadas: `R := MesclarListasOrdenadas(NovoNo(1, NovoNo(3)), NovoNo(2, NovoNo(4)));
try
  Exigir(R^.Valor = 1);
  WriteLn(R^.Valor); // 1; as ligações são 1 → 2 → 3 → 4 → nil
finally
  LiberarLista(R); // Cada nó é liberado uma única vez.
end;`,
  compra_e_venda_de_acoes: `Exigir(MaiorLucro([7, 1, 5, 3, 6, 4]) = 5);
WriteLn(MaiorLucro([7, 1, 5, 3, 6, 4])); // 5`,
  subarray_maximo: `Soma := SubarrayMaximo([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
Exigir(Soma.Encontrada and (Soma.Valor = 6));
WriteLn(Soma.Valor); // 6`,
  subir_escadas: `Exigir(SubirEscadas(5) = 8);
WriteLn(SubirEscadas(5)); // 8`,
  anagrama_valido: `Exigir(AnagramaValido('😀a😀', '😀😀a'));
WriteLn(AnagramaValido('😀a😀', '😀😀a')); // TRUE`,
  ciclo_em_lista_ligada: `A := NovoNo(1);
B := NovoNo(2, A);
A^.Proximo := B;
try
  Exigir(TemCiclo(A));
  WriteLn(TemCiclo(A)); // TRUE
finally
  B^.Proximo := nil; // Desfaz o ciclo antes de liberar.
  LiberarLista(A);
end;`
};

export function programaPascal(exercicios) {
  const blocos = exercicios.map(({ id }, i) => `${i ? 'else ' : ''}if Desafio = '${id}' then\nbegin\n${exemplosPascal[id].split('\n').map(linha => '  ' + linha).join('\n')}\nend`).join('\n');
  return `// Gerado por npm run docs. Consulte os READMEs dos desafios.
program Exemplos;
{$mode objfpc}{$H+}{$codepage utf8}
uses heaptrc, fpwidestring, SysUtils, tipos, no, soma_dois, parenteses, inverter_lista,
  busca, mesclar_listas, acoes, subarray, escadas, anagrama, ciclo;
var Desafio: string; Par: TParIndices; Soma: TSomaOpcional; A, B, R: PNo;
procedure Exigir(Condicao: Boolean);
begin
  if not Condicao then raise Exception.Create('Resultado inesperado no exemplo.');
end;
begin
  HaltOnNotReleased := True;
  Desafio := ParamStr(1);
${blocos.split('\n').map(linha => '  ' + linha).join('\n')}
  else raise Exception.Create('Informe um ID de desafio válido.');
end.
`;
}
