#include "mesclar_listas_ordenadas.hpp"

namespace desafios {
No* mesclarListasOrdenadas(No* primeira, No* segunda) {
    No sentinela{0}; // Facilita a primeira ligação; fica fora do resultado.
    No* cauda = &sentinela;
    while (primeira != nullptr && segunda != nullptr) {
        if (primeira->valor <= segunda->valor) { // Empates preferem a primeira lista.
            cauda->proximo = primeira;
            primeira = primeira->proximo;
        } else {
            cauda->proximo = segunda;
            segunda = segunda->proximo;
        }
        cauda = cauda->proximo;
    }
    cauda->proximo = primeira != nullptr ? primeira : segunda;
    return sentinela.proximo;
}
}
