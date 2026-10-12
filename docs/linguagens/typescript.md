# TypeScript

Para compilar e testar sem instalar Node.js ou TypeScript no computador, execute `docker compose run --build --rm typescript` da raiz. Veja [o guia Docker](../docker.md). As instruções de instalação abaixo são para execução local.

Os dez desafios estão implementados, com testes que leem os mesmos casos usados por JavaScript. As soluções ficam em `src/typescript/<desafio>/index.ts`. Cada pasta tem testes e um README que explica o algoritmo e os tipos empregados.

## Instalação e primeiros passos

Use **Node.js 24 ou superior**. O projeto fixa **TypeScript 7.0.2** e **@types/node 24.19.2** como ferramentas de desenvolvimento. `npm ci` instala as versões do lockfile; não é necessário instalar TypeScript globalmente. As soluções usam somente a biblioteca padrão.

Da raiz do repositório:

```sh
npm ci
npm run typecheck
npm run test --workspace src/typescript
```

`typecheck` procura erros de tipos sem produzir arquivos. O comando de testes primeiro compila soluções e testes com `tsc`, depois executa os arquivos JavaScript gerados com o test runner do Node. Os testes JavaScript originais são independentes deste microprojeto.

Para testar somente soma de dois:

```sh
npm run build --workspace src/typescript
node --test src/typescript/dist/soma_de_dois/index.test.js
```

Para executar a solução:

```sh
node --input-type=module -e "import { somaDeDois } from './src/typescript/dist/soma_de_dois/index.js'; console.log(somaDeDois([2, 7, 11, 15], 9));"
```

A saída é `[0, 1]`, pois os valores nessas duas posições somam 9. `dist` é gerado e ignorado pelo Git. O site mostra o `.ts` original para que os tipos continuem visíveis.

## O que TypeScript acrescenta

JavaScript executa os cálculos. TypeScript verifica, antes da execução, se usamos as funções e os valores conforme suas descrições de tipo. Por exemplo:

```ts
function somaDeDois(numeros: readonly number[], alvo: number): [number, number] | null
```

Essa assinatura diz que a função lê um array de números, recebe um alvo numérico e devolve dois índices ou `null`. A implementação está em [soma_de_dois](../../src/typescript/soma_de_dois/index.ts); a linha acima serve apenas para explicar sua assinatura.

- `number` descreve números; `string`, textos; `boolean`, verdadeiro ou falso.
- `readonly number[]` permite leitura do array e impede que a função escreva nele durante a checagem de tipos. Isso não congela o objeto em execução.
- `[number, number]` é uma tupla: tem exatamente duas posições numéricas. `number[]` pode ter qualquer quantidade de posições.
- `number | null` é uma união: o resultado pode ser um número ou ausência de resultado. Antes de usá-lo em um cálculo, verifique se ele é diferente de `null`.
- `Map<string, number>` associa chaves textuais a frequências numéricas. `get` pode devolver `undefined` se a chave não existir.

Os tipos desaparecem na compilação. Dados vindos de JSON, formulários ou código JavaScript continuam precisando de validação em execução quando o contrato a exige. Neste guia, as funções pressupõem o domínio definido em [contratos](../contratos.md); escadas verifica explicitamente seu limite e parênteses rejeita caracteres fora dos seis símbolos permitidos.

## Nós, referências e ausência

O auxiliar de listas usa uma classe com dois campos:

```ts
class No {
  valor: number;
  proximo: No | null;
  constructor(valor: number, proximo: No | null = null) {
    this.valor = valor;
    this.proximo = proximo;
  }
}
```

`proximo` guarda a referência para outro nó, ou `null` quando a lista acaba. Alterar `proximo` muda a ligação do objeto existente. Inversão e mesclagem reutilizam os mesmos nós; detecção de ciclo compara referências com `===` e não muda as ligações.

`import type { No }` traz apenas a descrição necessária ao compilador. `import { No }` traz a classe para criar objetos em execução. As importações relativas terminam em `.js` porque esse será o nome do arquivo executado pelo Node após a compilação. A configuração `NodeNext` permite que TypeScript encontre o `.ts` correspondente.

## Compilação estrita

`tsconfig.json` ativa `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noUnusedLocals`, `noUnusedParameters` e `noEmitOnError`. Assim, um erro de tipo impede a geração dos arquivos que os testes usariam. As regras estão descritas na [referência oficial de configuração](https://www.typescriptlang.org/tsconfig/).

`strict` inclui a exigência de tratar `null`. Depois de verificar `atual !== null`, o compilador permite ler `atual.proximo`: ele restringiu as possibilidades do tipo nesse trecho.

Com `noUncheckedIndexedAccess`, `numeros[indice]` pode ser `undefined`. Na busca binária, os limites do laço garantem que o índice existe. O `!` usado na leitura comunica essa garantia ao compilador. Ele não insere uma validação em execução e só deve ser usado quando essa garantia foi demonstrada. Veja a [explicação oficial dessa opção](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html).

`_shared/casos.ts` associa cada nome de desafio ao tipo de entrada e de saída de seu adaptador. A asserção na leitura do JSON descreve os arquivos de teste versionados; ela não é um validador de dados externos.

## Unicode, precisão e mutação

TypeScript mantém a representação dos valores do JavaScript. `number` não vira um inteiro de precisão arbitrária: escadas aceita somente inteiros de 0 a 77. Os testes conferem todo esse intervalo com uma contagem combinatória independente em `BigInt`.

Strings usam UTF-16. No anagrama, `for...of` percorre pontos de código, inclusive emojis. Não normalizamos acentos, não juntamos grafemas e não ignoramos espaços ou maiúsculas. Os testes incluem textos com as mesmas unidades UTF-16 e pontos de código diferentes.

As funções numéricas recebem arrays `readonly` e mantêm seus conteúdos. Os testes também passam arrays congelados para detectar escritas em execução. Listas ligadas seguem os efeitos previstos no contrato: inversão e mesclagem mudam ponteiros; detecção de ciclo não modifica os nós.

## O que os testes verificam

- Os 86 casos compartilhados, sem redefinir seus resultados.
- Identidade dos nós, terminação da lista e preferência da primeira lista em empate.
- Ausência de ciclos e todas as posições de retorno em listas de 0 a 20 nós, com os objetos congelados durante a detecção.
- Soma de dois, busca, lucro, Kadane e parênteses comparados com métodos independentes e entradas reproduzíveis.
- Precisão de escadas, Unicode e ausência de mutação de arrays.
- Chamadas inválidas detectadas pelo compilador em `tipos.test.ts`. `@ts-expect-error` faz a compilação falhar se uma assinatura deixar de rejeitar um exemplo inválido.
- Validação de escadas quando um consumidor JavaScript passa entradas incompatíveis, em `entrada-javascript.test.mjs`.

Para investigar cobertura:

```sh
npm run test:coverage --workspace src/typescript
```

Leia o README de cada desafio para acompanhar a lógica e, depois, os testes para entender quais erros eles detectam.
