#pragma once
#include <cstddef>
#include <cstdint>
#include <stdexcept>
#include <string_view>

namespace desafios {
// Avança um ponto de código inteiro, inclusive quando ocupa quatro bytes.
inline char32_t proximoPonto(std::string_view texto, std::size_t& posicao) {
    const auto inicio = static_cast<unsigned char>(texto.at(posicao++));
    if (inicio < 0x80) return inicio;
    unsigned restantes;
    std::uint32_t ponto;
    std::uint32_t minimo;
    if (inicio >= 0xc2 && inicio <= 0xdf) {
        restantes = 1; ponto = inicio & 0x1f; minimo = 0x80;
    } else if (inicio >= 0xe0 && inicio <= 0xef) {
        restantes = 2; ponto = inicio & 0x0f; minimo = 0x800;
    } else if (inicio >= 0xf0 && inicio <= 0xf4) {
        restantes = 3; ponto = inicio & 0x07; minimo = 0x10000;
    } else throw std::invalid_argument("UTF-8 inválido");
    while (restantes-- > 0) {
        if (posicao == texto.size()) throw std::invalid_argument("UTF-8 incompleto");
        const auto byte = static_cast<unsigned char>(texto[posicao++]);
        if ((byte & 0xc0) != 0x80) throw std::invalid_argument("UTF-8 inválido");
        ponto = (ponto << 6) | (byte & 0x3f);
    }
    // Exclui formas excessivamente longas, substitutos UTF-16 e valores fora do Unicode.
    if (ponto < minimo || ponto > 0x10ffff || (ponto >= 0xd800 && ponto <= 0xdfff))
        throw std::invalid_argument("Ponto Unicode inválido");
    return static_cast<char32_t>(ponto);
}
}
