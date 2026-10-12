<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Anagrama válido

Nome na entrevista: **Valid Anagram**. Pasta: `anagrama_valido`.

## Problema

Verifique se duas strings têm exatamente os mesmos caracteres com as mesmas quantidades.

## Ideia

Contagem de runes (pontos de código Unicode).

1. Conte cada ponto de código da primeira string.
2. Percorra a segunda e desconte cada ocorrência.
3. Se faltar um caractere ou sobrar alguma contagem, não é anagrama.

## Exemplo explicado

Em amor e roma, a primeira string fornece uma ocorrência de a, m, o e r. A segunda consome todas as quatro, sem sobrar nenhuma.

```js
anagramaValido('amor', 'roma') // true
```

## Por que pedir este teste?

Ter as mesmas letras distintas não basta: as quantidades também importam. O teste avalia mapas de frequência e abre uma discussão sobre como cada linguagem percorre Unicode.

Capacidades avaliadas:

- Mapa de frequências
- Multiplicidade de caracteres
- Pontos de código Unicode

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe primeiro e segundo. Compara pontos de código, com maiúsculas, espaços e acentos significativos. Não normaliza Unicode: é e e seguido de acento combinante são diferentes. Ambas vazias retornam true.

## Complexidade

- Tempo: O(n + m) em média.
- Espaço adicional: O(k), com k pontos de código distintos na primeira string.

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Comparar apenas conjuntos de caracteres
- Ignorar letras repetidas
- Confundir bytes, unidades UTF-16, pontos de código e caracteres visuais

## Casos compartilhados

- **anagrama**: entrada `{"primeiro":"anagram","segundo":"nagaram"}`; saída `true`.
- **letras diferentes**: entrada `{"primeiro":"rat","segundo":"car"}`; saída `false`.
- **contagens diferentes**: entrada `{"primeiro":"aab","segundo":"abb"}`; saída `false`.
- **sobra da primeira string**: entrada `{"primeiro":"aa","segundo":"a"}`; saída `false`.
- **sobra da segunda string**: entrada `{"primeiro":"a","segundo":"aa"}`; saída `false`.
- **vazias**: entrada `{"primeiro":"","segundo":""}`; saída `true`.
- **maiúsculas importam**: entrada `{"primeiro":"Amor","segundo":"roma"}`; saída `false`.
- **acentos**: entrada `{"primeiro":"ação","segundo":"oãça"}`; saída `true`.
- **emojis**: entrada `{"primeiro":"😀a😀","segundo":"😀😀a"}`; saída `true`.
- **espaços importam**: entrada `{"primeiro":"a b","segundo":"ab"}`; saída `false`.
- **sem normalização Unicode**: entrada `{"primeiro":"é","segundo":"é"}`; saída `false`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/anagrama_valido/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/anagrama_valido/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/anagrama_valido/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/anagrama_valido/index.test.ts)
- [Solução Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/anagrama_valido/AnagramaValido.java)
- [Testes Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/java/anagrama_valido/AnagramaValidoTest.java)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/anagrama_valido.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#anagrama_valido.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/anagrama_valido/index.test.js
```

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/anagrama_valido/index.test.js
```

### Java

Da raiz, com JDK 21 ou superior. Linux/macOS:

```sh
./src/java/mvnw -f src/java/pom.xml -Dtest=AnagramaValidoTest test
```

PowerShell:

```powershell
.\src\java\mvnw.cmd -f src/java/pom.xml "-Dtest=AnagramaValidoTest" test
```

## Particularidades em Java

`String` usa UTF-16, mas `codePoints()` percorre pontos de código inteiros. `PrimitiveIterator.OfInt` permite ler cada ponto sem copiar toda a string para um array. O mapa liga cada ponto à sua frequência. Não há normalização, comparação de grafemas ou remoção de espaços.

## Exemplo em Java

Compile com Maven e abra `jshell --class-path src/java/target/classes` da raiz. No JShell, execute:

```java
import tinker.livecoding.anagrama_valido.AnagramaValido;

System.out.println(AnagramaValido.anagramaValido("😀a😀", "😀😀a")); // true
```

Veja [o guia de Java](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/linguagens/java.md) para instalação, ferramentas, tipos e comandos.
