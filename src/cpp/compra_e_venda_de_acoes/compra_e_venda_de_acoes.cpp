#include "compra_e_venda_de_acoes.hpp"
#include <algorithm>

namespace desafios {
std::int64_t maiorLucro(std::span<const std::int64_t> precos) {
    if (precos.empty()) return 0;
    auto menor = precos.front();
    std::int64_t lucro = 0;
    for (std::size_t dia = 1; dia < precos.size(); ++dia) {
        // O menor preço pertence a um dia anterior à venda.
        lucro = std::max(lucro, precos[dia] - menor);
        menor = std::min(menor, precos[dia]);
    }
    return lucro;
}
}
