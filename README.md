# Testes de live coding

**[Acesse o site: problemas, explicações e código por linguagem](https://marcosrocha85.github.io/testes-live-coding/)**

Um guia de estudo para entender, implementar e explicar desafios comuns de entrevistas técnicas. Cada solução tem comentários simples, testes automatizados e uma explicação do raciocínio e da capacidade avaliada.

Os **dez desafios estão implementados em JavaScript, TypeScript, Java, Kotlin, PHP, Swift, Pascal e C++**, com testes próprios para cada linguagem. As oito linguagens do roteiro estão disponíveis para estudo.

- [Wiki do projeto](https://github.com/marcosrocha85/testes-live-coding/wiki)
- [Explicações dos desafios](docs/tests/README.md)
- [Arquitetura](docs/arquitetura.md) e [contratos dos testes](docs/contratos.md)
- [Testes em Docker, sem instalar SDKs](docs/docker.md)
- [Guia de JavaScript para iniciantes](docs/linguagens/javascript.md)
- [Guia de TypeScript para iniciantes](docs/linguagens/typescript.md)
- [Guia de Java para iniciantes](docs/linguagens/java.md)
- [Guia de Kotlin para iniciantes](docs/linguagens/kotlin.md)
- [Guia de PHP para iniciantes](docs/linguagens/php.md)
- [Guia de Swift para iniciantes](docs/linguagens/swift.md)
- [Guia de Pascal para iniciantes](docs/linguagens/pascal.md)
- [Guia de C++ para iniciantes](docs/linguagens/cpp.md)
- [Roteiro e issues por linguagem](docs/roadmap.md)

O site é atualizado após a integração de cada entrega à `main`. A Wiki tem explicações dos dez desafios; suas fontes estão versionadas em [docs/wiki](docs/wiki/Home.md).

## Como começar

### Com Docker

Instale Git e Docker com suporte a containers Linux. Cada linguagem tem seu próprio container de testes; você pode executar só a que estiver estudando, sem instalar Node.js, TypeScript, JDK, Maven, Gradle, Kotlin, PHP, Composer, Swift, Free Pascal ou GCC no computador:

```sh
git clone https://github.com/marcosrocha85/testes-live-coding.git
cd testes-live-coding
docker compose run --build --rm javascript
docker compose run --build --rm typescript
docker compose run --build --rm java
docker compose run --build --rm kotlin
docker compose run --build --rm php
docker compose run --build --rm swift
docker compose run --build --rm pascal
docker compose run --build --rm cpp
```

O primeiro uso baixa a imagem e as dependências. `--build` inclui suas alterações e `--rm` remove o container após os testes. Os testes usam uma cópia dos fontes, e os arquivos de build ficam dentro do Docker. Veja [o guia Docker](docs/docker.md) para entender os comandos, caches e como adicionar uma linguagem.

### Com ferramentas locais

Instale **Node.js 24 ou superior**, que inclui npm. Não há bibliotecas externas nas soluções.

```sh
git clone https://github.com/marcosrocha85/testes-live-coding.git
cd testes-live-coding
npm ci
npm test
```

Para estudar, leia o problema, tente escrever a solução sem consultar o código e rode os testes. Depois compare o raciocínio, explique em voz alta por que ele funciona e altere uma entrada para explorar os casos de borda.

Exemplo executável, a partir da raiz:

```sh
node --input-type=module -e "import { somaDeDois } from './src/javascript/soma_de_dois/index.js'; console.log(somaDeDois([2, 7, 11, 15], 9));"
```

A saída é `[0, 1]`: os números nos índices 0 e 1 somam 9. Índices começam em zero.

Para estudar TypeScript, compile e execute os testes do microprojeto:

```sh
npm run test --workspace src/typescript
```

O comando verifica os tipos, compila as soluções e executa seus testes. Os arquivos `.ts` originais ficam disponíveis na aba TypeScript do site após a integração na `main`.

Para Java, use **JDK 21 ou superior**. O Maven Wrapper incluído instala Maven 3.9.16 no primeiro uso. Em Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml clean verify
```

No PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml clean verify
```

Java tem testes JUnit independentes dos workspaces npm. As soluções usam a biblioteca padrão; JUnit e Gson são dependências somente dos testes. A CI e o workflow Pages conferem as oito linguagens antes da publicação.

Para Kotlin, prefira `docker compose run --build --rm kotlin`, que valida sem instalar SDK no computador. Se já tiver **JDK 21** local, use o Gradle Wrapper:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin clean check jar
```

No PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin clean check jar
```

Kotlin tem 102 testes JUnit próprios e usa Gradle 9.7.0 e Kotlin 2.4.21. As soluções não dependem das outras linguagens.

Para PHP, use `docker compose run --build --rm php`. A suíte tem 106 testes PHPUnit e usa PHP de 64 bits. Com PHP 8.4 ou 8.5 e Composer 2.9.8 local:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php check
php src/php/soma_de_dois/exemplo.php
```

O exemplo imprime `[0,1]` e pode ser executado sem instalar as dependências de testes. Cada desafio PHP tem um exemplo executável; veja [o guia da linguagem](docs/linguagens/php.md).

Para Swift, prefira `docker compose run --build --rm swift`. Com Swift 6.3.3 de 64 bits local:

```sh
swift test --package-path src/swift --jobs 2 -Xswiftc -warnings-as-errors
swift run --package-path src/swift --jobs 2 exemplo soma_de_dois
```

O microprojeto tem testes Swift Testing, sem dependências externas. Veja [o guia Swift](docs/linguagens/swift.md) para entender Optional, Unicode, identidade e ARC.

Para Pascal, use `docker compose run --build --rm pascal`. Free Pascal 3.2.2 compila os dez desafios, executa os 86 casos JSON e as referências independentes, e valida os dez exemplos. Não é necessário instalar compilador no computador:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh exemplo soma_de_dois
```

O exemplo imprime `0 1`. As soluções usam `Int64`, pontos Unicode completos e nós reais com alocação e liberação explícitas. Veja [o guia Pascal](docs/linguagens/pascal.md). `npm test` não executa a suíte Pascal.

Para C++, use `docker compose run --build --rm cpp`. C++20 e GCC 15.2.0 são fixados no container. A suíte lê os 86 casos JSON, compara referências independentes e verifica memória com ASan/UBSan, além de executar os dez exemplos:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh exemplo soma_de_dois
```

O exemplo imprime `0 1`. As soluções usam somente a biblioteca padrão, inteiros de 64 bits e nós reais. Veja [o guia C++](docs/linguagens/cpp.md) para entender ponteiros, propriedade da memória, Unicode e exemplos. `npm test` não executa C++.

## Os dez desafios iniciais

| Pasta | Problema | Ideia | Capacidade avaliada |
| --- | --- | --- | --- |
| [`soma_de_dois`](docs/tests/soma_de_dois.md) | Two Sum | Mapa de complemento, uma passagem | Busca por chave e troca de memória por velocidade |
| [`parenteses_validos`](docs/tests/parenteses_validos.md) | Valid Parentheses | Pilha de aberturas | Ordem, aninhamento e condições de parada |
| [`inverter_lista_ligada`](docs/tests/inverter_lista_ligada.md) | Reverse Linked List | Inverte os ponteiros no lugar | Referências e mutação sem perder nós |
| [`busca_binaria`](docs/tests/busca_binaria.md) | Binary Search | Corta o intervalo pela metade | Limites e redução do espaço de busca |
| [`mesclar_listas_ordenadas`](docs/tests/mesclar_listas_ordenadas.md) | Merge Two Sorted Lists | Escolhe sempre o menor elo | Dois ponteiros e reutilização de nós |
| [`compra_e_venda_de_acoes`](docs/tests/compra_e_venda_de_acoes.md) | Best Time to Buy and Sell Stock | Menor preço visto até agora | Estado acumulado e ordem temporal |
| [`subarray_maximo`](docs/tests/subarray_maximo.md) | Maximum Subarray (Kadane) | Estende o trecho ou recomeça | Programação dinâmica e contiguidade |
| [`subir_escadas`](docs/tests/subir_escadas.md) | Climbing Stairs | Fibonacci: passo de 1 ou 2 | Recorrência, casos base e precisão numérica |
| [`anagrama_valido`](docs/tests/anagrama_valido.md) | Valid Anagram | Contagem de pontos de código | Frequência de caracteres e Unicode |
| [`ciclo_em_lista_ligada`](docs/tests/ciclo_em_lista_ligada.md) | Linked List Cycle (Floyd) | Ponteiro lento e ponteiro rápido | Identidade de nós e memória constante |

## Organização

```text
docs/
  arquitetura.md          # Organização e decisões técnicas
  contratos.md            # Regras comuns entre linguagens
  catalogo.json           # Conteúdo usado pela documentação e pelo site
  casos/                  # Entradas e resultados esperados compartilhados
  linguagens/             # Conceitos e instruções de cada linguagem
  tests/                  # Um documento didático por desafio
  wiki/                   # Páginas geradas para a Wiki
  site/                   # Interface do catálogo no GitHub Pages
src/
  javascript/             # Dez desafios e testes executados pelo Node
  typescript/             # Dez desafios, compilação estrita e testes próprios
  java/                   # Dez desafios, Maven Wrapper e testes JUnit
  kotlin/                 # Dez desafios, Gradle Wrapper e testes JUnit
  php/                    # Dez desafios, Composer, PHPUnit e exemplos executáveis
  swift/                  # Dez desafios, Swift Package Manager e Swift Testing
  pascal/                 # Dez desafios, Free Pascal, testes e exemplos compilados
  cpp/                    # Dez desafios, GCC, sanitizadores e exemplos compilados
scripts/                  # Geradores, preview e publicação da Wiki
.github/                  # CI, publicação e templates de issues
```

Cada linguagem é um microprojeto independente, com ferramentas e testes adequados a ela. Os arquivos reais das oito linguagens estão nas abas do site, sem marcadores de nova linguagem.

## Comandos úteis

| Comando | Finalidade |
| --- | --- |
| `docker compose run --build --rm javascript` | Todos os testes JavaScript em um container temporário |
| `docker compose run --build --rm typescript` | Compilação e todos os testes TypeScript em um container temporário |
| `docker compose run --build --rm java` | Maven e todos os testes Java em um container temporário |
| `docker compose run --build --rm kotlin` | Gradle, compilação e todos os testes Kotlin em um container temporário |
| `docker compose run --build --rm php` | Lint e todos os testes PHP em um container temporário |
| `docker compose run --build --rm swift` | Compilação e todos os testes Swift em um container temporário |
| `docker compose run --build --rm pascal` | Compilação Pascal, todos os testes e os dez exemplos em um container temporário |
| `docker compose run --build --rm cpp` | Compilação C++20, testes com sanitizadores e dez exemplos em um container temporário |
| `swift test --package-path src/swift --jobs 2` | Compilar e testar Swift com SDK local |
| `composer --working-dir=src/php check` | Lint e testes PHP com ferramentas locais |
| `./src/kotlin/gradlew --no-daemon -p src/kotlin clean check jar` | Compilar e testar Kotlin com JDK 21 local |
| `npm test` | Testes JavaScript, TypeScript e verificações do gerador do site |
| `npm run typecheck` | Checagem estrita de tipos do microprojeto TypeScript |
| `./src/java/mvnw -f src/java/pom.xml clean verify` | Compilar e testar os dez desafios Java em Linux/macOS |
| `.\src\java\mvnw.cmd -f src/java/pom.xml clean verify` | Compilar e testar Java no PowerShell |
| `npm run test:coverage` | Testes das duas linguagens com relatório de cobertura |
| `node --test src/javascript/busca_binaria/index.test.js` | Testar apenas um desafio |
| `npm run docs` | Atualizar explicações, READMEs dos desafios e fontes da Wiki |
| `npm run docs:check` | Detectar documentação gerada desatualizada |
| `npm run build` | Gerar o site em `dist/` com as soluções reais |
| `npm run preview` | Gerar e abrir um servidor local em `http://127.0.0.1:4173` |

## Contribuir e propor novos testes

Use [GitHub Issues](https://github.com/marcosrocha85/testes-live-coding/issues/new/choose) para sugerir desafios, reportar problemas ou propor melhorias nas explicações. O template de novo desafio pede nome, problema, ideia, capacidades avaliadas, contrato e exemplos.

Para implementar uma linguagem, siga sua issue principal e as dez sub-issues. Toda solução deve ter testes dos casos compartilhados, verificações específicas da linguagem e explicação acessível a iniciantes. Consulte [CONTRIBUTING.md](CONTRIBUTING.md) e [AGENTS.md](AGENTS.md).

O material ajuda a estudar e a discutir soluções. O desempenho em um desses exercícios é evidência de habilidades específicas; ele não resume, sozinho, a capacidade profissional de uma pessoa.
