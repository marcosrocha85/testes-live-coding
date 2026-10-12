#!/bin/sh
set -eu
cd "$(dirname "$0")"
test "$(rustc --version | cut -d ' ' -f 2)" = "1.92.0"

exemplos() {
    cargo build --locked --bin exemplos
    if [ -n "${1:-}" ]; then
        ./target/debug/exemplos "$1"
    else
        for desafio in soma_de_dois parenteses_validos inverter_lista_ligada busca_binaria \
            mesclar_listas_ordenadas compra_e_venda_de_acoes subarray_maximo subir_escadas \
            anagrama_valido ciclo_em_lista_ligada; do
            ./target/debug/exemplos "$desafio"
        done
    fi
}

case "${1:-check}" in
    check)
        cargo fmt --all -- --check
        cargo clippy --locked --all-targets -- -D warnings
        cargo test --locked
        # A versão otimizada também mantém verificações de overflow.
        cargo test --locked --release
        exemplos
        ;;
    testes)
        cargo test --locked --lib "${2:-}"
        ;;
    exemplo)
        exemplos "${2:-soma_de_dois}"
        ;;
    *)
        printf 'Use check, testes [desafio] ou exemplo [desafio].\n' >&2
        exit 1
        ;;
esac
