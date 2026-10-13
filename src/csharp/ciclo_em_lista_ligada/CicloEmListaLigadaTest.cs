using System.Text.Json;

namespace LiveCoding.Testes;

public class CicloEmListaLigadaTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("ciclo_em_lista_ligada");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement, entrada = caso.GetProperty("input");
        long[] valores = TestUtil.Numeros(entrada, "valores");
        int indice = entrada.GetProperty("indiceCiclo").GetInt32();
        No[] nos = TestUtil.Lista(valores, indice);
        Assert.Equal(caso.GetProperty("expected").GetBoolean(), CicloEmListaLigada.TemCiclo(nos.FirstOrDefault()));
        Conferir(valores, indice);
    }

    private static bool Referencia(No? cabeca)
    {
        var visitados = new HashSet<No>(ReferenceEqualityComparer.Instance);
        for (No? atual = cabeca; atual is not null; atual = atual.Proximo)
            if (!visitados.Add(atual)) return true;
        return false;
    }

    private static void Conferir(long[] valores, int indice)
    {
        No[] nos = TestUtil.Lista(valores, indice);
        No?[] antigas = nos.Select(no => no.Proximo).ToArray();
        bool esperado = Referencia(nos.FirstOrDefault());
        for (int repeticao = 0; repeticao < 3; repeticao++)
            Assert.Equal(esperado, CicloEmListaLigada.TemCiclo(nos.FirstOrDefault()));
        Assert.Equal(valores, nos.Select(no => no.Valor));
        for (int i = 0; i < nos.Length; i++) Assert.Same(antigas[i], nos[i].Proximo);
    }

    [Fact]
    public void TodasAsEntradasDeCiclosCurtoEDuplicatas()
    {
        for (int tamanho = 0; tamanho <= 20; tamanho++)
            for (int indice = -1; indice < tamanho; indice++)
                Conferir(Enumerable.Repeat(1L, tamanho).ToArray(), indice);
    }

    [Fact]
    public void ListasLongasSemMutacao()
    {
        foreach (int indice in new[] { -1, 0, 1, 5000, 9999 })
            Conferir(Enumerable.Repeat(7L, 10_000).ToArray(), indice);
    }
}
