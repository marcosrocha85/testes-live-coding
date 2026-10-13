using System.Text.Json;

namespace LiveCoding.Testes;

public class SomaDeDoisTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("soma_de_dois");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement, entrada = caso.GetProperty("input");
        long[] valores = TestUtil.Numeros(entrada, "numeros"), copia = [.. valores];
        (int, int)? esperado = caso.GetProperty("expected").ValueKind == JsonValueKind.Null
            ? null : (caso.GetProperty("expected")[0].GetInt32(), caso.GetProperty("expected")[1].GetInt32());
        Assert.Equal(esperado, SomaDeDois.Resolver(valores, entrada.GetProperty("alvo").GetInt64()));
        Assert.Equal(copia, valores);
    }

    private static (int, int)? Referencia(long[] numeros, long alvo)
    {
        for (int j = 0; j < numeros.Length; j++)
            for (int i = 0; i < j; i++)
                if (numeros[i] + numeros[j] == alvo) return (i, j);
        return null;
    }

    [Fact]
    public void ReferenciaExaustivaEPrimeirosIndices()
    {
        var sorteio = new Random(42);
        for (int tamanho = 0; tamanho < 40; tamanho++)
            for (int repeticao = 0; repeticao < 30; repeticao++)
            {
                long[] valores = TestUtil.Sortear(sorteio, tamanho), copia = [.. valores];
                for (long alvo = -21; alvo <= 21; alvo++)
                    Assert.Equal(Referencia(valores, alvo), SomaDeDois.Resolver(valores, alvo));
                Assert.Equal(copia, valores);
            }
    }

    [Fact]
    public void ListaLongaEComplementosDe64Bits()
    {
        long[] longa = Enumerable.Repeat(1_000_000L, 10_000).ToArray();
        Assert.Null(SomaDeDois.Resolver(longa, -1_000_000));
        longa[^1] = -1_000_000;
        Assert.Equal((0, 9999), SomaDeDois.Resolver(longa, 0));
        Assert.Equal((0, 1), SomaDeDois.Resolver([5_000_000_000, -5_000_000_000], 0));
    }
}
