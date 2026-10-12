unit subir_escadas_test;
{$mode objfpc}{$H+}
interface
procedure TestarEscadas;
implementation
uses Math, fpjson, teste_apoio, escadas;
procedure Rejeitar(N: Double);
var Rejeitou: Boolean;
begin
  Rejeitou := False;
  try SubirEscadas(N); except on EEntradaInvalida do Rejeitou := True; end;
  Conferir(Rejeitou, 'domínio inválido aceito');
end;

procedure TestarEscadas;
var Casos: TJSONArray; C: TJSONObject; I, N, K: Integer; Esperado: Int64;
    Combinacoes: array[0..77, 0..77] of Int64;
begin
  Casos := AbrirCasos('subir_escadas');
  try
    for I := 0 to Casos.Count - 1 do
    begin
      C := Caso(Casos, I);
      if C.Find('error') <> nil then Rejeitar(C.FindPath('input.degraus').AsFloat)
      else Conferir(SubirEscadas(C.FindPath('input.degraus').AsFloat) = C.Find('expected').AsInt64, 'contagem exata');
    end;
  finally Casos.Free; end;
  Contexto := 'escadas: combinações de posições dos passos duplos';
  FillChar(Combinacoes, SizeOf(Combinacoes), 0);
  // Só calculamos C(n-k,k) usados: as demais entradas do triângulo poderiam exceder Int64.
  for N := 0 to 77 do
  begin
    Combinacoes[N, 0] := 1;
    for K := 1 to N do
      if N + K <= 77 then
        Combinacoes[N, K] := Combinacoes[N - 1, K - 1] + Combinacoes[N - 1, K];
  end;
  for N := 0 to 77 do
  begin
    Esperado := 0;
    for K := 0 to N div 2 do Esperado := Esperado + Combinacoes[N - K, K];
    Conferir(SubirEscadas(N) = Esperado, 'combinatória independente');
  end;
  Conferir(SubirEscadas(77) = Int64(8944394323791464), 'valor decimal literal exato');
  Rejeitar(NaN); Rejeitar(Infinity); Rejeitar(NegInfinity);
  Rejeitar(1E300); Rejeitar(-1E300); Rejeitar(0.5);
end;
end.
