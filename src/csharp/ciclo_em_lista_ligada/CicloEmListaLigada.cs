namespace LiveCoding;

public static class CicloEmListaLigada
{
    public static bool TemCiclo(No? cabeca)
    {
        No? lento = cabeca, rapido = cabeca;
        while (rapido?.Proximo is not null)
        {
            lento = lento?.Proximo;
            rapido = rapido.Proximo.Proximo;
            // Identidade dos objetos, sem escrever nas ligações.
            if (ReferenceEquals(lento, rapido)) return true;
        }
        return false;
    }
}
