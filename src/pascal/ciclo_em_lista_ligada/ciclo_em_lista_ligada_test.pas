unit ciclo_em_lista_ligada_test;
{$mode objfpc}{$H+}
interface
procedure TestarCiclo;
implementation
uses fpjson, tipos, no, teste_apoio, ciclo;
function Referencia(Inicio: PNo): Boolean;
var Visitados: TNos; N: PNo;
begin
  Visitados := nil;
  while Inicio <> nil do
  begin
    for N in Visitados do if N = Inicio then Exit(True);
    SetLength(Visitados, Length(Visitados) + 1); Visitados[High(Visitados)] := Inicio;
    Inicio := Inicio^.Proximo;
  end;
  Result := False;
end;

procedure Verificar(const Valores: TInteiros; Indice: Integer; Esperado, UsarReferencia: Boolean);
var Nos, Antes: TNos; I: SizeInt;
begin
  Nos := Montar(Valores);
  try
    if (Indice >= 0) and (Length(Nos) > 0) then Nos[High(Nos)]^.Proximo := Nos[Indice];
    Antes := nil; SetLength(Antes, Length(Nos));
    for I := 0 to High(Nos) do Antes[I] := Nos[I]^.Proximo;
    if UsarReferencia then Conferir(Referencia(Cabeca(Nos)) = Esperado, 'referência por visitados');
    Conferir(TemCiclo(Cabeca(Nos)) = Esperado, 'detecção');
    for I := 0 to High(Nos) do
    begin Conferir(Nos[I]^.Proximo = Antes[I], 'ponteiro alterado'); Conferir(Nos[I]^.Valor = Valores[I], 'valor alterado'); end;
  finally LiberarNos(Nos); end;
end;

procedure TestarCiclo;
var Casos: TJSONArray; C: TJSONObject; A: TInteiros; I, N, Posicao: Integer;
begin
  Casos := AbrirCasos('ciclo_em_lista_ligada');
  try
    for I := 0 to Casos.Count - 1 do
    begin C := Caso(Casos, I); Verificar(Inteiros(C.FindPath('input.valores')), C.FindPath('input.indiceCiclo').AsInteger, C.Find('expected').AsBoolean, True); end;
  finally Casos.Free; end;
  Contexto := 'ciclo: todas as posições de retorno até 20 nós';
  for N := 0 to 20 do
  begin
    SetLength(A, N); for I := 0 to High(A) do A[I] := 7;
    for Posicao := -1 to N - 1 do Verificar(A, Posicao, Posicao >= 0, True);
  end;
  Contexto := 'ciclo: dez mil nós com valores repetidos';
  SetLength(A, 10000); for I := 0 to High(A) do A[I] := 1;
  Verificar(A, -1, False, False); Verificar(A, 0, True, False);
  Verificar(A, 9999, True, False); Verificar(A, 4321, True, False);
end;
end.
