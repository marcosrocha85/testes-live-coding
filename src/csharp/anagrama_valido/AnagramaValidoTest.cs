using System.Buffers.Binary;
using System.Text;
using System.Text.Json;

namespace LiveCoding.Testes;

public class AnagramaValidoTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("anagrama_valido");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement, entrada = caso.GetProperty("input");
        Assert.Equal(caso.GetProperty("expected").GetBoolean(),
            AnagramaValido.Validar(TestUtil.Texto(entrada, "primeiro"), TestUtil.Texto(entrada, "segundo")));
    }

    private static int[] PontosOrdenados(string texto)
    {
        // UTF-32 oferece uma referência independente de EnumerateRunes.
        byte[] bytes = Encoding.UTF32.GetBytes(texto);
        int[] pontos = new int[bytes.Length / 4];
        for (int i = 0; i < pontos.Length; i++)
            pontos[i] = BinaryPrimitives.ReadInt32LittleEndian(bytes.AsSpan(4 * i, 4));
        Array.Sort(pontos);
        return pontos;
    }

    [Fact]
    public void ReferenciaUnicodeEMultiplicidades()
    {
        string[] alfabeto = ["a", "A", "é", "\u0301", "😀", " ", "\0", "界", "𝄞"];
        var sorteio = new Random(42);
        for (int tamanho = 0; tamanho < 100; tamanho++)
            for (int repeticao = 0; repeticao < 20; repeticao++)
            {
                string[] partes = Enumerable.Range(0, tamanho).Select(_ => alfabeto[sorteio.Next(9)]).ToArray();
                string a = string.Concat(partes);
                string b = string.Concat(Enumerable.Range(0, tamanho).Select(_ => alfabeto[sorteio.Next(9)]));
                Assert.Equal(PontosOrdenados(a).SequenceEqual(PontosOrdenados(b)), AnagramaValido.Validar(a, b));
                Assert.True(AnagramaValido.Validar(a, string.Concat(partes.Reverse())));
            }
        // Mesmas unidades UTF-16, mas pares substitutos formam pontos diferentes.
        Assert.False(AnagramaValido.Validar("\U00010000\U00010401", "\U00010001\U00010400"));
        Assert.False(AnagramaValido.Validar("é", "e\u0301"));
        Assert.True(AnagramaValido.Validar(string.Concat(Enumerable.Repeat("😀", 10_000)), string.Concat(Enumerable.Repeat("😀", 10_000))));
        Assert.False(AnagramaValido.Validar(string.Concat(Enumerable.Repeat("😀", 10_000)), string.Concat(Enumerable.Repeat("😀", 9999))));
    }

    [Fact]
    public void TodosOsValoresEscalaresUnicode()
    {
        var crescente = new StringBuilder();
        var decrescente = new StringBuilder();
        for (int ponto = 0; ponto <= 0x10ffff; ponto++)
            if (Rune.IsValid(ponto)) crescente.Append(char.ConvertFromUtf32(ponto));
        for (int ponto = 0x10ffff; ponto >= 0; ponto--)
            if (Rune.IsValid(ponto)) decrescente.Append(char.ConvertFromUtf32(ponto));
        Assert.True(AnagramaValido.Validar(crescente.ToString(), decrescente.ToString()));
    }
}
