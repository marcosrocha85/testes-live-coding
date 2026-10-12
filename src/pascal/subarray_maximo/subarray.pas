unit subarray;
{$mode objfpc}{$H+}

interface
uses tipos;
function SubarrayMaximo(const Numeros: array of Int64): TSomaOpcional;

implementation
function SubarrayMaximo(const Numeros: array of Int64): TSomaOpcional;
var Atual: Int64; I: SizeInt;
begin
  Result := Default(TSomaOpcional);
  if Length(Numeros) = 0 then Exit;
  Result.Encontrada := True;
  Atual := Numeros[0];
  Result.Valor := Atual;
  for I := 1 to High(Numeros) do
  begin
    // Escolha entre prolongar o trecho anterior e começar um novo aqui.
    if Atual < 0 then Atual := Numeros[I] else Atual := Atual + Numeros[I];
    if Atual > Result.Valor then Result.Valor := Atual;
  end;
end;
end.
