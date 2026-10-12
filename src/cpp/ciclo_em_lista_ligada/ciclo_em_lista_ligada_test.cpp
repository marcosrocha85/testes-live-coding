#include "ciclo_em_lista_ligada.hpp"
#include "../_tests/testes.hpp"
#include <unordered_set>

namespace testes {
static bool referencia(const desafios::No* no) {
    std::unordered_set<const desafios::No*> visitados;
    while (no != nullptr) {
        if (!visitados.insert(no).second) return true;
        no = no->proximo;
    }
    return false;
}
static bool conferir(const Numeros& valores, int indiceCiclo) {
    Lista lista(valores);
    if (indiceCiclo >= 0) lista.nos.back()->proximo = lista.nos.at(static_cast<std::size_t>(indiceCiclo));
    std::vector<desafios::No*> seguintes;
    for (const auto* no : lista.nos) seguintes.push_back(no->proximo);
    const auto resultado = desafios::temCiclo(lista.cabeca());
    exigir(resultado == referencia(lista.cabeca()), "referência por endereços visitados");
    for (std::size_t i = 0; i < lista.nos.size(); ++i) {
        exigir(lista.nos[i]->proximo == seguintes[i], "Floyd preserva cada ligação");
        exigir(lista.nos[i]->valor == valores[i], "valores preservados");
    }
    return resultado;
}
void temCiclo() {
    for (const auto& caso : casos("ciclo_em_lista_ligada"))
        exigir(conferir(caso.at("input").at("valores").get<Numeros>(), caso.at("input").at("indiceCiclo").get<int>()) == caso.at("expected").get<bool>(), caso.at("name"));
    contexto = "ciclo: identidade e ausência de mutação";
    std::mt19937 gerador(88);
    for (int rodada = 0; rodada < 300; ++rodada) {
        const auto valores = numerosAleatorios(gerador, 1, 1);
        const auto indice = valores.empty() ? -1 : std::uniform_int_distribution<int>(-1, static_cast<int>(valores.size()) - 1)(gerador);
        conferir(valores, indice);
    }
    const Numeros longa(10000, 1);
    for (const auto indice : {-1, 0, 5000, 9999}) conferir(longa, indice);
}
}
