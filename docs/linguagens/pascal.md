# Pascal

**Estado: planejado.** A etapa vem depois da linguagem anterior no [roteiro](../roadmap.md). Este documento registra os pontos a explicar; ainda não apresenta uma implementação nem comandos de teste validados.

## Plano do microprojeto

Compilador e dialeto serão definidos na etapa. Free Pascal é uma opção a revisar, com testes automatizados executáveis.

## Conceitos que a documentação deverá explicar

Arrays; registros e ponteiros; alocação e liberação de nós; Int64; mapas e decodificação de Unicode conforme o dialeto.

O guia final deverá ensinar instalação, versões, execução de um desafio e comando de testes, com um exemplo simples.

## Critérios para publicar

- Implementar os dez desafios em `src/pascal/`.
- Consumir os casos de `docs/casos/` e documentar os equivalentes de ausência e erro.
- Testar identidade e mutação de nós, quando se aplicarem.
- Preservar contagem de pontos de código no anagrama e precisão de inteiros em escadas.
- Incluir a execução dos testes na CI e disponibilizar os arquivos reais no catálogo.

Consulte [os contratos](../contratos.md) antes de implementar.
