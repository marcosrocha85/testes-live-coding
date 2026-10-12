package tinker.livecoding;

import java.util.Arrays;
import tinker.livecoding.soma_de_dois.SomaDeDois;

public final class Exemplo {
    private Exemplo() {}

    public static void main(String[] args) {
        System.out.println(Arrays.toString(SomaDeDois.somaDeDois(new int[] {2, 7, 11, 15}, 9)));
    }
}
