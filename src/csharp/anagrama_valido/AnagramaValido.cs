using System.Text;

namespace LiveCoding;

public static class AnagramaValido
{
    public static bool Validar(string primeiro, string segundo)
    {
        var frequencias = new Dictionary<Rune, long>();
        // EnumerateRunes preserva pontos completos, sem normalização.
        foreach (Rune ponto in primeiro.EnumerateRunes())
        {
            frequencias.TryGetValue(ponto, out long quantidade);
            frequencias[ponto] = quantidade + 1;
        }
        foreach (Rune ponto in segundo.EnumerateRunes())
        {
            if (!frequencias.TryGetValue(ponto, out long quantidade)) return false;
            if (quantidade == 1) frequencias.Remove(ponto);
            else frequencias[ponto] = quantidade - 1;
        }
        return frequencias.Count == 0;
    }
}
