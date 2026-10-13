using System.Text.Json;

namespace LiveCoding.Testes;

public class CompraEVendaDeAcoesTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("compra_e_venda_de_acoes");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement;
        long[] valores = TestUtil.Numeros(caso.GetProperty("input"), "precos"), copia = [.. valores];
        Assert.Equal(caso.GetProperty("expected").GetInt64(), CompraEVendaDeAcoes.MaiorLucro(valores));
        Assert.Equal(copia, valores);
    }

    private static long Referencia(long[] precos)
    {
        var lucros = new List<long> { 0 };
        for (int compra = 0; compra < precos.Length; compra++)
            for (int venda = compra + 1; venda < precos.Length; venda++)
                lucros.Add(precos[venda] - precos[compra]);
        return lucros.Max();
    }

    [Fact]
    public void ReferenciaDeTodasAsComprasEVendas()
    {
        var sorteio = new Random(42);
        for (int tamanho = 0; tamanho < 40; tamanho++)
            for (int repeticao = 0; repeticao < 30; repeticao++)
            {
                long[] valores = TestUtil.Sortear(sorteio, tamanho).Select(v => v + 10).ToArray();
                long[] copia = [.. valores];
                Assert.Equal(Referencia(valores), CompraEVendaDeAcoes.MaiorLucro(valores));
                Assert.Equal(copia, valores);
            }
    }

    [Fact]
    public void ListaLongaECronologia()
    {
        long[] longa = Enumerable.Repeat(1_000_000L, 10_000).ToArray();
        Assert.Equal(0, CompraEVendaDeAcoes.MaiorLucro(longa));
        longa[0] = 0;
        Assert.Equal(1_000_000, CompraEVendaDeAcoes.MaiorLucro(longa));
        Assert.Equal(0, CompraEVendaDeAcoes.MaiorLucro([5_000_000_000, 0]));
        Assert.Equal(5_000_000_000, CompraEVendaDeAcoes.MaiorLucro([0, 5_000_000_000]));
    }
}
