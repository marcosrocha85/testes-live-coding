# Java

Para compilar e testar sem instalar JDK ou Maven no computador, execute `docker compose run --build --rm java` da raiz. Veja [o guia Docker](../docker.md). As instruções de instalação abaixo são para execução local.

Os dez desafios estão implementados em `src/java`. As soluções usam a biblioteca padrão, com testes JUnit dos casos compartilhados e verificações específicas para Java. Cada README explica o algoritmo, os tipos e como executar um exemplo.

## Instalação e execução

Instale **JDK 21 ou superior**, que inclui `java`, `javac` e `jshell`. Confira `java -version` e `javac -version`. `JAVA_HOME`, quando definido, deve apontar para a pasta do JDK, sem o sufixo `bin`.

O repositório inclui **Maven Wrapper 3.3.4**, fixado em **Maven 3.9.16**, com verificação SHA-256 da distribuição. O primeiro uso precisa de internet para baixar o Maven e as dependências dos testes. Não é necessário instalar Maven globalmente.

Da raiz do repositório, em Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml clean verify
```

No PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml clean verify
```

`clean` apaga somente os arquivos gerados em `src/java/target`. `verify` compila, executa os testes e gera o JAR. A configuração `release: 21` permite usar um JDK mais novo e ainda produzir código para Java 21. A CI executa a suíte com JDK 21 e 25.

Para testar somente soma de dois:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=SomaDeDoisTest test
```

No PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=SomaDeDoisTest" test
```

Após compilar, execute o exemplo:

```sh
java -cp src/java/target/classes tinker.livecoding.Exemplo
```

A saída é `[0, 1]`. Para experimentar outras chamadas, abra `jshell --class-path src/java/target/classes` e copie os trechos do README de cada desafio. Por exemplo:

```java
import tinker.livecoding.soma_de_dois.SomaDeDois;
int[] numeros = {2, 7, 11, 15};
int[] indices = SomaDeDois.somaDeDois(numeros, 9);
System.out.println(java.util.Arrays.toString(indices)); // [0, 1]
```

## Classes, métodos e tipos

Cada solução é uma classe com um método `public static`. `public` permite chamar o método de outra classe; `static` permite usá-lo sem criar um objeto da classe da solução. O construtor privado evita instanciar essas classes de funções. `package` organiza os nomes; `import` permite referenciar uma classe de outro pacote.

`int[]` é um array de inteiros com tamanho fixo. Um array vazio tem tamanho zero; ele é diferente de `null`. As soluções numéricas leem os arrays sem alterá-los. A resposta de soma de dois é um novo `int[]` com duas posições, ou `null` se não houver solução.

`int` tem 32 bits; `long`, 64. Os valores e índices dos casos cabem em `int`, mas a soma de 10.000 números de um milhão chega a dez bilhões. Subarray máximo usa `long` para não perder essa soma. Escadas também usa `long` para preservar o resultado exato de 77 degraus.

`Long` e `Integer` são versões objeto dos tipos primitivos. `Long` permite que subarray máximo devolva `null` para uma entrada vazia. `Map<Integer, Integer>` usa objetos porque os parâmetros de tipos de coleções Java não aceitam diretamente `int`. O compilador faz as conversões entre primitivo e objeto, chamadas boxing e unboxing.

## Coleções e Unicode

`HashMap` guarda associações por chave. Na soma de dois, a chave é um valor visto e a informação guardada é seu primeiro índice. No anagrama, a chave é um ponto de código e o valor é sua frequência.

`Deque<Character>` descreve uma estrutura que pode funcionar como pilha. `ArrayDeque` implementa essa estrutura. Parênteses usa `push`, `pop` e `isEmpty`; a ordem de remoção é o inverso da ordem de inserção. Nos testes, `ArrayList` acumula valores lidos de listas ligadas, cujo tamanho não é conhecido inicialmente.

`String` usa UTF-16. Um emoji pode ocupar duas unidades `char`. Anagrama percorre `codePoints()` com um iterador para contar pontos de código completos. Não normaliza acentos, não agrupa grafemas e preserva maiúsculas e espaços. Parênteses usa `charAt` porque seu domínio válido contém somente os seis símbolos ASCII.

## Referências, listas e erros

A classe `No` contém `valor` e `proximo`. O valor é `final`, portanto não muda após a criação; `proximo` pode apontar para outro nó ou para `null`. Copiar uma variável `No` copia a referência, não o objeto. Inversão e mesclagem mudam essas ligações reutilizando os mesmos nós. Detecção de ciclo usa `==` para comparar a identidade dos objetos e preserva seus ponteiros.

As funções pressupõem o domínio definido em [contratos](../contratos.md). Uma entrada nula não substitui um array ou uma string vazia. Escadas recebe `double` para também rejeitar os valores fracionários dos casos JSON; valida finitude, integridade e limite antes de converter para `int`. O erro de domínio é `IllegalArgumentException`, equivalente ao `RangeError` registrado nos casos compartilhados.

O resultado de escadas é inteiro e exato em `long`. Não ampliamos o limite de 77 só porque Java comporta resultados maiores: todas as linguagens seguem o mesmo contrato.

## Organização e testes

`pom.xml` configura as pastas de solução e teste para manter cada desafio em seu próprio diretório. `*Test.java` e `_tests` são compilados somente para testes. `target/classes` contém as soluções compiladas e `target/test-classes`, os testes e recursos. O site publica os arquivos `.java` originais, incluindo `No.java` nos desafios de listas.

JUnit 6.0.3 executa os testes; Gson 2.14.0 lê os JSON. Ambos têm escopo `test` no Maven e não são dependências das soluções. O Maven copia diretamente os arquivos de `docs/casos` para os recursos, sem manter resultados duplicados em Java. Cada um dos 86 casos gera um teste com o nome original.

Além desses casos, os testes verificam identidade de nós, estabilidade em empate, ausência de mutação de arrays, todas as posições de retorno de ciclos em listas de até 20 nós, Unicode, aninhamento profundo e somas que ultrapassam `int`. Escadas é comparada com uma contagem combinatória independente em `BigInteger` para todo o domínio.

Soma de dois, busca, lucro, Kadane, parênteses e anagramas são comparados com métodos independentes em entradas geradas com semente fixa. Isso permite reproduzir uma falha sem calcular o esperado com a própria solução.

`npm test` continua executando JavaScript, TypeScript e o gerador do site. Java tem seu comando Maven próprio, executado pela CI e pelo workflow Pages antes da publicação.

Referências: [Maven Wrapper](https://maven.apache.org/wrapper/), [JUnit](https://docs.junit.org/6.0.3/user-guide/) e [Gson](https://google.github.io/gson/).
