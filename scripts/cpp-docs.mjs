// Fonte única das notas e dos trechos que o executável de exemplos testa.
export const notasCpp = {
  soma_de_dois: '`std::span<const std::int64_t>` é uma vista dos números: não copia nem permite escrever nos elementos. A vista não possui a memória, que deve continuar viva durante a chamada. `std::optional<std::array<std::size_t, 2>>` contém dois índices desde zero ou `std::nullopt`. `try_emplace` não substitui um índice já guardado. O mapa é destruído automaticamente ao sair da função.',
  parenteses_validos: '`std::string_view` lê bytes sem copiar nem possuir o texto. Os seis símbolos aceitos são ASCII, de um byte. Qualquer outro byte faz a função retornar false. `std::vector<char>` possui a pilha; `back()` só é chamado depois de verificar `empty()`. A pilha libera sua memória ao sair do escopo.',
  inverter_lista_ligada: '`No*` guarda o endereço de um nó real; `nullptr` indica o fim. `atual->proximo` acessa a ligação. O ponteiro `seguinte` conserva o endereço anterior à mutação. A função devolve a nova cabeça e reaproveita os nós. Ela não cria nem libera memória. No exemplo, os nós vivem no escopo; nos testes, cada nó é possuído por um `std::unique_ptr` separado.',
  busca_binaria: '`std::size_t` é usado nos limites, que representam [esquerda, direita): a direita fica fora do trecho. Essa representação evita subtrair 1 de zero num inteiro sem sinal. A saída `std::ptrdiff_t` tem sinal e admite -1. O array deve estar ordenado e ter o tamanho limitado pelo contrato; a função não o ordena nem altera. Em duplicatas, qualquer índice correspondente é válido.',
  mesclar_listas_ordenadas: '`No sentinela{0}` cria um nó local, fora do resultado. Os nós da saída pertencem às entradas; apenas suas ligações mudam. `<=` conserva a preferência pela primeira lista em empate. As entradas devem ser independentes, ordenadas e sem ciclos. A função não transfere a propriedade da memória. Os donos originais devem continuar vivos enquanto a lista mesclada for usada.',
  compra_e_venda_de_acoes: '`std::int64_t` representa inteiros com sinal de exatamente 64 bits. A entrada vazia retorna zero. O menor preço pertence aos dias anteriores: calcular o lucro antes de atualizar esse preço preserva a ordem compra/venda. Zero representa não negociar. A vista constante dos preços não permite mutação dos elementos.',
  subarray_maximo: '`std::optional<std::int64_t>` distingue uma soma de ausência de elementos. Zero e números negativos são respostas presentes. Começar pelo primeiro valor preserva o caso com todos negativos. Dez mil valores de um milhão somam dez bilhões: `int64_t` evita o limite de 32 bits. Os valores do contrato mantêm todas as somas dentro de 64 bits.',
  subir_escadas: '`double` só representa a entrada para que frações e valores não finitos possam ser rejeitados. `std::invalid_argument` equivale ao erro de domínio dos casos JSON. A validação ocorre antes de converter para `int`. Todos os acumuladores e a saída usam `std::int64_t`; não há arredondamento na contagem. O domínio permanece de 0 a 77 e zero retorna uma forma de não dar passos.',
  anagrama_valido: '`std::string_view` contém bytes UTF-8; seu tamanho não é o número de pontos Unicode. `proximoPonto` lê de um a quatro bytes e produz `char32_t`, capaz de guardar um ponto completo. `unsigned char` evita interpretar bytes altos como negativos. O mapa conta pontos, sem normalizar acentos, agrupar grafemas, remover espaços ou ignorar maiúsculas. O contrato exige UTF-8 bem formado; o auxiliar também rejeita sequências malformadas.',
  ciclo_em_lista_ligada: '`const No*` permite consultar o nó sem escrever nele. `lento == rapido` compara endereços, não valores. Floyd não altera nenhuma ligação. As ligações não possuem os nós: nos testes, cada `unique_ptr` destrói somente seu próprio nó, mesmo que haja ciclo. Uma cadeia de ponteiros proprietários exigiria outro desenho para evitar ciclos de propriedade e destruição recursiva.'
};

