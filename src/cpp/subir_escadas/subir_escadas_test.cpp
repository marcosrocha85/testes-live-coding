#include "subir_escadas.hpp"
#include "../_tests/testes.hpp"
#include <array>
#include <limits>

namespace testes {
// C(n-k,k) conta sequências com k passos duplos. Pascal calcula as combinações,
// uma referência combinatória independente da recorrência de Fibonacci.
static std::int64_t referencia(int n) {
    std::array<std::array<std::int64_t, 39>, 78> combinacoes{};
    for (int linha = 0; linha <= n; ++linha) {
        combinacoes[linha][0] = 1;
        for (int coluna = 1; coluna <= std::min(linha, n / 2); ++coluna) {
            // Calcula apenas a região necessária; seus valores cabem em int64_t.
            if (coluna > n - linha) continue;
            combinacoes[linha][coluna] = combinacoes[linha - 1][coluna - 1] + combinacoes[linha - 1][coluna];
        }
    }
    std::int64_t soma = 0;
    for (int duplos = 0; duplos <= n / 2; ++duplos) soma += combinacoes[n - duplos][duplos];
    return soma;
}
static void rejeitar(double entrada) {
    bool rejeitada = false;
    try { static_cast<void>(desafios::subirEscadas(entrada)); }
    catch (const std::invalid_argument&) { rejeitada = true; }
    exigir(rejeitada, "rejeita entrada fora do domínio antes da conversão");
}
void subirEscadas() {
    for (const auto& caso : casos("subir_escadas")) {
        const auto entrada = caso.at("input").at("degraus").get<double>();
        if (caso.contains("error")) rejeitar(entrada);
        else exigir(desafios::subirEscadas(entrada) == caso.at("expected").get<std::int64_t>(), caso.at("name"));
    }
    contexto = "escadas: combinações independentes e exatidão";
    for (int n = 0; n <= 77; ++n) exigir(desafios::subirEscadas(n) == referencia(n), "contagem combinatória para " + std::to_string(n));
    exigir(desafios::subirEscadas(46) == 2971215073LL, "além de 32 bits com sinal");
    exigir(desafios::subirEscadas(77) == 8944394323791464LL, "maior resultado exato");
    for (const auto entrada : {std::numeric_limits<double>::quiet_NaN(), std::numeric_limits<double>::infinity(),
                              -std::numeric_limits<double>::infinity(), 77.5, -0.5, 1e100}) rejeitar(entrada);
}
}
