# Kotlin para iniciantes

Os dez desafios estão implementados em Kotlin/JVM, sem importar as soluções Java. Kotlin compila para a JVM: seus programas usam a biblioteca padrão Kotlin e podem acessar recursos do JDK, como `String.codePoints()`.

## Testar sem instalar SDK

Da raiz do clone, com Docker em modo Linux:

```sh
docker compose run --build --rm kotlin
```

A imagem tem JDK 21. O Gradle Wrapper baixa Gradle 9.7.0 e o plugin Kotlin 2.4.21. O comando compila as soluções, executa toda a suíte JUnit e gera o JAR dentro do container, como usuário sem privilégios. Nenhum SDK ou compilador Kotlin é instalado no computador. O container é removido; o cache Gradle fica no volume do projeto. Veja [o guia Docker](../docker.md).

Para testar só busca binária:

```sh
docker compose run --build --rm kotlin ./src/kotlin/gradlew --no-daemon -p src/kotlin test --tests BuscaBinariaTest
```

## Alternativa com JDK local

Se você já usa JDK 21, não precisa instalar Gradle nem o compilador Kotlin separadamente. O Wrapper incluído baixa as ferramentas no primeiro uso e verifica o SHA-256 da distribuição Gradle. Da raiz, em Linux/macOS:

```sh
./src/kotlin/gradlew --no-daemon -p src/kotlin clean check jar
```

No PowerShell:

```powershell
.\src\kotlin\gradlew.bat --no-daemon -p src/kotlin clean check jar
```

`clean` remove o build anterior; `check` compila e executa os testes; `jar` empacota as soluções. A primeira execução precisa de acesso às distribuições Gradle, ao portal de plugins e ao Maven Central. Os resultados ficam em `src/kotlin/build`, ignorado pelo Git. O relatório navegável dos testes é `src/kotlin/build/reports/tests/test/index.html` na execução local. No Docker, esse relatório fica no container temporário.

O projeto usa a toolchain JDK 21 e não configura download automático de JDK. `npm test` não executa Kotlin. A CI executa tanto o Wrapper com JDK 21 quanto o serviço Docker, e o workflow Pages testa Kotlin antes de publicar.

## Lendo uma solução

```kotlin
import livecoding.soma_de_dois.somaDeDois

fun main() {
    val numeros = intArrayOf(2, 7, 11, 15)
    val resposta = somaDeDois(numeros, 9)
    println(resposta?.contentToString()) // [0, 1]
}
```

Esse exemplo mostra uma chamada dentro de um programa Kotlin que use as fontes deste microprojeto. As funções são declaradas no topo do arquivo, sem precisar criar uma classe de serviço. `package` organiza seus nomes; `import` permite chamar uma função de outro pacote. Cada desafio tem seu próprio exemplo no README.

- `fun` declara uma função. `val` impede reatribuir a variável; `var` permite reatribuição. Um objeto guardado em `val` ainda pode ser mutável.
- `IntArray` guarda números de 32 bits. `intArrayOf(...)` cria um array. Índices começam em zero. A função de soma não modifica esse array, embora o tipo permita escrita.
- `IntArray?` permite um array ou `null`. `?.` só chama o método quando há uma resposta. `contentToString()` mostra os elementos do array.
- `?:` é o operador Elvis: fornece uma alternativa quando o valor à esquerda é nulo. `when` escolhe entre condições. `for` percorre uma faixa ou coleção.
- `mutableMapOf` cria um mapa alterável. `ArrayDeque` funciona como pilha usando a mesma ponta para inserir e remover.

## Inteiros, ausência e erro

Os elementos do contrato cabem em `Int`, mas uma soma pode chegar a dez bilhões. O subarray máximo usa `Long?`: `Long` tem 64 bits e `null` representa a entrada vazia. A conversão para `Long` acontece antes da soma.

Escadas devolve `Long`, incluindo a contagem exata de `8.944.394.323.791.464` para 77 degraus. A entrada é `Double` para validar frações dos casos externos; chame `subirEscadas(3.0)` ou `subirEscadas(n.toDouble())`. Kotlin não faz a conversão implícita de `Int` para `Double`. `require` rejeita negativos, frações, valores acima de 77, NaN e infinitos com `IllegalArgumentException`, o equivalente idiomático ao erro de domínio dos casos compartilhados.

## Nós, identidade e Unicode

`No(val valor: Int, var proximo: No? = null)` é uma classe comum. Cada instância é um nó real. `===` compara se duas referências apontam para o mesmo objeto; `==` usa igualdade. Evitamos `data class` para os nós, pois igualdade estrutural automática pode seguir referências recursivas, inclusive ciclos.

Inverter e mesclar alteram as ligações e reutilizam os nós recebidos. Detectar ciclo só lê os ponteiros. Os arrays dos JSON são convertidos em nós apenas nos testes. A solução não substitui a lista por um array.

Na JVM, `Char` é uma unidade UTF-16. Um emoji pode ocupar duas unidades. Anagrama usa `codePoints().iterator()` para contar pontos de código completos, sem copiar toda a string. Não normaliza acentos, não ignora espaços e não transforma maiúsculas. Parênteses aceita somente seis símbolos ASCII, portanto a leitura por `Char` serve para esse contrato.

## Como os testes dão confiança

JUnit 6.0.3 executa os testes; Gson 2.14.0 lê os 86 casos canônicos de `docs/casos`, copiados como recursos pelo Gradle. Ambos são dependências somente dos testes. A biblioteca padrão Kotlin é a única dependência adicional das soluções.

Os 16 testes extras verificam nós e ponteiros, listas longas, somas além de `Int`, Unicode e o domínio completo de escadas usando combinações com `BigInteger`. Seis deles comparam algoritmos com referências independentes em entradas reproduzíveis: por exemplo, Kadane contra todos os trechos e anagrama contra ordenação de pontos de código.

Referências: [configuração Kotlin/Gradle e versões compatíveis](https://kotlinlang.org/docs/gradle-configure-project.html), [null safety](https://kotlinlang.org/docs/null-safety.html), [igualdade](https://kotlinlang.org/docs/equality.html), [Gradle Wrapper](https://docs.gradle.org/current/userguide/gradle_wrapper.html) e [JUnit](https://docs.junit.org/6.0.3/overview.html).
