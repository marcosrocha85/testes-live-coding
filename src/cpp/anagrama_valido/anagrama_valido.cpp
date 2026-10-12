#include "anagrama_valido.hpp"
#include "../_shared/unicode.hpp"
#include <unordered_map>

namespace desafios {
bool anagramaValido(std::string_view primeiro, std::string_view segundo) {
    std::unordered_map<char32_t, std::int64_t> contagens;
    std::size_t posicao = 0;
    while (posicao < primeiro.size()) ++contagens[proximoPonto(primeiro, posicao)];
    posicao = 0;
    while (posicao < segundo.size()) {
        const auto ponto = proximoPonto(segundo, posicao);
        const auto encontrado = contagens.find(ponto);
        if (encontrado == contagens.end()) return false;
        if (--encontrado->second == 0) contagens.erase(encontrado);
    }
    // Bytes e grafemas não substituem pontos de código; não há normalização.
    return contagens.empty();
}
}
