#include "ciclo_em_lista_ligada.hpp"

namespace desafios {
bool temCiclo(const No* cabeca) {
    const No* lento = cabeca;
    const No* rapido = cabeca;
    while (rapido != nullptr && rapido->proximo != nullptr) {
        lento = lento->proximo;
        rapido = rapido->proximo->proximo;
        if (lento == rapido) return true; // Compara endereços, não valores.
    }
    return false;
}
}
