#include "busca_binaria.hpp"
#include "../_tests/testes.hpp"

namespace testes {
static void conferir(const Numeros& valores, std::int64_t alvo) {
    const auto copia = valores;
    const auto indice = desafios::buscaBinaria(valores, alvo);
    const auto presente = std::find(valores.begin(), valores.end(), alvo) != valores.end();
    exigir((indice >= 0) == presente, "referência por busca linear");
    if (presente) {
        exigir(static_cast<std::size_t>(indice) < valores.size(), "índice dentro dos limites");
        exigir(valores[static_cast<std::size_t>(indice)] == alvo, "qualquer duplicata correta");
    } else exigir(indice == -1, "sentinela de ausência");
    exigir(valores == copia, "entrada preservada");
}
void buscaBinaria() {
    for (const auto& caso : casos("busca_binaria")) {
        const auto valores = caso.at("input").at("numeros").get<Numeros>();
        const auto alvo = caso.at("input").at("alvo").get<std::int64_t>();
        const auto indice = desafios::buscaBinaria(valores, alvo);
        if (caso.contains("expectedIndices")) {
            const auto aceitos = caso.at("expectedIndices").get<std::vector<std::ptrdiff_t>>();
            exigir(std::find(aceitos.begin(), aceitos.end(), indice) != aceitos.end(), "índice permitido no JSON");
        } else exigir(indice == caso.at("expected").get<std::ptrdiff_t>(), "caso JSON");
    }
    contexto = "busca: referência linear e duplicatas";
    std::mt19937 gerador(82);
    for (int rodada = 0; rodada < 500; ++rodada) {
        auto valores = numerosAleatorios(gerador);
        std::sort(valores.begin(), valores.end());
        conferir(valores, std::uniform_int_distribution<int>(-25, 25)(gerador));
    }
    Numeros longa(10000);
    for (std::size_t i = 0; i < longa.size(); ++i) longa[i] = static_cast<std::int64_t>(i) * 2;
    conferir(longa, 0); conferir(longa, 19998); conferir(longa, 19999);
}
}
