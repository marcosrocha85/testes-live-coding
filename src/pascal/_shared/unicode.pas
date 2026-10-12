unit unicode;
{$mode objfpc}{$H+}

interface
function ProximoPonto(const Texto: UTF8String; var Posicao: SizeInt): Cardinal;

implementation
function ProximoPonto(const Texto: UTF8String; var Posicao: SizeInt): Cardinal;
var Primeiro: Byte; Restantes, I: SizeInt;
begin
  // O contrato exige UTF-8 bem formado. Posicao começa em 1, não em 0.
  Primeiro := Ord(Texto[Posicao]);
  Inc(Posicao);
  if Primeiro < $80 then Exit(Primeiro);
  if Primeiro < $E0 then
  begin Result := Primeiro and $1F; Restantes := 1; end
  else if Primeiro < $F0 then
  begin Result := Primeiro and $0F; Restantes := 2; end
  else
  begin Result := Primeiro and $07; Restantes := 3; end;
  for I := 1 to Restantes do
  begin
    Result := (Result shl 6) or (Ord(Texto[Posicao]) and $3F);
    Inc(Posicao);
  end;
end;
end.
