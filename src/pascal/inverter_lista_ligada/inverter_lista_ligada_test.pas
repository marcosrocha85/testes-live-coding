unit inverter_lista_ligada_test;
{$mode objfpc}{$H+}
interface
procedure TestarInversao;
implementation
uses fpjson, tipos, no, teste_apoio, inverter_lista;
procedure Verificar(const Valores, Esperados: TInteiros);
var Nos, Reversos: TNos; R: PNo; I: SizeInt;
begin
  Nos := Montar(Valores);
  try
    Reversos := nil; SetLength(Reversos, Length(Nos));
    for I := 0 to High(Nos) do Reversos[I] := Nos[High(Nos) - I];
    R := InverterListaLigada(Cabeca(Nos));
    ConferirLista(R, Reversos, Esperados);
    // Duas inversões devem recuperar todos os endereços e vínculos originais.
    R := InverterListaLigada(R);
    ConferirLista(R, Nos, Valores);
  finally LiberarNos(Nos); end;
end;

procedure TestarInversao;
var Casos: TJSONArray; C: TJSONObject; A, B: TInteiros; I, T, J: Integer; N: PNo;
begin
  Casos := AbrirCasos('inverter_lista_ligada');
  try
    for I := 0 to Casos.Count - 1 do
    begin C := Caso(Casos, I); Verificar(Inteiros(C.FindPath('input.valores')), Inteiros(C.Find('expected'))); end;
  finally Casos.Free; end;
  Contexto := 'inversão: referência por endereços';
  for T := 1 to 100 do
  begin
    A := NumerosAleatorios; B := nil; SetLength(B, Length(A));
    for J := 0 to High(A) do B[J] := A[High(A) - J];
    Verificar(A, B);
  end;
  SetLength(A, 10000); SetLength(B, 10000);
  for I := 0 to High(A) do begin A[I] := I mod 7; B[High(B) - I] := A[I]; end;
  Verificar(A, B);
  N := NovoNo(1, NovoNo(2)); LiberarLista(N); LiberarLista(nil);
end;
end.
