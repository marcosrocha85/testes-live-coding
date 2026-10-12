# Swift para iniciantes

Os dez desafios estão implementados em **Swift 6.3.3**, em plataformas de 64 bits, com Swift Package Manager e Swift Testing incluídos no SDK. As soluções usam somente a biblioteca padrão. Foundation é usado pelo leitor JSON e pelos testes de referência; não há pacotes externos para instalar nem Package.resolved necessário.

## Testar sem instalar SDK

Na raiz, com Docker em modo Linux:

```sh
docker compose run --build --rm swift
```

A imagem oficial Swift 6.3.3 Ubuntu 24.04 tem digest fixado no Dockerfile. Os fontes e os casos canônicos são copiados; compilação e testes rodam como runner, sem privilégios. O container é removido ao terminar. Nenhum SDK é instalado no computador e não há montagem de escrita no checkout. Não há volume de cache Swift: .build e caches ficam no container temporário.

Só busca binária ou um exemplo:

```sh
docker compose run --build --rm swift swift test --package-path src/swift --jobs 2 --filter BuscaBinariaTest
docker compose run --build --rm swift swift run --package-path src/swift --jobs 2 exemplo soma_de_dois
```

O exemplo imprime [0, 1]. Troque soma_de_dois pelo ID de qualquer uma das dez pastas para executar seu exemplo. O gerador da documentação mantém src/swift/_examples/main.swift; não o edite manualmente.

## Ferramentas locais opcionais

Se já usa Swift, obtenha Swift 6.3.3 em [Swift.org](https://www.swift.org/install/). Xcode inclui uma toolchain, mas confira a versão selecionada com swift --version. Clone todo o repositório para os testes encontrarem docs/casos. Da raiz, em Linux, macOS ou PowerShell com toolchain compatível:

```sh
swift --version
swift test --package-path src/swift --jobs 2 -Xswiftc -warnings-as-errors
swift test --package-path src/swift --jobs 2 --filter BuscaBinariaTest
swift run --package-path src/swift --jobs 2 exemplo anagrama_valido
```

--jobs 2 limita o paralelismo da compilação. -warnings-as-errors trata avisos de código como erros. npm test não executa Swift. A CI valida a mesma suíte em Linux, macOS e no serviço Docker; Pages executa Docker Swift antes da publicação.

## Tipos e ausência

- Int usa a largura da plataforma. Este microprojeto exige 64 bits para somas até dez bilhões e para 77 degraus.
- No? e Int? são Optional: nil representa ausência. if let, while let e guard extraem o valor com segurança; evite forçar com !.
- let impede trocar o valor de uma variável; var permite. Em uma classe, uma variável let ainda pode referenciar um objeto com propriedades var.
- Array e Dictionary têm semântica de valor. As soluções não usam inout nos arrays, portanto não alteram a entrada do chamador.
- Dictionary<Int, Int> relaciona um valor ao índice ou à frequência. Uma chave ausente devolve nil; o índice zero é válido.
- Os parâmetros com _ são chamados sem rótulo: somaDeDois([2, 7], 9).

## Inteiros e erros

subarrayMaximo([]) retorna nil. Uma entrada só negativa retorna a maior soma negativa. Escadas aceita Double para poder rejeitar frações e dados não finitos; depois de validar 0 a 77, usa Int na contagem. try subirEscadas(3) devolve 3. Entradas fora do domínio lançam ErroDeEntrada.degrausForaDoDominio, equivalente ao RangeError descrito no JSON. A validação acontece antes da conversão para inteiro.

Swift detecta overflow na aritmética comum. As operações &+ e &* fazem overflow modular e não servem para as soluções; apenas o gerador pseudoaleatório dos testes as usa intencionalmente. Os limites do contrato garantem que os cálculos das soluções cabem em Int de 64 bits.

## Unicode

Um for direto sobre String percorre Character, que representa um grafema: um símbolo visível pode reunir vários pontos de código. Além disso, a igualdade de String considera equivalência canônica: é e e seguido de acento combinante podem comparar iguais.

O contrato de anagrama exige pontos de código exatos. Por isso a solução percorre unicodeScalars e usa ponto.value, um UInt32, como chave. Não normaliza, não remove espaços e não ignora maiúsculas. Os testes verificam emojis, limites Unicode, acentos combinantes e pares com os mesmos bytes distribuídos em pontos diferentes. Strings de entrada devem ser bem formadas, como nas outras linguagens.

## Classes, identidade e ARC

No é uma classe final com valor imutável e proximo mutável. Duas variáveis podem apontar para o mesmo objeto. === compara identidade. Inversão e mesclagem mudam as ligações e reutilizam os nós originais; Floyd apenas lê as referências.

Swift libera objetos por contagem de referências (ARC). Um ciclo de referências fortes pode permanecer na memória mesmo após sair do escopo. Os testes cíclicos mantêm uma lista dos nós e usam defer para zerar suas ligações no fim; o exemplo também quebra o ciclo após a consulta. A solução temCiclo não modifica os ponteiros. Tornar todo proximo weak descartaria nós de uma lista comum quando apenas a cabeça fosse guardada, por isso as ligações são fortes.

## Organização e testes

No Linux, o manifesto vincula libm, a biblioteca matemática do sistema usada pela conversão exata de Double. Isso não instala um pacote Swift externo.

Package.swift separa LiveCoding (soluções e No), LiveCodingTests (testes) e exemplo (executável didático). Os arquivos das soluções têm nomes diferentes porque Swift compila todos no mesmo módulo. Cada pasta mantém a solução, seu *Test.swift e README.

Swift Testing usa @Suite para agrupar testes, @Test para declará-los, #expect para verificar condições e #require quando continuar depende de uma condição. Dez testes parametrizados consomem os **86 casos JSON**. Outros **21 testes** verificam identidade, mutação, listas longas, memória, precisão, Unicode e comparações independentes com algoritmos exaustivos. São **31 declarações de teste e 107 execuções**, contando cada caso parametrizado. As entradas pseudoaleatórias têm semente fixa. Os testes de listas detectam ciclos inesperados ao percorrer resultados.

Referências: [Swift 6.3.3](https://forums.swift.org/t/announcing-swift-6-3-3/87888), [Swift Package Manager](https://www.swift.org/documentation/package-manager/), [Swift Testing](https://developer.apple.com/documentation/testing), [Strings e Unicode](https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html), [ARC](https://docs.swift.org/swift-book/LanguageGuide/AutomaticReferenceCounting.html), [imagem Docker oficial](https://www.swift.org/install/linux/docker/).
