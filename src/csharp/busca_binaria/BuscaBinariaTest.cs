using System.Text.Json;

namespace LiveCoding.Testes;

public class BuscaBinariaTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("busca_binaria");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement, entrada = caso.GetProperty("input");
        long[] valores = TestUtil.Numeros(entrada, "numeros"), copia = [.. valores];
        int obtido = BuscaBinaria.Buscar(valores, entrada.GetProperty("alvo").GetInt64());
        if (caso.TryGetProperty("expectedIndices", out JsonElement indices))
            Assert.Contains(obtido, indices.EnumerateArray().Select(i => i.GetInt32()));
        else Assert.Equal(caso.GetProperty("expected").GetInt32(), obtido);
        Assert.Equal(copia, valores);
    }

    private static void Conferir(long[] valores, long alvo)
    {
        int[] esperados = Enumerable.Range(0, valores.Length).Where(i => valores[i] == alvo).ToArray();
        int obtido = BuscaBinaria.Buscar(valores, alvo);
        if (esperados.Length == 0) Assert.Equal(-1, obtido);
        else Assert.Contains(obtido, esperados);
    }

    [Fact]
    public void ReferenciaLinearEDuplicatas()
    {
        var sorteio = new Random(42);
        for (int tamanho = 0; tamanho < 100; tamanho++)
        {
            long[] valores = TestUtil.Sortear(sorteio, tamanho);
            Array.Sort(valores);
            long[] copia = [.. valores];
            for (long alvo = -12; alvo <= 12; alvo++) Conferir(valores, alvo);
            Assert.Equal(copia, valores);
        }
    }

    [Fact]
    public void ListaLongaEValoresDe64Bits()
    {
        long[] longa = Enumerable.Repeat(1_000_000L, 10_000).ToArray();
        Conferir(longa, 1_000_000);
        Conferir(longa, -1_000_000);
        Conferir([-5_000_000_000, 0, 5_000_000_000], 5_000_000_000);
    }
}
