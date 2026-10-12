/** Compara pontos de código Unicode, preservando maiúsculas e espaços. */
export function anagramaValido(primeiro: string, segundo: string): boolean {
  const contagem = new Map<string, number>();
  // for...of percorre pontos de código completos, inclusive emojis.
  for (const caractere of primeiro) contagem.set(caractere, (contagem.get(caractere) ?? 0) + 1);
  for (const caractere of segundo) {
    const quantidade = contagem.get(caractere);
    if (quantidade === undefined) return false;
    const restante = quantidade - 1;
    if (restante === 0) contagem.delete(caractere);
    else contagem.set(caractere, restante);
  }
  return contagem.size === 0;
}
