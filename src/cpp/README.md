# Dez desafios em C++20

As dez pastas contêm uma solução `.cpp`, seu header `.hpp`, testes `*_test.cpp` e README didático. As soluções usam somente a biblioteca padrão. GCC **15.2.0** é fixado na imagem oficial por digest, e o parser nlohmann JSON **3.12.0** é uma dependência somente dos testes, verificada por SHA-256 em `json.sha256`.

Da raiz do repositório, em PowerShell, Linux ou macOS:

```sh
docker compose run --build --rm cpp
```

O comando copia os fontes, compila como `runner` (UID 10001), lê os 86 casos em `docs/casos`, executa referências independentes e testa os dez exemplos. Avisos são erros; AddressSanitizer, UndefinedBehaviorSanitizer e detecção de vazamentos fazem o comando falhar se encontrarem problemas. Não instala compilador no computador nem monta o checkout com escrita.

Um desafio ou um exemplo:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes anagrama_valido
docker compose run --build --rm cpp sh src/cpp/executar.sh exemplo soma_de_dois
```

O segundo comando imprime `0 1`. Se já possuir GCC 15.2.0 em Linux com shell POSIX, curl e sha256sum, use `sh src/cpp/executar.sh check` da raiz. Esse caminho usa a mesma suíte e os mesmos sanitizadores. `npm test` não executa C++.

`std::int64_t` mantém as somas e contagens exatas. `std::span<const ...>` e `std::string_view` leem sem possuir memória. As listas são nós reais, ligados por `No*`; as funções de inversão e mesclagem alteram ligações e preservam os próprios nós. O anagrama lê UTF-8 por pontos completos, sem normalização. Veja [o guia C++](../../docs/linguagens/cpp.md) para aprender esses conceitos.

Os testes usam enumeração de pares e intervalos, busca linear, remoção de pares de parênteses, combinações de passos, ordenação de pontos conhecidos e endereços visitados. Também verificam listas de dez mil nós, estabilidade em empates, ausência de mutação em Floyd, somas além de 32 bits e todos os pontos escalares Unicode. A propriedade de cada nó fica em um `unique_ptr` separado, permitindo liberar listas longas e cíclicas sem recursão.

Artefatos ficam em `build/`, ignorados pelo Git e pelo contexto Docker. O parser fica numa camada da imagem; não há volume de cache C++. `_examples/main.cpp` é gerado de `scripts/cpp-docs.mjs` por `npm run docs`; altere a fonte, não o arquivo gerado.
