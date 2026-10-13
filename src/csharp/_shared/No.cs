namespace LiveCoding;

public sealed class No
{
    public long Valor { get; }
    public No? Proximo { get; set; }

    public No(long valor, No? proximo = null)
    {
        Valor = valor;
        Proximo = proximo;
    }
}
