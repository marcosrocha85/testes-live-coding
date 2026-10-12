unit soma_de_dois_test;
{$mode objfpc}{$H+}
interface
procedure TestarSomaDeDois;
implementation
uses fpjson, tipos, teste_apoio, soma_dois;
procedure TestarSomaDeDois;
var Casos: TJSONArray; C: TJSONObject; A, Copia, Esperado: TInteiros;
    R: TParIndices; Alvo: Int64; I, T, J, K: Integer; Achou: Boolean;
begin
  Casos := AbrirCasos('soma_de_dois');
  try
    for I := 0 to Casos.Count - 1 do
    begin
      C := Caso(Casos, I); A := Inteiros(C.FindPath('input.numeros')); Copia := Copy(A);
      R := SomaDeDois(A, C.FindPath('input.alvo').AsInt64);
      Conferir(Iguais(A, Copia), 'mutação do array');
      if C.Find('expected').JSONType = jtNull then Conferir(not R.Encontrado, 'ausência')
      else begin Esperado := Inteiros(C.Find('expected')); Conferir(R.Encontrado, 'par ausente');
        Conferir((R.Primeiro = Esperado[0]) and (R.Segundo = Esperado[1]), 'índices'); end;
    end;
  finally Casos.Free; end;
  Contexto := 'soma: todos os pares, semente fixa';
  for T := 1 to 300 do
  begin
    A := NumerosAleatorios; Copia := Copy(A); Alvo := Aleatorio(31) - 15;
    R := SomaDeDois(A, Alvo); Achou := False;
    for J := 0 to High(A) do
    begin
      for K := 0 to J - 1 do
        if A[K] + A[J] = Alvo then
        begin
          Achou := True;
          Conferir(R.Encontrado and (R.Primeiro = K) and (R.Segundo = J), 'primeiro par');
          Break;
        end;
      if Achou then Break;
    end;
    Conferir(R.Encontrado = Achou, 'existência do par');
    Conferir(Iguais(A, Copia), 'mutação');
  end;
  Contexto := 'soma: limite e crescimento do mapa';
  SetLength(A, 10000);
  for I := 0 to 9998 do A[I] := I;
  A[9999] := -1000000;
  R := SomaDeDois(A, -990002);
  Conferir(R.Encontrado and (R.Primeiro = 9998) and (R.Segundo = 9999), 'lista longa');
end;
end.
