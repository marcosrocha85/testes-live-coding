#include "soma_de_dois.hpp"
#include <unordered_map>

namespace desafios {
std::optional<std::array<std::size_t, 2>> somaDeDois(std::span<const std::int64_t> numeros, std::int64_t alvo) {
    std::unordered_map<std::int64_t, std::size_t> vistos;
    for (std::size_t atual = 0; atual < numeros.size(); ++atual) {
        const auto encontrado = vistos.find(alvo - numeros[atual]);
        if (encontrado != vistos.end()) return std::array{encontrado->second, atual};
        // Consultar antes de inserir evita usar a mesma posição duas vezes.
        vistos.try_emplace(numeros[atual], atual); // Conserva o primeiro índice.
    }
    return std::nullopt;
}
}
