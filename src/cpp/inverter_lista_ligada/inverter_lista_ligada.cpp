#include "inverter_lista_ligada.hpp"

namespace desafios {
No* inverterListaLigada(No* cabeca) {
    No* anterior = nullptr;
    No* atual = cabeca;
    while (atual != nullptr) {
        No* seguinte = atual->proximo; // Guarda a ligação antes de alterá-la.
        atual->proximo = anterior;
        anterior = atual;
        atual = seguinte;
    }
    return anterior;
}
}
