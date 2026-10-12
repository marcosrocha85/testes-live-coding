/** Compara contagens de pontos de código Unicode, distinguindo maiúsculas e espaços. */
export function anagramaValido(primeiro, segundo) {
  const contagem = new Map();
  // for...of percorre pontos de código, incluindo emojis fora do plano básico.
  for (const caractere of primeiro) contagem.set(caractere, (contagem.get(caractere) ?? 0) + 1);
  for (const caractere of segundo) {
    if (!contagem.has(caractere)) return false;
    const restante = contagem.get(caractere) - 1;
    if (restante === 0) contagem.delete(caractere);
    else contagem.set(caractere, restante);
  }
  return contagem.size === 0;
}
