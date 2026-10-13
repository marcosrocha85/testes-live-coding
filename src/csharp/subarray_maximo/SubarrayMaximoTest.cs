using System.Text.Json;

namespace LiveCoding.Testes;

public class SubarrayMaximoTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("subarray_maximo");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement;
        long[] valores = TestUtil.Numeros(caso.GetProperty("input"), "numeros"), copia = [.. valores];
        long? esperado = caso.GetProperty("expected").ValueKind == JsonValueKind.Null ? null : caso.GetProperty("expected").GetInt64();
        Assert.Equal(esperado, SubarrayMaximo.Somar(valores));
        Assert.Equal(copia, valores);
    }

    private static long? Referencia(long[] valores)
    {
        var somas = new List<long>();
        for (int inicio = 0; inicio < valores.Length; inicio++)
            for (int fim = inicio + 1; fim <= valores.Length; fim++)
                somas.Add(valores[inicio..fim].Sum());
        return somas.Count == 0 ? null : somas.Max();
    }

    [Fact]
    public void ReferenciaDeTodosOsTrechos()
    {
        var sorteio = new Random(42);
        for (int tamanho = 0; tamanho < 35; tamanho++)
            for (int repeticao = 0; repeticao < 30; repeticao++)
            {
                long[] valores = TestUtil.Sortear(sorteio, tamanho), copia = [.. valores];
                Assert.Equal(Referencia(valores), SubarrayMaximo.Somar(valores));
                Assert.Equal(copia, valores);
            }
    }

    [Fact]
    public void SomaExataDeDezBilhoesEAusencia()
    {
        Assert.Equal(10_000_000_000, SubarrayMaximo.Somar(Enumerable.Repeat(1_000_000L, 10_000).ToArray()));
        Assert.Equal(-1_000_000, SubarrayMaximo.Somar(Enumerable.Repeat(-1_000_000L, 10_000).ToArray()));
        Assert.Equal(0, SubarrayMaximo.Somar([0]));
        Assert.Null(SubarrayMaximo.Somar([]));
    }
}
