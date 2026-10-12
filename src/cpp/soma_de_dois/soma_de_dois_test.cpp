#include "soma_de_dois.hpp"
#include "../_tests/testes.hpp"

namespace testes {
// Enumera pares em ordem do segundo índice, sem usar mapa nem complementos.
static auto referencia(const Numeros& valores, std::int64_t alvo) -> std::optional<std::array<std::size_t, 2>> {
    for (std::size_t j = 0; j < valores.size(); ++j)
        for (std::size_t i = 0; i < j; ++i)
            if (valores[i] + valores[j] == alvo) return std::array{i, j};
    return std::nullopt;
}
void somaDeDois() {
    for (const auto& caso : casos("soma_de_dois")) {
        contexto = caso.at("name").get<std::string>();
        const auto valores = caso.at("input").at("numeros").get<Numeros>();
        std::optional<std::array<std::size_t, 2>> esperado;
        if (!caso.at("expected").is_null()) esperado = caso.at("expected").get<std::array<std::size_t, 2>>();
        exigir(desafios::somaDeDois(valores, caso.at("input").at("alvo").get<std::int64_t>()) == esperado, "caso JSON");
    }
    contexto = "soma: enumeração independente e entrada preservada";
    std::mt19937 gerador(79);
    for (int rodada = 0; rodada < 500; ++rodada) {
        auto valores = numerosAleatorios(gerador);
        const auto copia = valores;
        const auto alvo = std::uniform_int_distribution<int>(-40, 40)(gerador);
        exigir(desafios::somaDeDois(valores, alvo) == referencia(valores, alvo), "ordem e resultado");
        exigir(valores == copia, "sem mutação do array");
    }
    Numeros longa(10000, -1000000);
    longa.back() = 1000000;
    exigir(desafios::somaDeDois(longa, 0) == std::optional(std::array<std::size_t, 2>{0, 9999}), "limite de tamanho e valores");
}
}
