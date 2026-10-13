using System.Numerics;
using System.Text.Json;

namespace LiveCoding.Testes;

public class SubirEscadasTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("subir_escadas");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement;
        double degraus = caso.GetProperty("input").GetProperty("degraus").GetDouble();
        if (caso.TryGetProperty("error", out _))
        {
            ArgumentOutOfRangeException erro = Assert.Throws<ArgumentOutOfRangeException>(() => SubirEscadas.Contar(degraus));
            Assert.Equal("degraus", erro.ParamName);
            Assert.Equal(degraus, erro.ActualValue);
        }
        else Assert.Equal(caso.GetProperty("expected").GetInt64(), SubirEscadas.Contar(degraus));
    }

    private static long Referencia(int n)
    {
        // Conta posições dos passos duplos por combinações, sem usar Fibonacci.
        BigInteger total = 0;
        for (int duplos = 0; duplos <= n / 2; duplos++)
        {
            int posicoes = n - duplos;
            BigInteger combinacao = 1;
            for (int k = 1; k <= duplos; k++) combinacao = combinacao * (posicoes - k + 1) / k;
            total += combinacao;
        }
        return (long)total;
    }

    [Fact]
    public void TodoODominioEContagemExata()
    {
        for (int n = 0; n <= 77; n++) Assert.Equal(Referencia(n), SubirEscadas.Contar(n));
        Assert.Equal(8_944_394_323_791_464, SubirEscadas.Contar(77));
        Assert.Equal(1, SubirEscadas.Contar(-0.0));
    }

    [Fact]
    public void FracoesNaoFinitosEErroIdiomatico()
    {
        foreach (double invalido in new[] { double.NaN, double.PositiveInfinity, double.NegativeInfinity, -1, 78, 1.5, 77.5, double.MaxValue })
        {
            ArgumentOutOfRangeException erro = Assert.Throws<ArgumentOutOfRangeException>(() => SubirEscadas.Contar(invalido));
            Assert.Equal("degraus", erro.ParamName);
            Assert.Contains("Use um inteiro de 0 a 77.", erro.Message);
        }
    }
}
