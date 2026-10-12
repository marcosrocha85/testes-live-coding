// Gerado por npm run docs. Consulte os READMEs dos desafios.
#include "../soma_de_dois/soma_de_dois.hpp"
#include "../parenteses_validos/parenteses_validos.hpp"
#include "../inverter_lista_ligada/inverter_lista_ligada.hpp"
#include "../busca_binaria/busca_binaria.hpp"
#include "../mesclar_listas_ordenadas/mesclar_listas_ordenadas.hpp"
#include "../compra_e_venda_de_acoes/compra_e_venda_de_acoes.hpp"
#include "../subarray_maximo/subarray_maximo.hpp"
#include "../subir_escadas/subir_escadas.hpp"
#include "../anagrama_valido/anagrama_valido.hpp"
#include "../ciclo_em_lista_ligada/ciclo_em_lista_ligada.hpp"
#include <array>
#include <iostream>
#include <stdexcept>
#include <string_view>

static void exigir(bool condicao) {
    if (!condicao) throw std::runtime_error("Resultado inesperado no exemplo");
}
int main(int argc, char** argv) {
    using namespace desafios;
    try {
        const std::string_view id = argc > 1 ? argv[1] : "soma_de_dois";
        std::cout << std::boolalpha;
        if (id == "soma_de_dois") {
            const std::array<std::int64_t, 4> numeros{2, 7, 11, 15};
            const auto par = somaDeDois(numeros, 9);
            exigir(par.has_value() && (*par)[0] == 0 && (*par)[1] == 1);
            std::cout << (*par)[0] << ' ' << (*par)[1] << '\n'; // 0 1
        }
        else if (id == "parenteses_validos") {
            exigir(parentesesValidos("{[()]}"));
            std::cout << parentesesValidos("{[()]}") << '\n'; // true
        }
        else if (id == "inverter_lista_ligada") {
            No terceiro{3};
            No segundo{2, &terceiro};
            No primeiro{1, &segundo};
            No* resultado = inverterListaLigada(&primeiro);
            exigir(resultado == &terceiro && terceiro.proximo == &segundo && primeiro.proximo == nullptr);
            std::cout << resultado->valor << '\n'; // 3; ligações: 3 → 2 → 1 → nullptr
            // Os três nós serão destruídos automaticamente ao sair deste escopo.
        }
        else if (id == "busca_binaria") {
            const std::array<std::int64_t, 5> numeros{1, 3, 5, 7, 9};
            exigir(buscaBinaria(numeros, 7) == 3);
            std::cout << buscaBinaria(numeros, 7) << '\n'; // 3
        }
        else if (id == "mesclar_listas_ordenadas") {
            No tres{3}, quatro{4};
            No um{1, &tres}, dois{2, &quatro};
            No* resultado = mesclarListasOrdenadas(&um, &dois);
            exigir(resultado == &um && um.proximo == &dois && dois.proximo == &tres && tres.proximo == &quatro);
            std::cout << resultado->valor << '\n'; // 1; ligações: 1 → 2 → 3 → 4 → nullptr
        }
        else if (id == "compra_e_venda_de_acoes") {
            const std::array<std::int64_t, 6> precos{7, 1, 5, 3, 6, 4};
            exigir(maiorLucro(precos) == 5);
            std::cout << maiorLucro(precos) << '\n'; // 5
        }
        else if (id == "subarray_maximo") {
            const std::array<std::int64_t, 9> numeros{-2, 1, -3, 4, -1, 2, 1, -5, 4};
            const auto soma = subarrayMaximo(numeros);
            exigir(soma.has_value() && *soma == 6);
            std::cout << *soma << '\n'; // 6
        }
        else if (id == "subir_escadas") {
            exigir(subirEscadas(5) == 8);
            std::cout << subirEscadas(5) << '\n'; // 8
        }
        else if (id == "anagrama_valido") {
            exigir(anagramaValido("😀a😀", "😀😀a"));
            std::cout << anagramaValido("😀a😀", "😀😀a") << '\n'; // true
        }
        else if (id == "ciclo_em_lista_ligada") {
            No primeiro{1}, segundo{2, &primeiro};
            primeiro.proximo = &segundo;
            exigir(temCiclo(&primeiro));
            std::cout << temCiclo(&primeiro) << '\n'; // true
            // As ligações não possuem os nós; o ciclo não interfere na destruição local.
        }
        else throw std::invalid_argument("ID de desafio inválido");
    } catch (const std::exception& erro) {
        std::cerr << erro.what() << '\n';
        return 1;
    }
}
