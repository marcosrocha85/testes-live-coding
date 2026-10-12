unit compra_e_venda_de_acoes_test;
{$mode objfpc}{$H+}
interface
procedure TestarAcoes;
implementation
uses fpjson, tipos, teste_apoio, acoes;
procedure TestarAcoes;
var Casos: TJSONArray; C: TJSONObject; A, Copia: TInteiros; Esperado: Int64; I, T, J, K: Integer;
begin
  Casos := AbrirCasos('compra_e_venda_de_acoes');
  try
    for I := 0 to Casos.Count - 1 do
    begin C := Caso(Casos, I); A := Inteiros(C.FindPath('input.precos')); Copia := Copy(A);
      Conferir(MaiorLucro(A) = C.Find('expected').AsInt64, 'lucro'); Conferir(Iguais(A, Copia), 'mutação'); end;
  finally Casos.Free; end;
  Contexto := 'ações: todos os pares de dias';
  for T := 1 to 300 do
  begin
    A := NumerosAleatorios; for J := 0 to High(A) do A[J] := Abs(A[J]); Copia := Copy(A);
    Esperado := 0;
    for J := 0 to High(A) do
      for K := J + 1 to High(A) do if A[K] - A[J] > Esperado then Esperado := A[K] - A[J];
    Conferir(MaiorLucro(A) = Esperado, 'referência'); Conferir(Iguais(A, Copia), 'mutação');
  end;
  SetLength(A, 10000); for I := 0 to High(A) do A[I] := 1000000;
  A[9998] := 0;
  Conferir(MaiorLucro(A) = 1000000, 'limite de preços e ordem');
end;
end.
