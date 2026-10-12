package tinker.livecoding.subir_escadas;

public final class SubirEscadas {
    private SubirEscadas() {}

    /** Conta formas de subir com passos de 1 ou 2; aceita inteiros entre 0 e 77. */
    public static long subirEscadas(double degraus) {
        // double permite rejeitar também entradas fracionárias vindas dos casos JSON.
        if (!Double.isFinite(degraus) || degraus != Math.rint(degraus) || degraus < 0 || degraus > 77) {
            throw new IllegalArgumentException("Use um número inteiro de degraus entre 0 e 77.");
        }
        long anterior = 1; // Zero degraus: uma forma, ficar parado.
        long atual = 1;
        for (int degrau = 2; degrau <= (int) degraus; degrau++) {
            long seguinte = anterior + atual;
            anterior = atual;
            atual = seguinte;
        }
        return atual;
    }
}
