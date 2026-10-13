namespace LiveCoding;

public static class SomaDeDois
{
    public static (int Anterior, int Atual)? Resolver(ReadOnlySpan<long> numeros, long alvo)
    {
        var vistos = new Dictionary<long, int>();
        for (int indice = 0; indice < numeros.Length; indice++)
        {
            long valor = numeros[indice];
            if (vistos.TryGetValue(alvo - valor, out int anterior))
            {
                return (anterior, indice);
            }
            // TryAdd conserva a primeira ocorrência para resolver empates.
            vistos.TryAdd(valor, indice);
        }
        return null;
    }
}
