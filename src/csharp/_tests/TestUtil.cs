using System.Text.Json;

namespace LiveCoding.Testes;

internal static class TestUtil
{
    public static TheoryData<string> Casos(string id)
    {
        string caminho = Path.Combine(AppContext.BaseDirectory, "casos", id + ".json");
        using JsonDocument documento = JsonDocument.Parse(File.ReadAllText(caminho));
        var dados = new TheoryData<string>();
        foreach (JsonElement caso in documento.RootElement.EnumerateArray())
        {
            dados.Add(caso.GetRawText());
        }
        return dados;
    }

    public static long[] Numeros(JsonElement entrada, string nome) =>
        entrada.GetProperty(nome).EnumerateArray().Select(v => v.GetInt64()).ToArray();

    public static string Texto(JsonElement entrada, string nome) =>
        entrada.GetProperty(nome).GetString()!;

    public static No[] Lista(long[] valores, int indiceCiclo = -1)
    {
        No[] nos = valores.Select(valor => new No(valor)).ToArray();
        for (int i = 1; i < nos.Length; i++) nos[i - 1].Proximo = nos[i];
        if (indiceCiclo >= 0) nos[^1].Proximo = nos[indiceCiclo];
        return nos;
    }

    public static void ConferirCadeia(No? cabeca, IEnumerable<No> esperados)
    {
        No? atual = cabeca;
        foreach (No esperado in esperados)
        {
            Assert.NotNull(atual);
            Assert.Same(esperado, atual);
            atual = atual.Proximo;
        }
        Assert.Null(atual); // Não deve sobrar nó nem ciclo.
    }

    public static long[] Sortear(Random sorteio, int tamanho) =>
        Enumerable.Range(0, tamanho).Select(_ => (long)sorteio.Next(-10, 11)).ToArray();
}
