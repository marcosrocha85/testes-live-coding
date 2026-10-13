namespace LiveCoding;

public static class ParentesesValidos
{
    public static bool Validar(string texto)
    {
        var pilha = new Stack<char>();
        foreach (char simbolo in texto)
        {
            switch (simbolo)
            {
                case '(' or '[' or '{':
                    pilha.Push(simbolo);
                    break;
                case ')' or ']' or '}':
                    char abertura = simbolo switch { ')' => '(', ']' => '[', _ => '{' };
                    if (!pilha.TryPop(out char topo) || topo != abertura)
                    {
                        return false;
                    }
                    break;
                default:
                    // Aqui só os seis símbolos ASCII são aceitos.
                    return false;
            }
        }
        return pilha.Count == 0;
    }
}
