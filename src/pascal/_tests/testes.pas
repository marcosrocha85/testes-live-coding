program Testes;
{$mode objfpc}{$H+}
uses heaptrc, fpwidestring, SysUtils, teste_apoio,
  soma_de_dois_test, parenteses_validos_test, inverter_lista_ligada_test,
  busca_binaria_test, mesclar_listas_ordenadas_test, compra_e_venda_de_acoes_test,
  subarray_maximo_test, subir_escadas_test, anagrama_valido_test, ciclo_em_lista_ligada_test;
var Filtro: string; Executados: Integer = 0;
procedure Rodar(const ID: string; Teste: TProcedure);
var Antes: Int64;
begin
  if (Filtro <> '') and (Filtro <> ID) then Exit;
  Antes := Verificacoes;
  Teste(); Inc(Executados);
  WriteLn('OK ', ID, ': ', Verificacoes - Antes, ' verificações');
end;
begin
  HaltOnNotReleased := True;
  Filtro := ParamStr(1);
  Rodar('soma_de_dois', @TestarSomaDeDois);
  Rodar('parenteses_validos', @TestarParenteses);
  Rodar('inverter_lista_ligada', @TestarInversao);
  Rodar('busca_binaria', @TestarBusca);
  Rodar('mesclar_listas_ordenadas', @TestarMescla);
  Rodar('compra_e_venda_de_acoes', @TestarAcoes);
  Rodar('subarray_maximo', @TestarSubarray);
  Rodar('subir_escadas', @TestarEscadas);
  Rodar('anagrama_valido', @TestarAnagrama);
  Rodar('ciclo_em_lista_ligada', @TestarCiclo);
  if Executados = 0 then raise Exception.Create('Desafio desconhecido: ' + Filtro);
  WriteLn('PASSOU: ', Executados, ' desafios, ', CasosJSON, ' casos JSON, ', Verificacoes, ' verificações.');
end.
