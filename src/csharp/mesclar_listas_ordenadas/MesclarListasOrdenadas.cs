namespace LiveCoding;

public static class MesclarListasOrdenadas
{
    public static No? Mesclar(No? primeira, No? segunda)
    {
        var sentinela = new No(0);
        No cauda = sentinela;
        while (primeira is not null && segunda is not null)
        {
            // <= mantém os nós da primeira lista antes dos da segunda em empate.
            if (primeira.Valor <= segunda.Valor)
            {
                cauda.Proximo = primeira;
                primeira = primeira.Proximo;
            }
            else
            {
                cauda.Proximo = segunda;
                segunda = segunda.Proximo;
            }
            cauda = cauda.Proximo;
        }
        cauda.Proximo = primeira ?? segunda;
        return sentinela.Proximo;
    }
}
