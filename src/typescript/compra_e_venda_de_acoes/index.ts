/** Maior lucro de uma compra seguida de venda; retorna 0 se não houver lucro. */
export function maiorLucro(precos: readonly number[]): number {
  let menorPreco = Infinity;
  let lucroMaximo = 0;
  for (const preco of precos) {
    // O menor preço foi visto antes deste dia, respeitando a ordem compra/venda.
    lucroMaximo = Math.max(lucroMaximo, preco - menorPreco);
    menorPreco = Math.min(menorPreco, preco);
  }
  return lucroMaximo;
}
