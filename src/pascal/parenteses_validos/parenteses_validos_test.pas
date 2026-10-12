unit parenteses_validos_test;
{$mode objfpc}{$H+}{$codepage utf8}
interface
procedure TestarParenteses;
implementation
uses SysUtils, fpjson, teste_apoio, parenteses;
procedure TestarParenteses;
const Alfabeto = '()[]{}x';
var Casos: TJSONArray; C: TJSONObject; Texto, Restante, Novo: UTF8String; I, T, J: Integer;
begin
  Casos := AbrirCasos('parenteses_validos');
  try
    for I := 0 to Casos.Count - 1 do
    begin C := Caso(Casos, I); Conferir(ParentesesValidos(C.FindPath('input.texto').AsString) = C.Find('expected').AsBoolean, 'JSON'); end;
  finally Casos.Free; end;
  Contexto := 'parênteses: remoção de pares adjacentes';
  for T := 1 to 500 do
  begin
    Texto := '';
    for J := 1 to Aleatorio(20) do Texto := Texto + Alfabeto[Aleatorio(7) + 1];
    Restante := Texto;
    repeat
      Novo := StringReplace(Restante, '()', '', [rfReplaceAll]);
      Novo := StringReplace(Novo, '[]', '', [rfReplaceAll]);
      Novo := StringReplace(Novo, '{}', '', [rfReplaceAll]);
      if Novo = Restante then Break;
      Restante := Novo;
    until False;
    Conferir(ParentesesValidos(Texto) = (Restante = ''), 'referência');
  end;
  Texto := StringOfChar('(', 10000) + StringOfChar(')', 10000);
  Conferir(ParentesesValidos(Texto), 'aninhamento longo');
  Conferir(not ParentesesValidos(Texto + ']'), 'fechamento extra');
  Conferir(not ParentesesValidos('😀'), 'caractere Unicode inválido');
end;
end.
