unit anagrama;
{$mode objfpc}{$H+}

interface
function AnagramaValido(const Primeiro, Segundo: UTF8String): Boolean;

implementation
uses mapa_inteiro, unicode;
function AnagramaValido(const Primeiro, Segundo: UTF8String): Boolean;
var Contagens: TMapaInteiro; P: SizeInt; Ponto: Cardinal; Quantidade, Saldo: Int64;
begin
  Contagens := TMapaInteiro.Create;
  Saldo := 0;
  try
    P := 1;
    while P <= Length(Primeiro) do
    begin
      Ponto := ProximoPonto(Primeiro, P);
      Contagens.Obter(Ponto, Quantidade);
      Contagens.Definir(Ponto, Quantidade + 1);
      Inc(Saldo);
    end;
    P := 1;
    while P <= Length(Segundo) do
    begin
      Ponto := ProximoPonto(Segundo, P);
      if not Contagens.Obter(Ponto, Quantidade) then Exit(False);
      if Quantidade = 0 then Exit(False);
      Contagens.Definir(Ponto, Quantidade - 1);
      Dec(Saldo);
    end;
    // Conta pontos completos, sem normalizar acentos nem comparar grafemas.
    Result := Saldo = 0;
  finally
    Contagens.Free;
  end;
end;
end.
