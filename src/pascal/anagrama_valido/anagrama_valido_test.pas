unit anagrama_valido_test;
{$mode objfpc}{$H+}{$codepage utf8}
interface
procedure TestarAnagrama;
implementation
uses fpjson, jsonparser, tipos, teste_apoio, anagrama, unicode;
procedure TestarAnagrama;
const Letras: array[0..8] of UTF8String = ('a', 'b', 'A', 'é', '😀', ' ', '́', '𐐀', '中');
var Casos: TJSONArray; C: TJSONObject; A, B, Inverso, Trecho: UTF8String;
    PA, PB: TInteiros; I, T, J: Integer; P: SizeInt; Escapados: TJSONData;
begin
  Casos := AbrirCasos('anagrama_valido');
  try
    for I := 0 to Casos.Count - 1 do
    begin C := Caso(Casos, I); Conferir(AnagramaValido(C.FindPath('input.primeiro').AsString, C.FindPath('input.segundo').AsString) = C.Find('expected').AsBoolean, 'JSON'); end;
  finally Casos.Free; end;
  Contexto := 'anagrama: RTL Unicode e ordenação de pontos';
  for T := 1 to 300 do
  begin
    A := ''; B := ''; Inverso := '';
    for J := 1 to Aleatorio(15) do
    begin Trecho := Letras[Aleatorio(9)]; A := A + Trecho; Inverso := Trecho + Inverso; end;
    for J := 1 to Aleatorio(15) do B := B + Letras[Aleatorio(9)];
    PA := PontosReferencia(A); PB := PontosReferencia(B); Ordenar(PA); Ordenar(PB);
    Conferir(AnagramaValido(A, B) = Iguais(PA, PB), 'referência');
    Conferir(AnagramaValido(A, Inverso), 'permutação positiva');
  end;
  Conferir(AnagramaValido('á', '́a'), 'pontos iguais com grafemas diferentes');
  Conferir(not AnagramaValido('é', 'é'), 'não normalizar');
  Conferir(AnagramaValido(#0'a', 'a'#0), 'NUL não termina string Pascal');
  Conferir(not AnagramaValido('¢¢', 'a€'), 'mesmo tamanho em bytes, pontos diferentes');
  A := UTF8String(#0#1#127'¢€😀') + UTF8Encode(UnicodeString(WideChar($DBFF)) + UnicodeString(WideChar($DFFF)));
  PA := PontosReferencia(A); PB := nil; SetLength(PB, Length(PA)); P := 1;
  for I := 0 to High(PB) do PB[I] := ProximoPonto(A, P);
  Conferir(Iguais(PA, PB), 'limites de 1 a 4 bytes e U+10FFFF contra RTL');
  Escapados := GetJSON('["\ud83d\ude00", "\u00e9", "\u0065\u0301"]', True);
  try
    Conferir(Iguais(PontosReferencia(Escapados.Items[0].AsString), TInteiros.Create($1F600)), 'par substituto JSON');
    Conferir(not AnagramaValido(Escapados.Items[1].AsString, Escapados.Items[2].AsString), 'JSON sem normalização');
  finally Escapados.Free; end;
  A := ''; B := '';
  // Mil símbolos distintos exercitam redimensionamento e colisões do mapa.
  for I := $400 to $7E7 do
  begin Trecho := UTF8Encode(UnicodeString(WideChar(I))); A := A + Trecho; B := Trecho + B; end;
  Conferir(AnagramaValido(A, B), 'muitos pontos distintos');
  A := ''; for I := 1 to 10000 do A := A + UTF8String('😀');
  Conferir(AnagramaValido(A, A), 'texto longo com pontos suplementares');
end;
end.
