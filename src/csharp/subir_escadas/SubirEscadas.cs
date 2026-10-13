namespace LiveCoding;

public static class SubirEscadas
{
    public static long Contar(double degraus)
    {
        if (!double.IsFinite(degraus) || degraus < 0 || degraus > 77 || degraus != Math.Truncate(degraus))
        {
            throw new ArgumentOutOfRangeException(nameof(degraus), degraus, "Use um inteiro de 0 a 77.");
        }
        // Só a entrada usa double; as contagens são inteiros exatos.
        long anterior = 1, atual = 1;
        for (int passo = 1; passo < (int)degraus; passo++)
        {
            (anterior, atual) = (atual, anterior + atual);
        }
        return atual;
    }
}
