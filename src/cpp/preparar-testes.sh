#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
destino=src/cpp/build/deps/nlohmann/json.hpp
mkdir -p "$(dirname "$destino")"
if ! sha256sum --check --status src/cpp/json.sha256 2>/dev/null; then
  curl --fail --location --silent --show-error --retry 3 \
    https://raw.githubusercontent.com/nlohmann/json/v3.12.0/single_include/nlohmann/json.hpp \
    --output "$destino"
fi
sha256sum --check src/cpp/json.sha256
