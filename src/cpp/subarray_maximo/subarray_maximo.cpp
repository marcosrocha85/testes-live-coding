#include "subarray_maximo.hpp"
#include <algorithm>

namespace desafios {
std::optional<std::int64_t> subarrayMaximo(std::span<const std::int64_t> numeros) {
    if (numeros.empty()) return std::nullopt;
    auto atual = numeros.front(); // Não começa em zero: o trecho deve ser não vazio.
    auto melhor = atual;
    for (std::size_t i = 1; i < numeros.size(); ++i) {
        atual = std::max(numeros[i], atual + numeros[i]);
        melhor = std::max(melhor, atual);
    }
    return melhor;
}
}
