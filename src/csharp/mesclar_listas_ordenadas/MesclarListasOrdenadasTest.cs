using System.Text.Json;

namespace LiveCoding.Testes;

public class MesclarListasOrdenadasTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("mesclar_listas_ordenadas");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement, entrada = caso.GetProperty("input");
        Assert.Equal(TestUtil.Numeros(caso, "expected"), Conferir(TestUtil.Numeros(entrada, "primeira"), TestUtil.Numeros(entrada, "segunda")));
    }

    private static long[] Conferir(long[] a, long[] b)
    {
        No[] primeira = TestUtil.Lista(a), segunda = TestUtil.Lista(b);
        // OrderBy é estável: conserva a primeira lista em empate.
        No[] esperados = primeira.Concat(segunda).OrderBy(no => no.Valor).ToArray();
        No? resultado = MesclarListasOrdenadas.Mesclar(primeira.FirstOrDefault(), segunda.FirstOrDefault());
        TestUtil.ConferirCadeia(resultado, esperados);
        Assert.Equal(a, primeira.Select(no => no.Valor));
        Assert.Equal(b, segunda.Select(no => no.Valor));
        return esperados.Select(no => no.Valor).ToArray();
    }

    [Fact]
    public void ReferenciaOrdenadaEstavelEIdentidade()
    {
        var sorteio = new Random(42);
        for (int tamanho = 0; tamanho < 100; tamanho++)
        {
            long[] a = TestUtil.Sortear(sorteio, tamanho), b = TestUtil.Sortear(sorteio, 100 - tamanho);
            Array.Sort(a);
            Array.Sort(b);
            Conferir(a, b);
        }
    }

    [Fact]
    public void ListasLongasEDuplicatas()
    {
        Conferir(Enumerable.Repeat(7L, 5000).ToArray(), Enumerable.Repeat(7L, 5000).ToArray());
        Conferir([], Enumerable.Repeat(1L, 10_000).ToArray());
        Conferir(Enumerable.Range(0, 5000).Select(i => 2L * i).ToArray(),
            Enumerable.Range(0, 5000).Select(i => 2L * i + 1).ToArray());
    }
}
