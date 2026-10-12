/** Aceita (), [] e {} bem aninhados. Outros caracteres são inválidos. */
export function parentesesValidos(texto: string): boolean {
  const pilha: string[] = [];
  const aberturaPorFechamento = new Map<string, string>([[')', '('], [']', '['], ['}', '{']]);
  for (const caractere of texto) {
    if ('([{'.includes(caractere)) {
      pilha.push(caractere);
    } else {
      const abertura = aberturaPorFechamento.get(caractere);
      // O último símbolo aberto precisa ser o primeiro a fechar.
      if (abertura === undefined || pilha.pop() !== abertura) return false;
    }
  }
  return pilha.length === 0;
}
