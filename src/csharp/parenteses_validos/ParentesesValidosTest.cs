using System.Text.Json;
using System.Text;

namespace LiveCoding.Testes;

public class ParentesesValidosTest
{
    public static TheoryData<string> Casos => TestUtil.Casos("parenteses_validos");

    [Theory]
    [MemberData(nameof(Casos))]
    public void Compartilhados(string json)
    {
        using JsonDocument documento = JsonDocument.Parse(json);
        JsonElement caso = documento.RootElement;
        Assert.Equal(caso.GetProperty("expected").GetBoolean(),
            ParentesesValidos.Validar(TestUtil.Texto(caso.GetProperty("input"), "texto")));
    }

    private static bool Referencia(string texto)
    {
        while (true)
        {
            string novo = texto.Replace("()", "").Replace("[]", "").Replace("{}", "");
            if (novo == texto) return novo.Length == 0;
            texto = novo;
        }
    }

    [Fact]
    public void ReferenciaPorRemocaoDePares()
    {
        string[] alfabeto = ["(", ")", "[", "]", "{", "}", "a", "😀"];
        for (int tamanho = 0; tamanho <= 5; tamanho++)
            for (int codigo = 0; codigo < (int)Math.Pow(8, tamanho); codigo++)
            {
                var texto = new StringBuilder();
                int restante = codigo;
                for (int i = 0; i < tamanho; i++)
                {
                    texto.Append(alfabeto[restante % 8]);
                    restante /= 8;
                }
                string entrada = texto.ToString();
                Assert.Equal(Referencia(entrada), ParentesesValidos.Validar(entrada));
            }
    }

    [Fact]
    public void PilhaLongaESimbolosInvalidos()
    {
        string longa = new string('(', 5000) + new string(')', 5000);
        Assert.True(ParentesesValidos.Validar(longa));
        Assert.False(ParentesesValidos.Validar(longa + "("));
        foreach (string invalido in new[] { "\0", "é", "（）", "() ", "\n", "😀" })
            Assert.False(ParentesesValidos.Validar(invalido));
    }
}
