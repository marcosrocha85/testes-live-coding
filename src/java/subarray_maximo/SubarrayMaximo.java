package tinker.livecoding.subarray_maximo;

public final class SubarrayMaximo {
    private SubarrayMaximo() {}

    /** Maior soma de um trecho contíguo não vazio; null indica array vazio. */
    public static Long subarrayMaximo(int[] numeros) {
        if (numeros.length == 0) return null;
        // A soma pode chegar a 10 bilhões no contrato, ultrapassando o tipo int.
        long somaAtual = numeros[0];
        long melhorSoma = somaAtual;
        for (int indice = 1; indice < numeros.length; indice++) {
            somaAtual = Math.max(numeros[indice], somaAtual + numeros[indice]);
            melhorSoma = Math.max(melhorSoma, somaAtual);
        }
        return melhorSoma;
    }
}
