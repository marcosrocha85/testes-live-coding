#include "mesclar_listas_ordenadas.hpp"
#include "../_tests/testes.hpp"

namespace testes {
static Numeros conferir(const Numeros& a, const Numeros& b) {
    Lista primeira(a), segunda(b);
    auto ordem = primeira.nos;
    ordem.insert(ordem.end(), segunda.nos.begin(), segunda.nos.end());
    // Ordenação estável independente da mesclagem: preserva a origem em empates.
    std::stable_sort(ordem.begin(), ordem.end(), [](const auto* x, const auto* y) { return x->valor < y->valor; });
    Numeros esperado;
    for (const auto* no : ordem) esperado.push_back(no->valor);
    conferirLista(desafios::mesclarListasOrdenadas(primeira.cabeca(), segunda.cabeca()), ordem, esperado);
    return esperado;
}
void mesclarListasOrdenadas() {
    for (const auto& caso : casos("mesclar_listas_ordenadas"))
        exigir(conferir(caso.at("input").at("primeira").get<Numeros>(), caso.at("input").at("segunda").get<Numeros>()) == caso.at("expected").get<Numeros>(), "caso JSON");
    contexto = "mesclagem: estabilidade e identidade";
    std::mt19937 gerador(83);
    for (int rodada = 0; rodada < 250; ++rodada) {
        auto a = numerosAleatorios(gerador), b = numerosAleatorios(gerador);
        std::sort(a.begin(), a.end()); std::sort(b.begin(), b.end());
        conferir(a, b);
    }
    conferir(Numeros(5000, 7), Numeros(5000, 7));
    Numeros a(5000), b(5000);
    for (std::size_t i = 0; i < a.size(); ++i) {
        a[i] = static_cast<std::int64_t>(i) * 2;
        b[i] = a[i] + 1;
    }
    conferir(a, b);
}
}
