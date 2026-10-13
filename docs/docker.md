# Testes em Docker por microprojeto

Você precisa de Git e Docker com suporte a containers Linux. No Windows, use Docker Desktop em modo Linux. Não é preciso instalar o SDK, compilador ou gerenciador de dependências de cada linguagem no computador.

Uma **imagem** reúne as ferramentas e uma cópia do código. Um **container** executa essa imagem. Cada linguagem tem sua própria imagem de testes, construída pelo Dockerfile em `src/<linguagem>`. JavaScript e TypeScript reutilizam a mesma base Node, mas executam suas suítes separadamente.

## Executar os testes

Na raiz do clone, escolha a linguagem:

```sh
docker compose run --build --rm javascript
docker compose run --build --rm typescript
docker compose run --build --rm java
docker compose run --build --rm kotlin
docker compose run --build --rm php
docker compose run --build --rm swift
docker compose run --build --rm pascal
docker compose run --build --rm cpp
docker compose run --build --rm go
docker compose run --build --rm rust
```

Os comandos funcionam em PowerShell, Linux e macOS:

- `--build` reconstrói a imagem com os fontes atuais. Camadas sem alterações podem ser reutilizadas.
- `run` executa somente o microprojeto indicado.
- `--rm` remove o container quando ele termina, inclusive em caso de falha.
- O resultado é zero quando os testes passam e diferente de zero quando falham.

As imagens base estão fixadas por digest, que identifica seu conteúdo. TypeScript usa o lockfile npm; Java usa as versões do POM e Maven Wrapper; Kotlin usa Gradle Wrapper 9.7.0 com SHA-256, Kotlin 2.4.21 e dependências de teste versionadas no build. O container executa os mesmos testes da execução local e consome `docs/casos`. Nenhuma suíte é reduzida para Docker. PHP usa PHP 8.4.26 de 64 bits e Composer 2.9.8 de imagens oficiais fixadas por digest; PHPUnit 12.5.34 e suas dependências são instalados pelo lockfile do microprojeto.

| Serviço | Execução |
| --- | --- |
| `javascript` | Node 24, todos os testes nativos do microprojeto |
| `typescript` | Node 24, instalação pelo lockfile, compilação estrita e todos os testes |
| `java` | JDK 21, Maven Wrapper, compilação, testes JUnit e JAR |
| `kotlin` | JDK 21, Gradle Wrapper, compilação Kotlin, 102 testes JUnit e JAR |
| `php` | PHP de 64 bits, Composer, checagem de sintaxe e 106 testes PHPUnit |
| `swift` | Swift 6.3.3 de 64 bits, SwiftPM, 86 casos compartilhados e 21 testes adicionais |
| `pascal` | Free Pascal 3.2.2, 86 casos compartilhados, referências independentes e dez exemplos compilados |
| `cpp` | C++20, GCC 15.2.0, 86 casos compartilhados, referências independentes, ASan/UBSan e dez exemplos |
| `go` | Go 1.27.2, gofmt, go vet, 86 casos compartilhados, referências independentes, detector de corridas, testes em 32 bits e dez exemplos |
| `rust` | Rust 1.92.0, rustfmt, Clippy, 86 casos compartilhados, referências independentes em debug e release e dez exemplos |

Os serviços têm perfis para evitar iniciar todos por acidente. Ao indicar o serviço em `run`, seu perfil é ativado automaticamente. Não use `docker compose up` para esse fluxo: os testes são execuções temporárias, sem portas nem processos permanentes.

Para executar somente um desafio JavaScript, substitua o comando padrão:

```sh
docker compose run --build --rm javascript node --test soma_de_dois/index.test.js
```

Para executar só busca binária em Kotlin:

```sh
docker compose run --build --rm kotlin ./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests BuscaBinariaTest
```

Só busca binária em PHP:

```sh
docker compose run --build --rm php composer --working-dir=src/php test -- --filter BuscaBinariaTest
```

Um exemplo executável PHP:

```sh
docker compose run --build --rm php php src/php/soma_de_dois/exemplo.php
```

Só busca binária em Swift e um exemplo compilado:

```sh
docker compose run --build --rm swift swift test --package-path src/swift --jobs 2 --filter BuscaBinariaTest
docker compose run --build --rm swift swift run --package-path src/swift --jobs 2 exemplo soma_de_dois
```

## Arquivos e caches

O Docker copia os fontes para a imagem. Não há montagem do checkout; compilações não escrevem `node_modules`, `dist` ou `target` no computador. Para testar uma edição, rode novamente com `--build`. `.dockerignore` exclui esses artefatos do contexto para evitar aproveitar um build local por engano.

Imagens e camadas ocupam espaço no armazenamento do Docker. As dependências TypeScript ficam na imagem e a camada de instalação pode ser reutilizada enquanto os manifests não mudarem. Java usa o volume `testes-live-coding_java_maven` para conservar Maven e dependências entre execuções. Ele contém apenas cache do projeto; as classes compiladas ficam no container temporário.

Para limpar somente esse cache Maven, depois que os testes terminarem:

```sh
docker volume rm testes-live-coding_java_maven
```

O próximo teste Java fará os downloads novamente. Remover o container com `--rm` não apaga esse volume nomeado. Não é necessário executar limpezas globais do Docker.

Kotlin mantém `build`, `.gradle` e `.kotlin` no container. O volume `testes-live-coding_kotlin_gradle` conserva a distribuição Gradle e caches de ferramentas e dependências. Não há SDK Kotlin instalado no host nem volume compartilhado com Java. Para limpar somente esse cache, com os testes encerrados:

```sh
docker volume rm testes-live-coding_kotlin_gradle
```

