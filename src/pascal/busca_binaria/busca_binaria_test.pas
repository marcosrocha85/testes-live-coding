unit busca_binaria_test;
{$mode objfpc}{$H+}
interface
procedure TestarBusca;
implementation
uses fpjson, tipos, teste_apoio, busca;
procedure TestarBusca;
var Casos: TJSONArray; C: TJSONObject; A, Copia, Aceitos: TInteiros;
    R: SizeInt; Alvo: Int64; I, T, J: Integer; Achou: Boolean;
begin
  Casos := AbrirCasos('busca_binaria');
  try
    for I := 0 to Casos.Count - 1 do
    begin
      C := Caso(Casos, I); A := Inteiros(C.FindPath('input.numeros')); Copia := Copy(A);
      R := BuscaBinaria(A, C.FindPath('input.alvo').AsInt64);
      if C.Find('expectedIndices') <> nil then
      begin
        Aceitos := Inteiros(C.Find('expectedIndices')); Achou := False;
        for J := 0 to High(Aceitos) do if R = Aceitos[J] then Achou := True;
        Conferir(Achou, 'índice de duplicata');
      end else Conferir(R = C.Find('expected').AsInt64, 'índice');
      Conferir(Iguais(A, Copia), 'mutação');
    end;
  finally Casos.Free; end;
  Contexto := 'busca: procura linear';
  for T := 1 to 300 do
  begin
    A := NumerosAleatorios; Ordenar(A); Copia := Copy(A); Alvo := Aleatorio(31) - 15;
    Achou := False;
    for J := 0 to High(A) do if A[J] = Alvo then Achou := True;
    R := BuscaBinaria(A, Alvo);
    if Achou then begin Conferir((R >= 0) and (R < Length(A)), 'limites'); Conferir(A[R] = Alvo, 'valor'); end
    else Conferir(R = -1, 'ausência');
    Conferir(Iguais(A, Copia), 'mutação');
  end;
  SetLength(A, 10000); for I := 0 to High(A) do A[I] := I - 5000;
  Conferir(BuscaBinaria(A, 4999) = 9999, 'extremo longo');
  Conferir(BuscaBinaria(A, -5000) = 0, 'primeira posição');
  Conferir(BuscaBinaria(A, 5000) = -1, 'fora do intervalo');
end;
end.
