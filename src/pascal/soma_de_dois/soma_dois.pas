unit soma_dois;
{$mode objfpc}{$H+}

interface
uses tipos;
function SomaDeDois(const Numeros: array of Int64; Alvo: Int64): TParIndices;

implementation
uses mapa_inteiro;
function SomaDeDois(const Numeros: array of Int64; Alvo: Int64): TParIndices;
var Vistos: TMapaInteiro; I: SizeInt; Anterior: Int64;
begin
  Result := Default(TParIndices);
  Vistos := TMapaInteiro.Create;
  try
    for I := 0 to High(Numeros) do
    begin
      // Consultar antes de guardar impede usar o mesmo índice duas vezes.
      if Vistos.Obter(Alvo - Numeros[I], Anterior) then
      begin
        Result.Encontrado := True;
        Result.Primeiro := SizeInt(Anterior);
        Result.Segundo := I;
        Exit;
      end;
      if not Vistos.Obter(Numeros[I], Anterior) then Vistos.Definir(Numeros[I], I);
    end;
  finally
    Vistos.Free;
  end;
end;
end.
