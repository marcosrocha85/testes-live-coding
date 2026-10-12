unit mapa_inteiro;
{$mode objfpc}{$H+}

interface
type
  TEntrada = record
    Ocupada: Boolean;
    Chave, Valor: Int64;
  end;
  TMapaInteiro = class
  private
    FEntradas: array of TEntrada;
    FQuantidade: SizeInt;
    function Posicao(Chave: Int64): SizeInt;
    procedure Crescer;
  public
    constructor Create;
    function Obter(Chave: Int64; out Valor: Int64): Boolean;
    procedure Definir(Chave, Valor: Int64);
  end;

implementation
constructor TMapaInteiro.Create;
begin
  inherited Create;
  SetLength(FEntradas, 16);
end;

function TMapaInteiro.Posicao(Chave: Int64): SizeInt;
var Hash: QWord;
begin
  // Chaves são os números do contrato ou pontos Unicode, nunca Int64 arbitrário.
  Hash := QWord(Chave + Int64(2147483648)) * QWord(2654435761);
  Hash := Hash xor (Hash shr 32);
  Result := SizeInt(Hash mod QWord(Length(FEntradas)));
  // Uma colisão procura a próxima casa. Pelo menos metade fica vazia.
  while FEntradas[Result].Ocupada and (FEntradas[Result].Chave <> Chave) do
    Result := (Result + 1) mod Length(FEntradas);
end;

function TMapaInteiro.Obter(Chave: Int64; out Valor: Int64): Boolean;
var P: SizeInt;
begin
  P := Posicao(Chave);
  Result := FEntradas[P].Ocupada;
  if Result then Valor := FEntradas[P].Valor else Valor := 0;
end;

procedure TMapaInteiro.Crescer;
var Antigas: array of TEntrada; Entrada: TEntrada;
begin
  Antigas := FEntradas;
  FEntradas := nil;
  SetLength(FEntradas, Length(Antigas) * 2);
  FQuantidade := 0;
  // A nova capacidade muda as posições; todas as chaves precisam ser recolocadas.
  for Entrada in Antigas do
    if Entrada.Ocupada then Definir(Entrada.Chave, Entrada.Valor);
end;

procedure TMapaInteiro.Definir(Chave, Valor: Int64);
var P: SizeInt;
begin
  P := Posicao(Chave);
  if not FEntradas[P].Ocupada then
  begin
    if FQuantidade >= Length(FEntradas) div 2 then
    begin
      Crescer;
      P := Posicao(Chave);
    end;
    FEntradas[P].Ocupada := True;
    FEntradas[P].Chave := Chave;
    Inc(FQuantidade);
  end;
  FEntradas[P].Valor := Valor;
end;
end.
