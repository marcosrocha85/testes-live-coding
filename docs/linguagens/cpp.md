# C++

**Estado: planejado.** A etapa vem depois da linguagem anterior no [roteiro](../roadmap.md). Este documento registra os pontos a explicar; ainda não apresenta uma implementação nem comandos de teste validados.

## Plano do microprojeto

Padrão de linguagem, compilador e runner serão definidos na etapa. A solução deve explicar propriedade e vida útil dos nós.

## Conceitos que a documentação deverá explicar

std::vector; std::unordered_map; ponteiros e RAII; int64_t; testes e decodificação de UTF-8 por pontos de código.

O guia final deverá ensinar instalação, versões, execução de um desafio e comando de testes, com um exemplo simples.

## Critérios para publicar

- Implementar os dez desafios em `src/cpp/`.
- Consumir os casos de `docs/casos/` e documentar os equivalentes de ausência e erro.
- Testar identidade e mutação de nós, quando se aplicarem.
- Preservar contagem de pontos de código no anagrama e precisão de inteiros em escadas.
- Incluir a execução dos testes na CI e disponibilizar os arquivos reais no catálogo.

Consulte [os contratos](../contratos.md) antes de implementar.
