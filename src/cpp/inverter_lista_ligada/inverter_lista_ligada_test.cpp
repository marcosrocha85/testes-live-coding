#include "inverter_lista_ligada.hpp"
#include "../_tests/testes.hpp"

namespace testes {
static void conferir(const Numeros& valores) {
    Lista lista(valores);
    auto ordem = lista.nos;
    std::reverse(ordem.begin(), ordem.end());
    auto esperado = valores;
    std::reverse(esperado.begin(), esperado.end());
    auto* resultado = desafios::inverterListaLigada(lista.cabeca());
    conferirLista(resultado, ordem, esperado);
    // Uma segunda inversão deve recuperar todos os ponteiros originais.
    conferirLista(desafios::inverterListaLigada(resultado), lista.nos, valores);
}
void inverterListaLigada() {
    for (const auto& caso : casos("inverter_lista_ligada")) {
        const auto valores = caso.at("input").at("valores").get<Numeros>();
        Lista lista(valores);
        auto ordem = lista.nos;
        std::reverse(ordem.begin(), ordem.end());
        conferirLista(desafios::inverterListaLigada(lista.cabeca()), ordem, caso.at("expected").get<Numeros>());
    }
    contexto = "inversão: identidade, ligações e ida e volta";
    std::mt19937 gerador(81);
    for (int rodada = 0; rodada < 250; ++rodada) conferir(numerosAleatorios(gerador));
    conferir(Numeros(10000, 1000000));
}
}
