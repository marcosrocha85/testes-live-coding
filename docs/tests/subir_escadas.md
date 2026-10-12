<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Subir escadas

Nome na entrevista: **Climbing Stairs**. Pasta: `subir_escadas`.

## Problema

Conte quantas sequências de passos de um ou dois degraus levam ao topo de uma escada.

## Ideia

Fibonacci: passo de 1 ou de 2.

1. Há uma forma de chegar a zero degraus e uma de chegar a um degrau.
2. Para chegar ao degrau n, o último passo vem de n - 1 ou n - 2.
3. Some essas duas contagens e guarde apenas as últimas duas.

## Exemplo explicado

Com 3 degraus, as sequências são 1+1+1, 1+2 e 2+1. Portanto, formas(3) = formas(2) + formas(1) = 2 + 1 = 3.

```js
subirEscadas(3) // 3
```

## Por que pedir este teste?

O teste avalia se o candidato reconhece subproblemas repetidos e evita uma recursão que recalcula a mesma resposta muitas vezes. Também permite discutir limites numéricos entre linguagens.

Capacidades avaliadas:

- Recorrência e casos base
- Programação dinâmica
- Precisão e limites de inteiros

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe degraus inteiro de 0 a 77. Retorna uma contagem inteira exata. Para zero, retorna 1: a sequência vazia. JavaScript lança RangeError para entrada fora do domínio. Portes devem rejeitar os mesmos valores usando um erro idiomático.

## Complexidade

- Tempo: O(n).
- Espaço adicional: O(1).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Não definir o caso de zero degraus
- Contar 1+2 e 2+1 como a mesma sequência
- Usar um tipo numérico que não comporta a resposta

## Casos compartilhados

- **zero degraus**: entrada `{"degraus":0}`; saída `1`.
- **um degrau**: entrada `{"degraus":1}`; saída `1`.
- **dois degraus**: entrada `{"degraus":2}`; saída `2`.
- **três degraus**: entrada `{"degraus":3}`; saída `3`.
- **cinco degraus**: entrada `{"degraus":5}`; saída `8`.
- **45 degraus**: entrada `{"degraus":45}`; saída `1836311903`.
- **maior entrada exata**: entrada `{"degraus":77}`; saída `8944394323791464`.
- **negativo inválido**: entrada `{"degraus":-1}`; saída `erro RangeError`.
- **fracionário inválido**: entrada `{"degraus":1.5}`; saída `erro RangeError`.
- **limite excedido**: entrada `{"degraus":78}`; saída `erro RangeError`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/subir_escadas/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/subir_escadas/index.test.js)
- [Solução TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/subir_escadas/index.ts)
- [Testes TypeScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/typescript/subir_escadas/index.test.ts)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/subir_escadas.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#subir_escadas.javascript)

### JavaScript

Da raiz do repositório, após `npm ci`:

```sh
node --test src/javascript/subir_escadas/index.test.js
```

### TypeScript

Da raiz do repositório, após `npm ci`:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/subir_escadas/index.test.js
```
