#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
sh src/pascal/compilar.sh
case "${1:-testes}" in
  testes) src/pascal/build/testes "${2:-}" ;;
  exemplo) src/pascal/build/exemplos "${2:-soma_de_dois}" ;;
  check)
    src/pascal/build/testes
    for id in soma_de_dois parenteses_validos inverter_lista_ligada busca_binaria mesclar_listas_ordenadas compra_e_venda_de_acoes subarray_maximo subir_escadas anagrama_valido ciclo_em_lista_ligada; do
      src/pascal/build/exemplos "$id"
    done
    ;;
  *) echo 'Use testes [desafio], exemplo [desafio] ou check.' >&2; exit 1 ;;
esac
