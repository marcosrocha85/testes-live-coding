// swift-tools-version: 6.3
import PackageDescription

let desafios = [
    "soma_de_dois",
    "parenteses_validos",
    "inverter_lista_ligada",
    "busca_binaria",
    "mesclar_listas_ordenadas",
    "compra_e_venda_de_acoes",
    "subarray_maximo",
    "subir_escadas",
    "anagrama_valido",
    "ciclo_em_lista_ligada"
]
let nomes = [
    "SomaDeDois",
    "ParentesesValidos",
    "InverterListaLigada",
    "BuscaBinaria",
    "MesclarListasOrdenadas",
    "CompraEVendaDeAcoes",
    "SubarrayMaximo",
    "SubirEscadas",
    "AnagramaValido",
    "CicloEmListaLigada"
]

let readmes = desafios.map { $0 + "/README.md" }
let fontes: [String] = zip(desafios, nomes).map { desafio, nome in desafio + "/" + nome + ".swift" }
let testes: [String] = zip(desafios, nomes).map { desafio, nome in desafio + "/" + nome + "Test.swift" }

let package = Package(
    name: "TestesLiveCoding",
    products: [
        .library(name: "LiveCoding", targets: ["LiveCoding"]),
        .executable(name: "exemplo", targets: ["Exemplo"])
    ],
    targets: [
        .target(
            name: "LiveCoding", path: ".",
            exclude: ["_tests", "_examples", "Dockerfile", "README.md"]
                + readmes + testes,
            sources: ["_shared/No.swift"] + fontes,
            // Conversões de Double usam a biblioteca matemática do sistema no Linux.
            linkerSettings: [.linkedLibrary("m", .when(platforms: [.linux]))]
        ),
        .executableTarget(name: "Exemplo", dependencies: ["LiveCoding"], path: "_examples"),
        .testTarget(
            name: "LiveCodingTests", dependencies: ["LiveCoding"], path: ".",
            exclude: ["_shared", "_examples", "Dockerfile", "README.md"]
                + readmes + fontes,
            sources: ["_tests"] + testes
        )
    ]
)
