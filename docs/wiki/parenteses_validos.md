<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Parênteses válidos

Nome na entrevista: **Valid Parentheses**. Pasta: `parenteses_validos`.

## Problema

Verifique se uma sequência de (), [] e {} abre e fecha cada par na ordem correta.

## Ideia

Pilha de aberturas.

1. Guarde cada símbolo de abertura no topo de uma pilha.
2. Quando chegar um fechamento, retire a última abertura e compare o par.
3. No fim, a pilha precisa estar vazia.

## Exemplo explicado

Em ([]): empilhe (, empilhe [, retire [ ao ler ], retire ( ao ler ). Não sobra nada, então a sequência é válida.

```js
parentesesValidos('([])') // true
```

## Por que pedir este teste?

Contar símbolos não é suficiente: ([)] tem contagens certas e ordem errada. O teste avalia se o candidato modela a ordem de fechamento com uma pilha.

Capacidades avaliadas:

- Pilha: último a entrar, primeiro a sair
- Controle de ordem e aninhamento
- Detecção antecipada de entrada inválida

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe texto. Retorna boolean. A string vazia é válida; qualquer caractere diferente de ()[]{} torna a entrada inválida.

## Complexidade

- Tempo: O(n).
- Espaço adicional: O(n).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Comparar apenas a quantidade de aberturas e fechamentos
- Aceitar fechamento sem abertura
- Esquecer de conferir as aberturas restantes

## Casos compartilhados

- **pares simples**: entrada `{"texto":"()[]{}"}`; saída `true`.
- **aninhados**: entrada `{"texto":"{[()]}"}`; saída `true`.
- **fechamento incorreto**: entrada `{"texto":"(]"}`; saída `false`.
- **ordem cruzada**: entrada `{"texto":"([)]"}`; saída `false`.
- **abertura restante**: entrada `{"texto":"(("}`; saída `false`.
- **fechamento sem abertura**: entrada `{"texto":"]"}`; saída `false`.
- **vazio**: entrada `{"texto":""}`; saída `true`.
- **caractere fora do domínio**: entrada `{"texto":"(a)"}`; saída `false`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/parenteses_validos/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/parenteses_validos/index.test.js)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/parenteses_validos.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#parenteses_validos.javascript)

Da raiz do repositório:

```sh
node --test src/javascript/parenteses_validos/index.test.js
```
