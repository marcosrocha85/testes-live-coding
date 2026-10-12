/** Conta maneiras de subir com passos de 1 ou 2; zero degraus tem uma maneira. */
export function subirEscadas(degraus: number): number {
  // Tipos desaparecem na compilação. Esta regra também precisa valer em execução.
  if (!Number.isInteger(degraus) || degraus < 0 || degraus > 77) {
    throw new RangeError('Use um número inteiro de degraus entre 0 e 77.');
  }
  let anterior = 1;
  let atual = 1;
  for (let degrau = 2; degrau <= degraus; degrau++) {
    // O último passo veio de um degrau atrás ou de dois degraus atrás.
    [anterior, atual] = [atual, anterior + atual];
  }
  return atual;
}
