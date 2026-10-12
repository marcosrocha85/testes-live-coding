unit escadas;
{$mode objfpc}{$H+}

interface
uses SysUtils;
type EEntradaInvalida = class(Exception);
function SubirEscadas(Degraus: Double): Int64;

implementation
uses Math;
function SubirEscadas(Degraus: Double): Int64;
var Anterior, Atual, Seguinte: Int64; I, N: Integer;
begin
  if IsNan(Degraus) or IsInfinite(Degraus) then
    raise EEntradaInvalida.Create('Degraus deve ser inteiro entre 0 e 77.');
  if (Degraus < 0) or (Degraus > 77) then
    raise EEntradaInvalida.Create('Degraus deve ser inteiro entre 0 e 77.');
  if Frac(Degraus) <> 0 then
    raise EEntradaInvalida.Create('Degraus deve ser inteiro entre 0 e 77.');
  N := Trunc(Degraus);
  Anterior := 1;
  Atual := 1;
  // Double serve somente para validar a entrada. As somas são inteiras exatas.
  for I := 2 to N do
  begin
    Seguinte := Anterior + Atual;
    Anterior := Atual;
    Atual := Seguinte;
  end;
  Result := Atual;
end;
end.
