#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
test "$(fpc -iV)" = '3.2.2'
mkdir -p src/pascal/build
set -- -Fu"src/pascal/_shared" -Fu"src/pascal/_tests" -FU"src/pascal/build" -FE"src/pascal/build"
for pasta in src/pascal/*/; do set -- "$@" -Fu"$pasta"; done
# Avisos são erros; limites, overflow e vazamentos permanecem verificados.
fpc -B -O1 -gl -Cr -Co -Sew -vew "$@" src/pascal/_tests/testes.pas
fpc -B -O1 -gl -Cr -Co -Sew -vew "$@" src/pascal/_examples/exemplos.pas
