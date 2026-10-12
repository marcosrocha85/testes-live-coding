#include "parenteses_validos.hpp"
#include <vector>

namespace desafios {
bool parentesesValidos(std::string_view texto) {
    std::vector<char> pilha;
    for (const char simbolo : texto) {
        if (simbolo == '(' || simbolo == '[' || simbolo == '{') {
            pilha.push_back(simbolo);
        } else {
            char abertura;
            switch (simbolo) {
                case ')': abertura = '('; break;
                case ']': abertura = '['; break;
                case '}': abertura = '{'; break;
                default: return false;
            }
            // Nunca acessa o topo de uma pilha vazia.
            if (pilha.empty() || pilha.back() != abertura) return false;
            pilha.pop_back();
        }
    }
    return pilha.empty();
}
}
