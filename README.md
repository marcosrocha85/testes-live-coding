# Testes de live coding

Um guia de estudo para entender, implementar e explicar desafios comuns de entrevistas técnicas. Cada solução tem comentários simples, testes automatizados e uma explicação do raciocínio e da capacidade avaliada.

Os **dez desafios estão implementados em JavaScript, TypeScript e Java**, com testes próprios para cada linguagem. As próximas etapas serão Kotlin, PHP, Swift, Pascal e C++, uma linguagem por vez, com revisão de Marcos Rocha.

- [Catálogo com abas por linguagem no GitHub Pages](https://marcosrocha85.github.io/testes-live-coding/)
- [Wiki do projeto](https://github.com/marcosrocha85/testes-live-coding/wiki)
- [Explicações dos desafios](docs/tests/README.md)
- [Arquitetura](docs/arquitetura.md) e [contratos dos testes](docs/contratos.md)
- [Guia de JavaScript para iniciantes](docs/linguagens/javascript.md)
- [Guia de TypeScript para iniciantes](docs/linguagens/typescript.md)
- [Guia de Java para iniciantes](docs/linguagens/java.md)
- [Roteiro e issues por linguagem](docs/roadmap.md)

O site é atualizado após a integração de cada entrega à `main`. A Wiki tem explicações dos dez desafios; suas fontes estão versionadas em [docs/wiki](docs/wiki/Home.md).

## Como começar

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

Java tem testes JUnit independentes dos workspaces npm. As soluções usam a biblioteca padrão; JUnit e Gson são dependências somente dos testes. A CI confere as três linguagens antes da publicação da aba Java.

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
  kotlin/ php/ swift/ pascal/ cpp/  # Etapas planejadas
scripts/                  # Geradores, preview e publicação da Wiki
.github/                  # CI, publicação e templates de issues
```

Cada linguagem será um microprojeto independente, com ferramentas e testes adequados a ela. Uma linguagem planejada ainda não contém soluções. A documentação diferencia explicitamente o que está pronto do que está no roteiro.

## Comandos úteis

| Comando | Finalidade |
| --- | --- |
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
