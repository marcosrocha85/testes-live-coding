unit busca;
{$mode objfpc}{$H+}

interface
function BuscaBinaria(const Numeros: array of Int64; Alvo: Int64): SizeInt;

implementation
function BuscaBinaria(const Numeros: array of Int64; Alvo: Int64): SizeInt;
var Esquerda, Direita, Meio: SizeInt;
begin
  Esquerda := 0;
  Direita := High(Numeros);
  while Esquerda <= Direita do
  begin
    Meio := Esquerda + (Direita - Esquerda) div 2;
    if Numeros[Meio] = Alvo then Exit(Meio);
    // O array já está ordenado: a metade descartada não pode conter o alvo.
    if Numeros[Meio] < Alvo then Esquerda := Meio + 1 else Direita := Meio - 1;
  end;
  Result := -1;
end;
end.
