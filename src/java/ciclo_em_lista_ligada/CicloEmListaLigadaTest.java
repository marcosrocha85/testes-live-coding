package tinker.livecoding.ciclo_em_lista_ligada;

import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.TestFactory;
import tinker.livecoding._tests.Casos;
import tinker.livecoding._tests.Listas;
import tinker.livecoding._shared.No;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class CicloEmListaLigadaTest {
    @Test void detectaTodasAsPosicoesSemMudarOsPonteiros() {
        for (int tamanho = 0; tamanho <= 20; tamanho++) {
            for (int retorno = -1; retorno < tamanho; retorno++) {
                No cabeca = Listas.criarLista(new int[tamanho], retorno);
                No[] nos = new No[tamanho];
                No[] seguintes = new No[tamanho];
                No atual = cabeca;
                for (int indice = 0; indice < tamanho; indice++) {
                    nos[indice] = atual;
                    seguintes[indice] = atual.proximo;
                    atual = atual.proximo;
                }
                assertEquals(retorno >= 0, CicloEmListaLigada.temCiclo(cabeca));
                for (int indice = 0; indice < tamanho; indice++) assertSame(seguintes[indice], nos[indice].proximo);
            }
        }
    }
    @TestFactory Stream<DynamicTest> casosCompartilhados() {
        return Casos.verificar("ciclo_em_lista_ligada", entrada -> CicloEmListaLigada.temCiclo(Listas.criarLista(Casos.inteiros(entrada, "valores"), entrada.get("indiceCiclo").getAsInt())));
    }
}
