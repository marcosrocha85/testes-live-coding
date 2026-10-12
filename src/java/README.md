# Microprojeto Java

Os dez desafios estão implementados em Java, com testes JUnit que consomem os mesmos JSON de JavaScript e TypeScript. Cada pasta contém a solução, os testes e um README com particularidades e exemplos Java.

## Testes com Docker

Da raiz, sem instalar JDK ou Maven no computador:

```sh
docker compose run --build --rm java
```

O container usa JDK 21 e o Maven Wrapper para compilar, executar todos os testes e gerar o JAR. O build fica dentro do container; o cache Maven fica em um volume Docker do projeto. Leia [o guia Docker](../../docs/docker.md).

## Execução local

Use **JDK 21 ou superior**. O Maven Wrapper instala Maven 3.9.16 no primeiro uso, sem instalação global. JUnit 6.0.3 e Gson 2.14.0 são usados somente nos testes. As soluções dependem apenas da biblioteca padrão.

Da raiz do repositório, em Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml clean verify
```

No PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml clean verify
```

O Maven compila para Java 21, copia os casos JSON como recursos de teste, executa JUnit e gera o JAR em `target`, ignorado pelo Git.

Para rodar o exemplo de soma de dois após compilar:

```sh
java -cp src/java/target/classes tinker.livecoding.Exemplo
```

A saída é `[0, 1]`. Leia [o guia de Java](../../docs/linguagens/java.md) para entender ferramentas, tipos, `null`, referências, Unicode e precisão. Acompanhe [o roteiro e as issues](../../docs/roadmap.md).
