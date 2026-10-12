unit subarray_maximo_test;
{$mode objfpc}{$H+}
interface
procedure TestarSubarray;
implementation
uses fpjson, tipos, teste_apoio, subarray;
procedure TestarSubarray;
var Casos: TJSONArray; C: TJSONObject; A, Copia: TInteiros; R, Esperado: TSomaOpcional;
    Soma: Int64; I, T, J, K, P: Integer;
begin
  Casos := AbrirCasos('subarray_maximo');
  try
    for I := 0 to Casos.Count - 1 do
    begin
      C := Caso(Casos, I); A := Inteiros(C.FindPath('input.numeros')); Copia := Copy(A); R := SubarrayMaximo(A);
      if C.Find('expected').JSONType = jtNull then Conferir(not R.Encontrada, 'ausência')
      else Conferir(R.Encontrada and (R.Valor = C.Find('expected').AsInt64), 'soma');
      Conferir(Iguais(A, Copia), 'mutação');
    end;
  finally Casos.Free; end;
  Contexto := 'subarray: somar cada trecho separadamente';
  for T := 1 to 300 do
  begin
    A := NumerosAleatorios; Copia := Copy(A); Esperado := Default(TSomaOpcional);
    for J := 0 to High(A) do
      for K := J to High(A) do
      begin
        Soma := 0; for P := J to K do Soma := Soma + A[P];
        if (not Esperado.Encontrada) or (Soma > Esperado.Valor) then Esperado.Valor := Soma;
        Esperado.Encontrada := True;
      end;
    R := SubarrayMaximo(A); Conferir(R.Encontrada = Esperado.Encontrada, 'existência');
    if R.Encontrada then Conferir(R.Valor = Esperado.Valor, 'referência');
    Conferir(Iguais(A, Copia), 'mutação');
  end;
  SetLength(A, 10000); for I := 0 to High(A) do A[I] := 1000000;
  R := SubarrayMaximo(A); Conferir(R.Encontrada and (R.Valor = Int64(10000000000)), 'soma além de 32 bits');
  for I := 0 to High(A) do A[I] := -1000000;
  R := SubarrayMaximo(A); Conferir(R.Valor = -1000000, 'todos negativos');
end;
end.
