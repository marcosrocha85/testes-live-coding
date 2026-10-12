unit tipos;
{$mode objfpc}{$H+}

interface
type
  TInteiros = array of Int64;
  TParIndices = record
    Encontrado: Boolean;
    Primeiro, Segundo: SizeInt;
  end;
  TSomaOpcional = record
    Encontrada: Boolean;
    Valor: Int64;
  end;
implementation
end.
