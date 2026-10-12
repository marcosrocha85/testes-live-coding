package tinker.livecoding.compra_e_venda_de_acoes;

public final class CompraEVendaDeAcoes {
    private CompraEVendaDeAcoes() {}

    /** Maior lucro de uma compra seguida de venda; sem lucro, retorna zero. */
    public static int maiorLucro(int[] precos) {
        int menorPreco = Integer.MAX_VALUE;
        int lucroMaximo = 0;
        for (int preco : precos) {
            // O menor preço já foi visto; a venda não antecede a compra.
            lucroMaximo = Math.max(lucroMaximo, preco - menorPreco);
            menorPreco = Math.min(menorPreco, preco);
        }
        return lucroMaximo;
    }
}
