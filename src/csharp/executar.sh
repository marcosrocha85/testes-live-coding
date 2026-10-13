#!/bin/sh
set -eu
cd "$(dirname "$0")"
export DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1
test "$(dotnet --version)" = "10.0.100"
dotnet restore LiveCoding.slnx --locked-mode

exemplos() {
    dotnet build _examples/Exemplos.csproj --no-restore --configuration Release
    if [ -n "${1:-}" ]; then
        dotnet _examples/bin/Release/net10.0/Exemplos.dll "$1"
    else
        for desafio in soma_de_dois parenteses_validos inverter_lista_ligada busca_binaria \
            mesclar_listas_ordenadas compra_e_venda_de_acoes subarray_maximo subir_escadas \
            anagrama_valido ciclo_em_lista_ligada; do
            dotnet _examples/bin/Release/net10.0/Exemplos.dll "$desafio"
        done
    fi
}

case "${1:-check}" in
    check)
        dotnet format LiveCoding.slnx --no-restore --verify-no-changes
        dotnet build LiveCoding.slnx --no-restore --configuration Debug
        dotnet test _tests/Testes.csproj --no-build --no-restore --configuration Debug
        dotnet build LiveCoding.slnx --no-restore --configuration Release
        dotnet test _tests/Testes.csproj --no-build --no-restore --configuration Release
        exemplos
        ;;
    testes)
        if [ -n "${2:-}" ]; then
            case "$2" in
                SomaDeDoisTest|ParentesesValidosTest|InverterListaLigadaTest|BuscaBinariaTest|\
                MesclarListasOrdenadasTest|CompraEVendaDeAcoesTest|SubarrayMaximoTest|\
                SubirEscadasTest|AnagramaValidoTest|CicloEmListaLigadaTest) ;;
                *) printf 'Classe de teste inválida.\n' >&2; exit 2 ;;
            esac
            dotnet test _tests/Testes.csproj --no-restore --filter "FullyQualifiedName~LiveCoding.Testes.$2"
        else
            dotnet test _tests/Testes.csproj --no-restore
        fi
        ;;
    exemplo)
        exemplos "${2:-soma_de_dois}"
        ;;
    *)
        printf 'Use check, testes [ClasseTest] ou exemplo [desafio].\n' >&2
        exit 2
        ;;
esac
