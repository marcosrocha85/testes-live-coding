#include "subarray_maximo.hpp"
#include "../_tests/testes.hpp"

namespace testes {
// Soma todos os intervalos não vazios, sem a recorrência de Kadane.
static std::optional<std::int64_t> referencia(const Numeros& valores) {
    std::optional<std::int64_t> melhor;
    for (std::size_t inicio = 0; inicio < valores.size(); ++inicio) {
        std::int64_t soma = 0;
        for (std::size_t fim = inicio; fim < valores.size(); ++fim) {
            soma += valores[fim];
            if (!melhor || soma > *melhor) melhor = soma;
        }
    }
    return melhor;
}
void subarrayMaximo() {
    for (const auto& caso : casos("subarray_maximo")) {
        std::optional<std::int64_t> esperado;
        if (!caso.at("expected").is_null()) esperado = caso.at("expected").get<std::int64_t>();
        exigir(desafios::subarrayMaximo(caso.at("input").at("numeros").get<Numeros>()) == esperado, caso.at("name"));
    }
    contexto = "subarray: enumera intervalos e confere inteiros de 64 bits";
    std::mt19937 gerador(85);
    for (int rodada = 0; rodada < 500; ++rodada) {
        auto valores = numerosAleatorios(gerador, -1000000, 1000000);
        const auto copia = valores;
        exigir(desafios::subarrayMaximo(valores) == referencia(valores), "melhor intervalo");
        exigir(valores == copia, "entrada preservada");
    }
    exigir(desafios::subarrayMaximo(Numeros(10000, 1000000)) == 10000000000LL, "soma positiva além de 32 bits");
    exigir(desafios::subarrayMaximo(Numeros(10000, -1000000)) == -1000000, "todos negativos");
    exigir(desafios::subarrayMaximo(Numeros(10000, 0)) == 0, "zero é resposta presente");
}
}
