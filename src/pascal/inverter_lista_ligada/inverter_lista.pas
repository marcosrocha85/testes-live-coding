unit inverter_lista;
{$mode objfpc}{$H+}

interface
uses no;
function InverterListaLigada(Cabeca: PNo): PNo;

implementation
function InverterListaLigada(Cabeca: PNo): PNo;
var Anterior, Atual, Seguinte: PNo;
begin
  Anterior := nil;
  Atual := Cabeca;
  while Atual <> nil do
  begin
    // Guarde o próximo antes de mudar a ligação; o nó continua sendo o mesmo.
    Seguinte := Atual^.Proximo;
    Atual^.Proximo := Anterior;
    Anterior := Atual;
    Atual := Seguinte;
  end;
  Result := Anterior;
end;
end.