export const exemplosCpp = {
  soma_de_dois: `const std::array<std::int64_t, 4> numeros{2, 7, 11, 15};
const auto par = somaDeDois(numeros, 9);
exigir(par.has_value() && (*par)[0] == 0 && (*par)[1] == 1);
std::cout << (*par)[0] << ' ' << (*par)[1] << '\\n'; // 0 1`,
  parenteses_validos: `exigir(parentesesValidos("{[()]}"));
std::cout << parentesesValidos("{[()]}") << '\\n'; // true`,
  inverter_lista_ligada: `No terceiro{3};
No segundo{2, &terceiro};
No primeiro{1, &segundo};
No* resultado = inverterListaLigada(&primeiro);
exigir(resultado == &terceiro && terceiro.proximo == &segundo && primeiro.proximo == nullptr);
std::cout << resultado->valor << '\\n'; // 3; ligações: 3 → 2 → 1 → nullptr
// Os três nós serão destruídos automaticamente ao sair deste escopo.`,
  busca_binaria: `const std::array<std::int64_t, 5> numeros{1, 3, 5, 7, 9};
exigir(buscaBinaria(numeros, 7) == 3);
std::cout << buscaBinaria(numeros, 7) << '\\n'; // 3`,
  mesclar_listas_ordenadas: `No tres{3}, quatro{4};
No um{1, &tres}, dois{2, &quatro};
No* resultado = mesclarListasOrdenadas(&um, &dois);
exigir(resultado == &um && um.proximo == &dois && dois.proximo == &tres && tres.proximo == &quatro);
std::cout << resultado->valor << '\\n'; // 1; ligações: 1 → 2 → 3 → 4 → nullptr`,
  compra_e_venda_de_acoes: `const std::array<std::int64_t, 6> precos{7, 1, 5, 3, 6, 4};
exigir(maiorLucro(precos) == 5);
std::cout << maiorLucro(precos) << '\\n'; // 5`,
  subarray_maximo: `const std::array<std::int64_t, 9> numeros{-2, 1, -3, 4, -1, 2, 1, -5, 4};
const auto soma = subarrayMaximo(numeros);
exigir(soma.has_value() && *soma == 6);
std::cout << *soma << '\\n'; // 6`,
  subir_escadas: `exigir(subirEscadas(5) == 8);
std::cout << subirEscadas(5) << '\\n'; // 8`,
  anagrama_valido: `exigir(anagramaValido("😀a😀", "😀😀a"));
std::cout << anagramaValido("😀a😀", "😀😀a") << '\\n'; // true`,
  ciclo_em_lista_ligada: `No primeiro{1}, segundo{2, &primeiro};
primeiro.proximo = &segundo;
exigir(temCiclo(&primeiro));
std::cout << temCiclo(&primeiro) << '\\n'; // true
// As ligações não possuem os nós; o ciclo não interfere na destruição local.`
};

export function programaCpp(exercicios) {
  const includes = exercicios.map(({ id }) => `#include "../${id}/${id}.hpp"`).join('\n');
  const blocos = exercicios.map(({ id }, i) => `${i ? 'else ' : ''}if (id == "${id}") {\n${exemplosCpp[id].split('\n').map(linha => '    ' + linha).join('\n')}\n}`).join('\n');
  return `// Gerado por npm run docs. Consulte os READMEs dos desafios.
${includes}
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
${blocos.split('\n').map(linha => '        ' + linha).join('\n')}
        else throw std::invalid_argument("ID de desafio inválido");
    } catch (const std::exception& erro) {
        std::cerr << erro.what() << '\\n';
        return 1;
    }
}
`;
}
