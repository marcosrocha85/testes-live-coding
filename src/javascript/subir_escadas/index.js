/** Conta formas de subir com passos de 1 ou 2. Zero degraus tem uma forma: ficar parado. */
export function subirEscadas(degraus) {
  // Acima de 77 a resposta deixa de ser um inteiro exato em Number.
  if (!Number.isInteger(degraus) || degraus < 0 || degraus > 77) {
    throw new RangeError('Use um número inteiro de degraus entre 0 e 77.');
  }
  let anterior = 1; // Formas de chegar ao degrau 0.
  let atual = 1; // Formas de chegar ao degrau 1.
  for (let degrau = 2; degrau <= degraus; degrau++) {
    // O último passo veio do degrau anterior ou de dois degraus atrás.
    [anterior, atual] = [atual, anterior + atual];
  }
  return atual;
}
