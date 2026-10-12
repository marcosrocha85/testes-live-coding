#include "testes.hpp"
#include <array>
#include <string_view>

int main(int argc, char** argv) {
    using Teste = std::pair<std::string_view, void(*)()>;
    const std::array<Teste, 10> suites{{
        {"soma_de_dois", testes::somaDeDois}, {"parenteses_validos", testes::parentesesValidos},
        {"inverter_lista_ligada", testes::inverterListaLigada}, {"busca_binaria", testes::buscaBinaria},
        {"mesclar_listas_ordenadas", testes::mesclarListasOrdenadas}, {"compra_e_venda_de_acoes", testes::maiorLucro},
        {"subarray_maximo", testes::subarrayMaximo}, {"subir_escadas", testes::subirEscadas},
        {"anagrama_valido", testes::anagramaValido}, {"ciclo_em_lista_ligada", testes::temCiclo}
    }};
    try {
        std::size_t executadas = 0;
        for (const auto& [id, testar] : suites) {
            if (argc > 1 && std::string_view(argv[1]) != id) continue;
            testes::contexto = id;
            testar();
            ++executadas;
            std::cout << "OK " << id << '\n';
        }
        if (executadas == 0) throw std::invalid_argument("ID de desafio inválido");
        std::cout << executadas << " desafios; " << testes::casosJson << " casos JSON; "
                  << testes::verificacoes << " verificações.\n";
    } catch (const std::exception& erro) {
        std::cerr << erro.what() << '\n';
        return 1;
    }
}
