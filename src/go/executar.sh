#!/bin/sh
set -eu
cd "$(dirname "$0")"
export GOTOOLCHAIN=local GOPROXY=off
test "$(go env GOVERSION)" = "go1.27.2"

exemplos() {
    mkdir -p build
    go build -o build/exemplos ./cmd/exemplos
    if [ -n "${1:-}" ]; then
        ./build/exemplos "$1"
    else
        for desafio in soma_de_dois parenteses_validos inverter_lista_ligada busca_binaria \
            mesclar_listas_ordenadas compra_e_venda_de_acoes subarray_maximo subir_escadas \
            anagrama_valido ciclo_em_lista_ligada; do
            ./build/exemplos "$desafio"
        done
    fi
}

case "${1:-check}" in
    check)
        arquivos=$(gofmt -l .)
        if [ -n "$arquivos" ]; then
            printf 'Execute gofmt nestes arquivos:\n%s\n' "$arquivos" >&2
            exit 1
        fi
        go vet ./...
        go test -race -count=1 ./...
        # Uma segunda arquitetura comprova que somas não dependem de int de 64 bits.
        GOARCH=386 CGO_ENABLED=0 go test -count=1 ./...
        exemplos
        ;;
    testes)
        go test -race -count=1 "./${2:-...}"
        ;;
    exemplo)
        exemplos "${2:-soma_de_dois}"
        ;;
    *)
        printf 'Use check, testes [desafio] ou exemplo [desafio].\n' >&2
        exit 1
        ;;
esac
