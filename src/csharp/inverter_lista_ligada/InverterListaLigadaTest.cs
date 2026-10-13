using System.Text.Json;

namespace LiveCoding.Testes;

public class InverterListaLigadaTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("inverter_lista_ligada");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement;
        long[] valores = TestUtil.Numeros(caso.GetProperty("input"), "valores");
        No[] nos = TestUtil.Lista(valores);
        No? resultado = InverterListaLigada.Inverter(nos.FirstOrDefault());
        TestUtil.ConferirCadeia(resultado, nos.Reverse());
        Assert.Equal(TestUtil.Numeros(caso, "expected"), nos.Reverse().Select(no => no.Valor));
        Assert.Equal(valores, nos.Select(no => no.Valor));
    }

    private static void Conferir(long[] valores)
    {
        No[] nos = TestUtil.Lista(valores);
        No?[] antigas = nos.Select(no => no.Proximo).ToArray();
        No? resultado = InverterListaLigada.Inverter(nos.FirstOrDefault());
        TestUtil.ConferirCadeia(resultado, nos.Reverse());
        Assert.Equal(valores, nos.Select(no => no.Valor));
        No? restaurada = InverterListaLigada.Inverter(resultado);
        TestUtil.ConferirCadeia(restaurada, nos);
        for (int i = 0; i < nos.Length; i++) Assert.Same(antigas[i], nos[i].Proximo);
    }

    [Fact]
    public void IdentidadeDuplicatasEMutacaoDasLigacoes()
    {
        var sorteio = new Random(42);
        for (int tamanho = 0; tamanho < 100; tamanho++) Conferir(TestUtil.Sortear(sorteio, tamanho));
    }

    [Fact]
    public void DezMilNosSemRecursao()
    {
        Conferir(Enumerable.Repeat(7L, 10_000).ToArray());
    }
}
