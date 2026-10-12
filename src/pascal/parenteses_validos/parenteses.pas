unit parenteses;
{$mode objfpc}{$H+}

interface
function ParentesesValidos(const Texto: UTF8String): Boolean;

implementation
function ParentesesValidos(const Texto: UTF8String): Boolean;
var Pilha: array of AnsiChar; Topo, I: SizeInt; Abertura: AnsiChar;
begin
  SetLength(Pilha, Length(Texto));
  Topo := 0;
  for I := 1 to Length(Texto) do
    case Texto[I] of
      '(', '[', '{': begin Pilha[Topo] := Texto[I]; Inc(Topo); end;
      ')', ']', '}':
        begin
          case Texto[I] of
            ')': Abertura := '(';
            ']': Abertura := '[';
            else Abertura := '{';
          end;
          if Topo = 0 then Exit(False);
          Dec(Topo);
          if Pilha[Topo] <> Abertura then Exit(False);
        end;
      // Os símbolos aceitos são ASCII; qualquer outro byte torna a entrada inválida.
      else Exit(False);
    end;
  Result := Topo = 0;
end;
end.
