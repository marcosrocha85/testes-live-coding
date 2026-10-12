unit mesclar_listas_ordenadas_test;
{$mode objfpc}{$H+}
interface
procedure TestarMescla;
implementation
uses fpjson, tipos, no, teste_apoio, mesclar_listas;
procedure Verificar(const A, B, Valores: TInteiros);
var Primeira, Segunda, Esperados: TNos; R: PNo;
begin
  Primeira := Montar(A); Segunda := Montar(B);
  try
    Esperados := MesclaReferencia(Primeira, Segunda);
    R := MesclarListasOrdenadas(Cabeca(Primeira), Cabeca(Segunda));
    ConferirLista(R, Esperados, Valores);
  finally LiberarNos(Primeira); LiberarNos(Segunda); end;
end;

procedure TestarMescla;
var Casos: TJSONArray; C: TJSONObject; A, B, Valores: TInteiros; I, T: Integer;
    Primeira, Segunda, Esperados: TNos;
begin
  Casos := AbrirCasos('mesclar_listas_ordenadas');
  try
    for I := 0 to Casos.Count - 1 do
    begin C := Caso(Casos, I); Verificar(Inteiros(C.FindPath('input.primeira')), Inteiros(C.FindPath('input.segunda')), Inteiros(C.Find('expected'))); end;
  finally Casos.Free; end;
  Contexto := 'mescla: ordenação estável independente e identidade';
  for T := 1 to 100 do
  begin
    A := NumerosAleatorios; B := NumerosAleatorios; Ordenar(A); Ordenar(B);
    Valores := Concat(A, B); Ordenar(Valores); Verificar(A, B, Valores);
  end;
  Contexto := 'mescla: listas longas intercaladas';
  SetLength(A, 10000); SetLength(B, 10000); SetLength(Valores, 20000);
  for I := 0 to 9999 do begin A[I] := I * 2; B[I] := I * 2 + 1; Valores[I * 2] := A[I]; Valores[I * 2 + 1] := B[I]; end;
  Primeira := Montar(A); Segunda := Montar(B);
  try
    // A fórmula alternada evita ordenar 20 mil elementos com o oráculo quadrático.
    Esperados := nil; SetLength(Esperados, 20000);
    for I := 0 to 9999 do begin Esperados[I * 2] := Primeira[I]; Esperados[I * 2 + 1] := Segunda[I]; end;
    ConferirLista(MesclarListasOrdenadas(Cabeca(Primeira), Cabeca(Segunda)), Esperados, Valores);
  finally LiberarNos(Primeira); LiberarNos(Segunda); end;
  Verificar(TInteiros.Create(1, 1, 1), TInteiros.Create(1, 1), TInteiros.Create(1, 1, 1, 1, 1));
end;
end.
