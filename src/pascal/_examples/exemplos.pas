// Gerado por npm run docs. Consulte os READMEs dos desafios.
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
  if Desafio = 'soma_de_dois' then
  begin
    Par := SomaDeDois([2, 7, 11, 15], 9);
    Exigir(Par.Encontrado and (Par.Primeiro = 0) and (Par.Segundo = 1));
    WriteLn(Par.Primeiro, ' ', Par.Segundo); // 0 1
  end
  else if Desafio = 'parenteses_validos' then
  begin
    Exigir(ParentesesValidos('{[()]}'));
    WriteLn(ParentesesValidos('{[()]}')); // TRUE
  end
  else if Desafio = 'inverter_lista_ligada' then
  begin
    A := NovoNo(1, NovoNo(2, NovoNo(3)));
    R := InverterListaLigada(A);
    try
      Exigir(R^.Valor = 3);
      WriteLn(R^.Valor); // 3; as ligações são 3 → 2 → 1 → nil
    finally
      LiberarLista(R); // Usa a nova cabeça.
    end;
  end
  else if Desafio = 'busca_binaria' then
  begin
    Exigir(BuscaBinaria([1, 3, 5, 7, 9], 7) = 3);
    WriteLn(BuscaBinaria([1, 3, 5, 7, 9], 7)); // 3
  end
  else if Desafio = 'mesclar_listas_ordenadas' then
  begin
    R := MesclarListasOrdenadas(NovoNo(1, NovoNo(3)), NovoNo(2, NovoNo(4)));
    try
      Exigir(R^.Valor = 1);
      WriteLn(R^.Valor); // 1; as ligações são 1 → 2 → 3 → 4 → nil
    finally
      LiberarLista(R); // Cada nó é liberado uma única vez.
    end;
  end
  else if Desafio = 'compra_e_venda_de_acoes' then
  begin
    Exigir(MaiorLucro([7, 1, 5, 3, 6, 4]) = 5);
    WriteLn(MaiorLucro([7, 1, 5, 3, 6, 4])); // 5
  end
  else if Desafio = 'subarray_maximo' then
  begin
    Soma := SubarrayMaximo([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
    Exigir(Soma.Encontrada and (Soma.Valor = 6));
    WriteLn(Soma.Valor); // 6
  end
  else if Desafio = 'subir_escadas' then
  begin
    Exigir(SubirEscadas(5) = 8);
    WriteLn(SubirEscadas(5)); // 8
  end
  else if Desafio = 'anagrama_valido' then
  begin
    Exigir(AnagramaValido('😀a😀', '😀😀a'));
    WriteLn(AnagramaValido('😀a😀', '😀😀a')); // TRUE
  end
  else if Desafio = 'ciclo_em_lista_ligada' then
  begin
    A := NovoNo(1);
    B := NovoNo(2, A);
    A^.Proximo := B;
    try
      Exigir(TemCiclo(A));
      WriteLn(TemCiclo(A)); // TRUE
    finally
      B^.Proximo := nil; // Desfaz o ciclo antes de liberar.
      LiberarLista(A);
    end;
  end
  else raise Exception.Create('Informe um ID de desafio válido.');
end.
