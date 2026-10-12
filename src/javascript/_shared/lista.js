// Cada nó guarda um valor e a referência ao próximo nó da lista.
export class No {
  constructor(valor, proximo = null) {
    this.valor = valor;
    this.proximo = proximo;
  }
}

// O índice do ciclo é -1 para uma lista normal ou a posição de retorno da cauda.
export function criarLista(valores, indiceCiclo = -1) {
  if (!Number.isInteger(indiceCiclo) || indiceCiclo < -1 || indiceCiclo >= valores.length) {
    throw new RangeError('Índice de ciclo fora da lista.');
  }
  const nos = valores.map((valor) => new No(valor));
  for (let indice = 0; indice < nos.length - 1; indice++) {
    nos[indice].proximo = nos[indice + 1];
  }
  if (indiceCiclo >= 0) nos.at(-1).proximo = nos[indiceCiclo];
  return nos[0] ?? null;
}

// Usado nos exemplos e testes. Detecta ciclos para nunca ficar preso em um laço.
export function valoresDaLista(cabeca) {
  const valores = [];
  const visitados = new Set();
  for (let atual = cabeca; atual !== null; atual = atual.proximo) {
    if (visitados.has(atual)) throw new Error('A lista contém um ciclo.');
    visitados.add(atual);
    valores.push(atual.valor);
  }
  return valores;
}
