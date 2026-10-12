unit ciclo;
{$mode objfpc}{$H+}

interface
uses no;
function TemCiclo(Cabeca: PNo): Boolean;

implementation
function TemCiclo(Cabeca: PNo): Boolean;
var Lento, Rapido: PNo;
begin
  Lento := Cabeca;
  Rapido := Cabeca;
  while (Rapido <> nil) and (Rapido^.Proximo <> nil) do
  begin
    Lento := Lento^.Proximo;
    Rapido := Rapido^.Proximo^.Proximo;
    // Compara endereços dos nós. Valores repetidos não significam ciclo.
    if Lento = Rapido then Exit(True);
  end;
  Result := False;
end;
end.
