<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->

# Busca binária

Nome na entrevista: **Binary Search**. Pasta: `busca_binaria`.

## Problema

Encontre um alvo em um array ordenado em ordem crescente, descartando metade do intervalo a cada passo.

## Ideia

Corta o intervalo pela metade.

1. Marque o início e o fim do intervalo de busca.
2. Compare o elemento central com o alvo.
3. Se o alvo for maior, avance o início; se for menor, recue o fim. Repita enquanto houver intervalo.

## Exemplo explicado

Em [1, 3, 5, 7, 9], procure 7. O centro é 5; descarte a metade esquerda. O próximo centro é 7, no índice 3.

```js
buscaBinaria([1, 3, 5, 7, 9], 7) // 3
```

## Por que pedir este teste?

O teste mostra se o candidato usa a propriedade de ordenação e mantém limites corretos. Erros de uma posição e laços que não avançam são frequentes.

Capacidades avaliadas:

- Redução de espaço de busca
- Limites e condição de parada
- Raciocínio sobre O(log n)

O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.

## Contrato

Recebe numeros ordenados e alvo. Retorna um índice que contém o alvo ou -1. Com valores repetidos, qualquer índice correspondente é aceito. Não ordena nem modifica o array.

## Complexidade

- Tempo: O(log n).
- Espaço adicional: O(1).

Consulte as definições de complexidade e o domínio das entradas em [Contratos](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/contratos.md).

## Erros comuns

- Aplicar a busca a uma entrada não ordenada
- Não incluir a última posição
- Atualizar um limite para meio sem avançar uma posição

## Casos compartilhados

- **alvo no meio**: entrada `{"numeros":[-1,0,3,5,9,12],"alvo":9}`; saída `4`.
- **ausente no intervalo**: entrada `{"numeros":[-1,0,3,5,9,12],"alvo":2}`; saída `-1`.
- **primeira posição**: entrada `{"numeros":[1,3,5],"alvo":1}`; saída `0`.
- **última posição**: entrada `{"numeros":[1,3,5,7],"alvo":7}`; saída `3`.
- **alvo abaixo**: entrada `{"numeros":[1,3],"alvo":0}`; saída `-1`.
- **alvo acima**: entrada `{"numeros":[1,3],"alvo":4}`; saída `-1`.
- **um elemento**: entrada `{"numeros":[5],"alvo":5}`; saída `0`.
- **um elemento ausente**: entrada `{"numeros":[5],"alvo":4}`; saída `-1`.
- **vazio**: entrada `{"numeros":[],"alvo":1}`; saída `-1`.
- **duplicatas aceitam qualquer índice do alvo**: entrada `{"numeros":[1,2,2,2,3],"alvo":2}`; saída `um dos índices [1,2,3]`.

Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.

## Implementação e testes

- [Solução JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/busca_binaria/index.js)
- [Testes JavaScript](https://github.com/marcosrocha85/testes-live-coding/blob/main/src/javascript/busca_binaria/index.test.js)
- [Casos JSON](https://github.com/marcosrocha85/testes-live-coding/blob/main/docs/casos/busca_binaria.json)
- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#busca_binaria.javascript)

Da raiz do repositório:

```sh
node --test src/javascript/busca_binaria/index.test.js
```
