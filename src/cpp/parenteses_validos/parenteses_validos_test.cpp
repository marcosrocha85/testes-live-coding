#include "parenteses_validos.hpp"
#include "../_tests/testes.hpp"

namespace testes {
// Reduz pares vizinhos até não haver mudanças; não usa a pilha da solução.
static bool referencia(std::string texto) {
    if (texto.find_first_not_of("()[]{}") != std::string::npos) return false;
    bool mudou;
    do {
        mudou = false;
        for (const auto par : {"()", "[]", "{}"}) {
            const auto posicao = texto.find(par);
            if (posicao != std::string::npos) { texto.erase(posicao, 2); mudou = true; }
        }
    } while (mudou);
    return texto.empty();
}
void parentesesValidos() {
    for (const auto& caso : casos("parenteses_validos"))
        exigir(desafios::parentesesValidos(caso.at("input").at("texto").get<std::string>()) == caso.at("expected").get<bool>(), caso.at("name"));
    contexto = "parênteses: redução independente";
    std::mt19937 gerador(80);
    const std::string simbolos = "()[]{}a ";
    for (int rodada = 0; rodada < 1000; ++rodada) {
        std::string texto;
        const auto tamanho = std::uniform_int_distribution<int>(0, 30)(gerador);
        for (int i = 0; i < tamanho; ++i) texto += simbolos[gerador() % simbolos.size()];
        exigir(desafios::parentesesValidos(texto) == referencia(texto), "texto aleatório");
    }
    const auto longa = std::string(5000, '(') + std::string(5000, ')');
    exigir(desafios::parentesesValidos(longa), "pilha profunda sem recursão");
    exigir(!desafios::parentesesValidos("😀"), "rejeita símbolos Unicode fora do contrato");
    exigir(!desafios::parentesesValidos(std::string("()\0", 3)), "não ignora byte NUL");
}
}
