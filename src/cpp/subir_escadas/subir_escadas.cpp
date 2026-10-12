#include "subir_escadas.hpp"
#include <cmath>
#include <stdexcept>

namespace desafios {
std::int64_t subirEscadas(double degraus) {
    if (!std::isfinite(degraus) || degraus < 0 || degraus > 77 || std::trunc(degraus) != degraus)
        throw std::invalid_argument("Degraus devem ser inteiros entre 0 e 77");
    // Somente a entrada usa double; todas as contagens permanecem inteiras.
    std::int64_t anterior = 1;
    std::int64_t atual = 1;
    for (int passo = 2; passo <= static_cast<int>(degraus); ++passo) {
        const auto seguinte = anterior + atual;
        anterior = atual;
        atual = seguinte;
    }
    return atual;
}
}
