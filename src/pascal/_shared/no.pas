unit no;
{$mode objfpc}{$H+}

interface
type
  PNo = ^TNo;
  TNo = record
    Valor: Int64;
    Proximo: PNo;
  end;

function NovoNo(Valor: Int64; Proximo: PNo = nil): PNo;
procedure LiberarLista(Cabeca: PNo);

implementation
function NovoNo(Valor: Int64; Proximo: PNo): PNo;
begin
  New(Result);
  Result^.Valor := Valor;
  Result^.Proximo := Proximo;
end;

procedure LiberarLista(Cabeca: PNo);
var Seguinte: PNo;
begin
  // A lista precisa estar sem ciclos e cada nó deve ser liberado uma vez.
  while Cabeca <> nil do
  begin
    Seguinte := Cabeca^.Proximo;
    Dispose(Cabeca);
    Cabeca := Seguinte;
  end;
end;
end.
