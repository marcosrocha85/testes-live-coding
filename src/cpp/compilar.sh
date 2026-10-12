#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
compilador=${CXX:-g++}
if [ "$("$compilador" -dumpfullversion)" != '15.2.0' ]; then
  echo 'Este microprojeto fixa GCC 15.2.0. Prefira o serviço Docker cpp.' >&2
  exit 1
fi
sh src/cpp/preparar-testes.sh
# Sanitizadores detectam acessos inválidos, uso de memória liberada e overflow.
# -fno-pie/-no-pie evita colisões do mapa de memória do ASan em containers Linux.
flags='-std=c++20 -O1 -g -Wall -Wextra -Wpedantic -Werror -D_GLIBCXX_ASSERTIONS -fsanitize=address,undefined -fno-omit-frame-pointer -fno-pie -no-pie'
set --
for id in soma_de_dois parenteses_validos inverter_lista_ligada busca_binaria mesclar_listas_ordenadas compra_e_venda_de_acoes subarray_maximo subir_escadas anagrama_valido ciclo_em_lista_ligada; do
  set -- "$@" "src/cpp/$id/$id.cpp"
done
"$compilador" $flags -isystem src/cpp/build/deps \
  src/cpp/*/*_test.cpp src/cpp/_tests/main.cpp "$@" \
  -o src/cpp/build/testes
"$compilador" $flags src/cpp/_examples/main.cpp "$@" \
  -o src/cpp/build/exemplos
