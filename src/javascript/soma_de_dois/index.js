/** Retorna os índices de dois números cuja soma é o alvo, ou null. */
export function somaDeDois(numeros, alvo) {
  const vistos = new Map();
  for (let indice = 0; indice < numeros.length; indice++) {
    const complemento = alvo - numeros[indice];
    // Procuramos antes de guardar: assim não usamos a mesma posição duas vezes.
    if (vistos.has(complemento)) return [vistos.get(complemento), indice];
    // Preserva o primeiro índice caso o mesmo valor apareça novamente.
    if (!vistos.has(numeros[indice])) vistos.set(numeros[indice], indice);
  }
  return null;
}
