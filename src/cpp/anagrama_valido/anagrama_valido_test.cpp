#include "anagrama_valido.hpp"
#include "../_tests/testes.hpp"
#include "../_shared/unicode.hpp"

namespace testes {
// A referência nasce de pontos conhecidos e ordenados. Este codificador faz
// o caminho inverso do leitor UTF-8 da solução, sem chamá-lo para obter o esperado.
static std::string codificar(const std::vector<char32_t>& pontos) {
    std::string texto;
    for (const auto ponto : pontos) {
        if (ponto <= 0x7f) texto += static_cast<char>(ponto);
        else {
            const int continuacoes = ponto <= 0x7ff ? 1 : ponto <= 0xffff ? 2 : 3;
            const auto prefixo = continuacoes == 1 ? 0xc0 : continuacoes == 2 ? 0xe0 : 0xf0;
            texto += static_cast<char>(prefixo | (ponto >> (6 * continuacoes)));
            for (int i = continuacoes - 1; i >= 0; --i) texto += static_cast<char>(0x80 | ((ponto >> (6 * i)) & 0x3f));
        }
    }
    return texto;
}
void anagramaValido() {
    for (const auto& caso : casos("anagrama_valido"))
        exigir(desafios::anagramaValido(caso.at("input").at("primeiro").get<std::string>(), caso.at("input").at("segundo").get<std::string>()) == caso.at("expected").get<bool>(), caso.at("name"));
    contexto = "anagrama: pontos Unicode e ordenação independente";
    const std::vector<char32_t> alfabeto{0, 0x7f, 0x80, 0x7ff, 0x800, 0xd7ff, 0xe000, 0xffff,
                                      0x10000, 0x10ffff, U'a', U'A', U' ', U'é', 0x301, U'😀', 0x200d};
    std::mt19937 gerador(87);
    for (int rodada = 0; rodada < 500; ++rodada) {
        std::vector<char32_t> a, b;
        const auto tamanho = std::uniform_int_distribution<int>(0, 50)(gerador);
        for (int i = 0; i < tamanho; ++i) a.push_back(alfabeto[gerador() % alfabeto.size()]);
        b = a;
        std::shuffle(b.begin(), b.end(), gerador);
        if (rodada % 2 == 0) b.push_back(alfabeto[gerador() % alfabeto.size()]);
        const auto primeiro = codificar(a), segundo = codificar(b);
        std::sort(a.begin(), a.end()); std::sort(b.begin(), b.end());
        exigir(desafios::anagramaValido(primeiro, segundo) == (a == b), "referência por pontos ordenados");
    }
    // Mesmo multiconjunto de bytes, mas pontos de código diferentes.
    exigir(!desafios::anagramaValido("éĸ", "øĩ"), "contar bytes não basta");
    exigir(!desafios::anagramaValido("👩‍💻", "👩💻"), "o ponto de junção também conta");
    exigir(desafios::anagramaValido(std::string("a\0b", 3), std::string("b\0a", 3)), "NUL faz parte do texto");
    std::vector<char32_t> longa(10000, U'😀');
    exigir(desafios::anagramaValido(codificar(longa), codificar(longa)), "dez mil pontos de quatro bytes");
    // Confere cada ponto escalar Unicode, inclusive os limites entre tamanhos UTF-8.
    for (char32_t ponto = 0; ponto <= 0x10ffff; ++ponto) {
        if (ponto >= 0xd800 && ponto <= 0xdfff) continue;
        const auto texto = codificar({ponto});
        std::size_t posicao = 0;
        exigir(desafios::proximoPonto(texto, posicao) == ponto && posicao == texto.size(), "leitura exata de ponto escalar");
    }
    for (const auto& texto : {std::string("\xc0\x80", 2), std::string("\xed\xa0\x80", 3), std::string("\xf4\x90\x80\x80", 4),
                            std::string("\xe2\x82", 2), std::string("\x80", 1), std::string("\xe2x\x80", 3)}) {
        bool rejeitado = false;
        try { static_cast<void>(desafios::anagramaValido(texto, "")); }
        catch (const std::invalid_argument&) { rejeitado = true; }
        exigir(rejeitado, "leitor rejeita UTF-8 malformado");
    }
}
}
