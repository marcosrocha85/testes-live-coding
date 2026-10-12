package tinker.livecoding._shared;

/** Cada nó guarda um valor e uma referência ao próximo nó, ou null no fim. */
public final class No {
    public final int valor;
    public No proximo;

    public No(int valor) {
        this(valor, null);
    }

    public No(int valor, No proximo) {
        this.valor = valor;
        this.proximo = proximo;
    }
}
