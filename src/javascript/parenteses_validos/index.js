/** Verifica se (), [] e {} fecham na ordem correta; outros caracteres são inválidos. */
export function parentesesValidos(texto) {
  const pilha = [];
  const aberturaPorFechamento = new Map([[')', '('], [']', '['], ['}', '{']]);
  for (const caractere of texto) {
    if ('([{'.includes(caractere)) {
      pilha.push(caractere);
    } else {
      // O último símbolo aberto precisa ser o primeiro a fechar.
      if (!aberturaPorFechamento.has(caractere) || pilha.pop() !== aberturaPorFechamento.get(caractere)) {
        return false;
      }
    }
  }
  return pilha.length === 0;
}
