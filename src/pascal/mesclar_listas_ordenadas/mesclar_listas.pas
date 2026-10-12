unit mesclar_listas;
{$mode objfpc}{$H+}

interface
uses no;
function MesclarListasOrdenadas(Primeira, Segunda: PNo): PNo;

implementation
function MesclarListasOrdenadas(Primeira, Segunda: PNo): PNo;
var Sentinela: TNo; Cauda: PNo;
begin
  Sentinela.Proximo := nil;
  Cauda := @Sentinela;
  while (Primeira <> nil) and (Segunda <> nil) do
  begin
    // Em empate, o nó da primeira lista vem antes. Nenhum nó real é criado.
    if Primeira^.Valor <= Segunda^.Valor then
    begin Cauda^.Proximo := Primeira; Primeira := Primeira^.Proximo; end
    else
    begin Cauda^.Proximo := Segunda; Segunda := Segunda^.Proximo; end;
    Cauda := Cauda^.Proximo;
  end;
  if Primeira <> nil then Cauda^.Proximo := Primeira else Cauda^.Proximo := Segunda;
  Result := Sentinela.Proximo;
end;
end.
