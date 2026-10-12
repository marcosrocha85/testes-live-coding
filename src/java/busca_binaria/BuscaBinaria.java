package tinker.livecoding.busca_binaria;

public final class BuscaBinaria {
    private BuscaBinaria() {}

    /** Retorna um índice do alvo em um array ordenado, ou -1 se ele não existe. */
    public static int buscaBinaria(int[] numeros, int alvo) {
        int esquerda = 0;
        int direita = numeros.length - 1;
        while (esquerda <= direita) {
            int meio = esquerda + (direita - esquerda) / 2;
            if (numeros[meio] == alvo) return meio;
            // A ordenação permite descartar a metade que não pode conter o alvo.
            if (numeros[meio] < alvo) esquerda = meio + 1;
            else direita = meio - 1;
        }
        return -1;
    }
}
