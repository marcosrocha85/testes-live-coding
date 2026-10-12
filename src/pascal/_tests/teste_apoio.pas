unit teste_apoio;
{$mode objfpc}{$H+}{$codepage utf8}

interface
uses SysUtils, fpjson, tipos, no;
type TNos = array of PNo;
var Contexto: UTF8String = ''; Verificacoes: Int64 = 0; CasosJSON: Integer = 0;
procedure Conferir(Condicao: Boolean; const Mensagem: UTF8String);
function AbrirCasos(const Desafio: string): TJSONArray;
function Caso(Casos: TJSONArray; I: Integer): TJSONObject;
function Inteiros(Dados: TJSONData): TInteiros;
function Iguais(const A, B: array of Int64): Boolean;
procedure Ordenar(var A: TInteiros);
function Aleatorio(Limite: Integer): Integer;
function NumerosAleatorios: TInteiros;
function Montar(const Valores: array of Int64): TNos;
function Cabeca(const Nos: TNos): PNo;
procedure LiberarNos(var Nos: TNos);
procedure ConferirLista(Inicio: PNo; const Nos: TNos; const Valores: array of Int64);
function MesclaReferencia(const A, B: TNos): TNos;
function PontosReferencia(const Texto: UTF8String): TInteiros;

implementation
uses Classes, jsonparser;
var Estado: Int64 = 20261012;
procedure Conferir(Condicao: Boolean; const Mensagem: UTF8String);
begin
  Inc(Verificacoes);
  if not Condicao then raise Exception.Create(Contexto + ': ' + Mensagem);
end;

function AbrirCasos(const Desafio: string): TJSONArray;
var Arquivo: TFileStream; Dados: TJSONData; Diretorio: string;
begin
  Diretorio := GetEnvironmentVariable('CASOS_DIR');
  if Diretorio = '' then Diretorio := 'docs/casos';
  Arquivo := TFileStream.Create(Diretorio + '/' + Desafio + '.json', fmOpenRead);
  try Dados := GetJSON(Arquivo, True); finally Arquivo.Free; end;
  if not (Dados is TJSONArray) then
  begin Dados.Free; raise Exception.Create('Os casos devem ser um array JSON.'); end;
  Result := TJSONArray(Dados);
  Conferir(Result.Count > 0, 'arquivo de casos vazio');
end;

function Caso(Casos: TJSONArray; I: Integer): TJSONObject;
begin
  Result := TJSONObject(Casos.Items[I]);
  Contexto := Result.Get('name', 'caso sem nome');
  Inc(CasosJSON);
end;

function Inteiros(Dados: TJSONData): TInteiros;
var I: Integer;
begin
  Result := nil;
  SetLength(Result, Dados.Count);
  for I := 0 to Dados.Count - 1 do Result[I] := Dados.Items[I].AsInt64;
end;

function Iguais(const A, B: array of Int64): Boolean;
var I: SizeInt;
begin
  if Length(A) <> Length(B) then Exit(False);
  for I := 0 to High(A) do if A[I] <> B[I] then Exit(False);
  Result := True;
end;

procedure Ordenar(var A: TInteiros);
var I, J: SizeInt; Valor: Int64;
begin
  // Ordenação simples somente para os pequenos oráculos de teste.
  for I := 1 to High(A) do
  begin
    Valor := A[I]; J := I;
    while (J > 0) and (A[J - 1] > Valor) do
    begin A[J] := A[J - 1]; Dec(J); end;
    A[J] := Valor;
  end;
end;

function Aleatorio(Limite: Integer): Integer;
begin
  Estado := (Estado * 48271) mod 2147483647;
  Result := Estado mod Limite;
end;

function NumerosAleatorios: TInteiros;
var I: SizeInt;
begin
  Result := nil;
  SetLength(Result, Aleatorio(16));
  for I := 0 to High(Result) do Result[I] := Aleatorio(21) - 10;
end;

function Montar(const Valores: array of Int64): TNos;
var I: SizeInt;
begin
  Result := nil;
  SetLength(Result, Length(Valores));
  for I := 0 to High(Valores) do
  begin
    Result[I] := NovoNo(Valores[I]);
    if I > 0 then Result[I - 1]^.Proximo := Result[I];
  end;
end;

function Cabeca(const Nos: TNos): PNo;
begin
  if Length(Nos) = 0 then Result := nil else Result := Nos[0];
end;

procedure LiberarNos(var Nos: TNos);
var N: PNo;
begin
  // A fixture guarda cada endereço uma vez; a limpeza independe de ciclos e mutação.
  for N in Nos do Dispose(N);
  Nos := nil;
end;

procedure ConferirLista(Inicio: PNo; const Nos: TNos; const Valores: array of Int64);
var I: SizeInt;
begin
  Conferir(Length(Nos) = Length(Valores), 'tamanho da referência');
  for I := 0 to High(Nos) do
  begin
    Conferir(Inicio = Nos[I], UTF8String('identidade e ordem do nó ') + UTF8String(IntToStr(I)));
    Conferir(Inicio <> nil, 'nó ausente');
    Conferir(Inicio^.Valor = Valores[I], 'valor do nó foi alterado');
    Inicio := Inicio^.Proximo;
  end;
  Conferir(Inicio = nil, 'cauda deve terminar em nil, sem nós extras nem ciclos');
end;

function MesclaReferencia(const A, B: TNos): TNos;
var I, J: SizeInt; N: PNo;
begin
  Result := Concat(A, B);
  // Ordenação estável por inserção: independente do laço de duas listas da solução.
  for I := 1 to High(Result) do
  begin
    N := Result[I]; J := I;
    while (J > 0) and (Result[J - 1]^.Valor > N^.Valor) do
    begin Result[J] := Result[J - 1]; Dec(J); end;
    Result[J] := N;
  end;
end;

function PontosReferencia(const Texto: UTF8String): TInteiros;
var U: UnicodeString; I, Total: SizeInt; C: Cardinal;
begin
  // A RTL decodifica UTF-8 para UTF-16; juntamos pares substitutos neste oráculo.
  U := UTF8Decode(Texto);
  Result := nil;
  SetLength(Result, Length(U));
  I := 1; Total := 0;
  while I <= Length(U) do
  begin
    C := Ord(U[I]); Inc(I);
    if (C >= $D800) and (C <= $DBFF) then
    begin C := $10000 + ((C - $D800) shl 10) + (Ord(U[I]) - $DC00); Inc(I); end;
    Result[Total] := C; Inc(Total);
  end;
  SetLength(Result, Total);
end;
end.
