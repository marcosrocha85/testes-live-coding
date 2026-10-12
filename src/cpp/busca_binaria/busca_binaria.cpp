#include "busca_binaria.hpp"

namespace desafios {
std::ptrdiff_t buscaBinaria(std::span<const std::int64_t> numeros, std::int64_t alvo) {
    // O limite direito fica fora do intervalo: até o array vazio é representável.
    std::size_t esquerda = 0;
    std::size_t direita = numeros.size();
    while (esquerda < direita) {
        const auto meio = esquerda + (direita - esquerda) / 2;
        if (numeros[meio] == alvo) return static_cast<std::ptrdiff_t>(meio);
        if (numeros[meio] < alvo) esquerda = meio + 1;
        else direita = meio;
    }
    return -1;
}
}
