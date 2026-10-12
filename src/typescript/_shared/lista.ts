// No | null significa: existe um nó ou a lista terminou.
export class No {
  valor: number;
  proximo: No | null;

  constructor(valor: number, proximo: No | null = null) {
    this.valor = valor;
    this.proximo = proximo;
  }
}

/** Monta nós reais para exemplos e testes. -1 indica ausência de ciclo. */
export function criarLista(valores: readonly number[], indiceCiclo = -1): No | null {
  if (!Number.isInteger(indiceCiclo) || indiceCiclo < -1 || indiceCiclo >= valores.length) {
    throw new RangeError('Índice de ciclo fora da lista.');
  }
  const nos = valores.map((valor) => new No(valor));
  for (let indice = 0; indice < nos.length - 1; indice++) {
    // O laço garante que as duas posições existem; ! informa isso ao compilador.
    nos[indice]!.proximo = nos[indice + 1]!;
  }
  if (indiceCiclo >= 0) nos[nos.length - 1]!.proximo = nos[indiceCiclo]!;
  return nos[0] ?? null;
}

/** Lê os valores para comparação nos testes e rejeita ciclos. */
export function valoresDaLista(cabeca: No | null): number[] {
  const valores: number[] = [];
  const visitados = new Set<No>();
  for (let atual = cabeca; atual !== null; atual = atual.proximo) {
    if (visitados.has(atual)) throw new Error('A lista contém um ciclo.');
    visitados.add(atual);
    valores.push(atual.valor);
  }
  return valores;
}
