namespace LiveCoding;

public static class SubarrayMaximo
{
    public static long? Somar(ReadOnlySpan<long> numeros)
    {
        if (numeros.IsEmpty) return null;
        // Iniciar no primeiro valor preserva respostas inteiramente negativas.
        long atual = numeros[0], melhor = atual;
        foreach (long valor in numeros[1..])
        {
            atual = Math.Max(valor, atual + valor);
            melhor = Math.Max(melhor, atual);
        }
        return melhor;
    }
}
