namespace LiveCoding;

public static class BuscaBinaria
{
    public static int Buscar(ReadOnlySpan<long> numeros, long alvo)
    {
        // O intervalo exclui direita, inclusive na entrada vazia.
        int esquerda = 0, direita = numeros.Length;
        while (esquerda < direita)
        {
            int meio = esquerda + (direita - esquerda) / 2;
            if (numeros[meio] == alvo) return meio;
            if (numeros[meio] < alvo) esquerda = meio + 1;
            else direita = meio;
        }
        return -1;
    }
}