O próximo teste Kotlin baixa as ferramentas e dependências novamente.

PHP instala suas dependências de desenvolvimento em uma camada da imagem usando `composer.lock`; essa camada é reutilizada enquanto os manifests não mudarem. Não há volume de cache PHP, nem diretório `vendor` escrito no computador. O cache do PHPUnit é criado no container temporário. `vendor` e `.phpunit.cache` ficam fora do contexto Docker.

Swift usa uma imagem oficial 6.3.3 Ubuntu 24.04 fixada por digest. Swift Package Manager e Swift Testing vêm no SDK; não há pacotes externos para baixar. Não usa volume de cache: `.build`, `.swiftpm` e caches da toolchain ficam dentro do container temporário, como usuário sem privilégios. Esses diretórios ficam fora do Git e do contexto Docker. Nenhum SDK Swift é instalado no host.

Pascal usa a imagem oficial Debian bookworm-slim fixada por digest. Compilador e units RTL/base/FCL são fixados em `3.2.2+dfsg-20`, e binutils em `2.40-2`. `runner` (UID 10001) compila e executa testes e exemplos com checagens de limites, overflow e memória. Os artefatos ficam em `src/pascal/build` dentro do container temporário, sem volumes de cache. `.o`, `.ppu` e `heap.trc` também são excluídos do Git e do contexto. Nenhum compilador é instalado no computador.

Um desafio e um exemplo Pascal:

```sh
docker compose run --build --rm pascal sh src/pascal/executar.sh testes busca_binaria
docker compose run --build --rm pascal sh src/pascal/executar.sh exemplo soma_de_dois
```

C++ usa a imagem oficial GCC 15.2.0 fixada por digest e o padrão C++20. nlohmann JSON 3.12.0 é usado apenas nos testes, com header verificado por SHA-256. `runner` (UID 10001) baixa o parser, compila e testa com avisos como erros, ASan/UBSan e detecção de vazamentos. Os artefatos ficam em `src/cpp/build` no container temporário. Não há volume de cache C++ nem compilador instalado no host. `.dockerignore` exclui `build`, inclusive headers baixados e executáveis locais.

Um desafio e um exemplo C++:

```sh
docker compose run --build --rm cpp sh src/cpp/executar.sh testes busca_binaria
docker compose run --build --rm cpp sh src/cpp/executar.sh exemplo soma_de_dois
```

Go usa a imagem oficial `golang:1.27.2-bookworm`, fixada pelo digest `sha256:5cf287a799e6b94384bad13d16b14904c531f51ba65792237e122ce42b392f61`. Compilação, testes e exemplos executam como `runner` (UID 10001), com fontes copiados e sem módulos externos. `GOTOOLCHAIN=local` impede baixar outra versão; `GOPROXY=off` impede buscar módulos. O comando padrão confere formatação, análise estática, testes com `-race`, repete a suíte em `GOARCH=386` e valida os dez exemplos. Os caches de Go e o executável `src/go/build/exemplos` ficam no container, sem volumes persistentes. `build`, `*.test` e `*.exe` ficam fora do Git e do contexto Docker.

Um desafio e um exemplo Go, da raiz:

```sh
docker compose run --build --rm go sh executar.sh testes busca_binaria
docker compose run --build --rm go sh executar.sh exemplo soma_de_dois
```

Rust usa a imagem oficial `rust:1.92.0-bookworm`, fixada pelo digest `sha256:e90e846de4124376164ddfbaab4b0774c7bdeef5e738866295e5a90a34a307a2`. O arquivo rust-toolchain.toml fixa a mesma versão, rustfmt e Clippy. Fontes e casos são copiados e `runner` (UID 10001) baixa dependências com `cargo fetch --locked`, compila e executa toda a suíte. O comando padrão usa `CARGO_NET_OFFLINE=true`; Cargo.lock fixa versões e checksums de serde_json 1.0.145 e suas dependências de teste. Não há montagem do checkout, SDK instalado no computador nem volume persistente Rust. `target` e caches Cargo ficam no container; artefatos locais não entram no contexto.

Um desafio e um exemplo Rust, da raiz:

```sh
docker compose run --build --rm rust sh executar.sh testes busca_binaria
docker compose run --build --rm rust sh executar.sh exemplo soma_de_dois
```

## Adicionar uma linguagem

1. Crie `src/<id>/Dockerfile`, com imagem oficial fixada por digest e versões das ferramentas registradas.
2. Adicione ao `compose.yaml` um serviço com o mesmo ID do catálogo, sem portas ou dependências de outros microprojetos.
3. Use a raiz como contexto, copie os fontes e `docs/casos` e compile dentro do container como usuário sem privilégios. Atualize `.dockerignore` se houver novos diretórios de build.
4. Faça o comando padrão executar toda a suíte e devolver o resultado dos testes. Documente `docker compose run --build --rm <id>` no README da linguagem e neste guia.
5. Registre o comando em `dockerTestCommand` no catálogo, rode `npm run docs` e valide o container antes de anunciar a linguagem como implementada.

A CI calcula a matriz Docker pelo catálogo. Marcar uma linguagem como implementada faz seu serviço ser testado automaticamente, além das verificações nativas. A exigência está registrada em [AGENTS.md](../AGENTS.md) e [CONTRIBUTING.md](../CONTRIBUTING.md) e se aplica às próximas linguagens.

Referências: [Docker Compose run](https://docs.docker.com/reference/cli/docker/compose/run/), [perfis do Compose](https://docs.docker.com/compose/how-tos/profiles/) e [builds Gradle em containers](https://docs.gradle.org/current/userguide/docker.html).
