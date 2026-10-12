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
```

Os comandos funcionam em PowerShell, Linux e macOS:

- `--build` reconstrói a imagem com os fontes atuais. Camadas sem alterações podem ser reutilizadas.
- `run` executa somente o microprojeto indicado.
- `--rm` remove o container quando ele termina, inclusive em caso de falha.
- O resultado é zero quando os testes passam e diferente de zero quando falham.

As imagens base estão fixadas por digest, que identifica seu conteúdo. TypeScript usa o lockfile npm; Java usa as versões do POM e Maven Wrapper; Kotlin usa Gradle Wrapper 9.7.0 com SHA-256, Kotlin 2.4.21 e dependências de teste versionadas no build. O container executa os mesmos testes da execução local e consome `docs/casos`. Nenhuma suíte é reduzida para Docker.

| Serviço | Execução |
| --- | --- |
| `javascript` | Node 24, todos os testes nativos do microprojeto |
| `typescript` | Node 24, instalação pelo lockfile, compilação estrita e todos os testes |
| `java` | JDK 21, Maven Wrapper, compilação, testes JUnit e JAR |
| `kotlin` | JDK 21, Gradle Wrapper, compilação Kotlin, 102 testes JUnit e JAR |

Os serviços têm perfis para evitar iniciar todos por acidente. Ao indicar o serviço em `run`, seu perfil é ativado automaticamente. Não use `docker compose up` para esse fluxo: os testes são execuções temporárias, sem portas nem processos permanentes.

Para executar somente um desafio JavaScript, substitua o comando padrão:

```sh
docker compose run --build --rm javascript node --test soma_de_dois/index.test.js
```

Para executar só busca binária em Kotlin:

```sh
docker compose run --build --rm kotlin ./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests BuscaBinariaTest
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

## Adicionar uma linguagem

1. Crie `src/<id>/Dockerfile`, com imagem oficial fixada por digest e versões das ferramentas registradas.
2. Adicione ao `compose.yaml` um serviço com o mesmo ID do catálogo, sem portas ou dependências de outros microprojetos.
3. Use a raiz como contexto, copie os fontes e `docs/casos` e compile dentro do container como usuário sem privilégios. Atualize `.dockerignore` se houver novos diretórios de build.
4. Faça o comando padrão executar toda a suíte e devolver o resultado dos testes. Documente `docker compose run --build --rm <id>` no README da linguagem e neste guia.
5. Registre o comando em `dockerTestCommand` no catálogo, rode `npm run docs` e valide o container antes de anunciar a linguagem como implementada.

A CI calcula a matriz Docker pelo catálogo. Marcar uma linguagem como implementada faz seu serviço ser testado automaticamente, além das verificações nativas. A exigência está registrada em [AGENTS.md](../AGENTS.md) e [CONTRIBUTING.md](../CONTRIBUTING.md) e se aplica às próximas linguagens.

Referências: [Docker Compose run](https://docs.docker.com/reference/cli/docker/compose/run/), [perfis do Compose](https://docs.docker.com/compose/how-tos/profiles/) e [builds Gradle em containers](https://docs.gradle.org/current/userguide/docker.html).
