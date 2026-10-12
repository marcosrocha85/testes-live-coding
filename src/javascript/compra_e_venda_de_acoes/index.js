/** Calcula o maior lucro de uma compra seguida de uma venda. Sem lucro, retorna 0. */
export function maiorLucro(precos) {
  let menorPreco = Infinity;
  let lucroMaximo = 0;
  for (const preco of precos) {
    // O menor preço veio antes deste dia: a venda nunca antecede a compra.
    lucroMaximo = Math.max(lucroMaximo, preco - menorPreco);
    menorPreco = Math.min(menorPreco, preco);
  }
  return lucroMaximo;
}
