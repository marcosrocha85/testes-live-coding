namespace LiveCoding;

public static class InverterListaLigada
{
    public static No? Inverter(No? atual)
    {
        No? anterior = null;
        while (atual is not null)
        {
            // Salva a ligação antes de mudar o nó original.
            No? seguinte = atual.Proximo;
            atual.Proximo = anterior;
            anterior = atual;
            atual = seguinte;
        }
        return anterior;
    }
}
