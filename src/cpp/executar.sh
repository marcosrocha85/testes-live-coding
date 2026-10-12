#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
export ASAN_OPTIONS=detect_leaks=1:halt_on_error=1
export UBSAN_OPTIONS=halt_on_error=1:print_stacktrace=1
sh src/cpp/compilar.sh
case "${1:-check}" in
  testes) src/cpp/build/testes ${2:+"$2"} ;;
  exemplo) src/cpp/build/exemplos "${2:-soma_de_dois}" ;;
  check)
    src/cpp/build/testes
    for id in soma_de_dois parenteses_validos inverter_lista_ligada busca_binaria mesclar_listas_ordenadas compra_e_venda_de_acoes subarray_maximo subir_escadas anagrama_valido ciclo_em_lista_ligada; do
      src/cpp/build/exemplos "$id"
    done
    ;;
  *) echo 'Use testes [desafio], exemplo [desafio] ou check.' >&2; exit 1 ;;
esac
