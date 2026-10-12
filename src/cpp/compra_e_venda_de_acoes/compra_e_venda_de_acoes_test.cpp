#include "compra_e_venda_de_acoes.hpp"
#include "../_tests/testes.hpp"

namespace testes {
static std::int64_t referencia(const Numeros& precos) {
    std::int64_t melhor = 0;
    for (std::size_t compra = 0; compra < precos.size(); ++compra)
        for (std::size_t venda = compra + 1; venda < precos.size(); ++venda)
            melhor = std::max(melhor, precos[venda] - precos[compra]);
    return melhor;
}
void maiorLucro() {
    for (const auto& caso : casos("compra_e_venda_de_acoes"))
        exigir(desafios::maiorLucro(caso.at("input").at("precos").get<Numeros>()) == caso.at("expected").get<std::int64_t>(), caso.at("name"));
    contexto = "ações: enumera compras e vendas posteriores";
    std::mt19937 gerador(84);
    for (int rodada = 0; rodada < 500; ++rodada) {
        auto valores = numerosAleatorios(gerador, 0, 1000000);
        const auto copia = valores;
        exigir(desafios::maiorLucro(valores) == referencia(valores), "melhor operação");
        exigir(valores == copia, "preços preservados");
    }
    Numeros longa(10000, 1000000);
    longa.front() = 0;
    exigir(desafios::maiorLucro(longa) == 1000000, "limites do contrato");
}
}
