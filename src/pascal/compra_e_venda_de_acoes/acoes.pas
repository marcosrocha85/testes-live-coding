unit acoes;
{$mode objfpc}{$H+}

interface
function MaiorLucro(const Precos: array of Int64): Int64;

implementation
function MaiorLucro(const Precos: array of Int64): Int64;
var Menor, Lucro: Int64; I: SizeInt;
begin
  Result := 0;
  if Length(Precos) = 0 then Exit;
  Menor := Precos[0];
  for I := 1 to High(Precos) do
  begin
    // Menor representa somente os dias anteriores à venda atual.
    Lucro := Precos[I] - Menor;
    if Lucro > Result then Result := Lucro;
    if Precos[I] < Menor then Menor := Precos[I];
  end;
end;
end.
