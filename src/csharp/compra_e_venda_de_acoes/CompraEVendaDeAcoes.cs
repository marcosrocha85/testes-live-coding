namespace LiveCoding;

public static class CompraEVendaDeAcoes
{
    public static long MaiorLucro(ReadOnlySpan<long> precos)
    {
        if (precos.IsEmpty) return 0;
        long menor = precos[0], lucro = 0;
        foreach (long preco in precos[1..])
        {
            // A venda usa somente o menor preço dos dias anteriores.
            lucro = Math.Max(lucro, preco - menor);
            menor = Math.Min(menor, preco);
        }
        return lucro;
    }
}
