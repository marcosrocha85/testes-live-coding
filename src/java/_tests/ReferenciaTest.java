package tinker.livecoding._tests;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import org.junit.jupiter.api.Test;
import tinker.livecoding.soma_de_dois.SomaDeDois;
import tinker.livecoding.busca_binaria.BuscaBinaria;
import tinker.livecoding.compra_e_venda_de_acoes.CompraEVendaDeAcoes;
import tinker.livecoding.subarray_maximo.SubarrayMaximo;
import tinker.livecoding.parenteses_validos.ParentesesValidos;
import tinker.livecoding.anagrama_valido.AnagramaValido;
import static org.junit.jupiter.api.Assertions.*;

class ReferenciaTest {
    private static List<int[]> entradas() {
        var random = new Random(20261012);
        var entradas = new ArrayList<int[]>();
        for (int caso = 0; caso < 150; caso++) {
            int[] numeros = new int[random.nextInt(15)];
            for (int indice = 0; indice < numeros.length; indice++) numeros[indice] = random.nextInt(21) - 10;
            entradas.add(numeros);
        }
        return entradas;
    }

    @Test void somaConcordaComBuscaExaustiva() {
        for (int[] numeros : entradas()) {
            for (int alvo = -20; alvo <= 20; alvo++) {
                int[] esperado = null;
                procurar: for (int segundo = 1; segundo < numeros.length; segundo++) {
                    for (int primeiro = 0; primeiro < segundo; primeiro++) {
                        if (numeros[primeiro] + numeros[segundo] == alvo) {
                            esperado = new int[] {primeiro, segundo};
                            break procurar;
                        }
                    }
                }
                assertArrayEquals(esperado, SomaDeDois.somaDeDois(numeros, alvo));
            }
        }
    }

    @Test void buscaConcordaComBuscaLinear() {
        for (int[] numeros : entradas()) {
            Arrays.sort(numeros);
            for (int alvo = -11; alvo <= 11; alvo++) {
                boolean presente = false;
                for (int numero : numeros) if (numero == alvo) presente = true;
                int indice = BuscaBinaria.buscaBinaria(numeros, alvo);
                if (presente) {
                    assertTrue(indice >= 0 && indice < numeros.length);
                    assertEquals(alvo, numeros[indice]);
                } else assertEquals(-1, indice);
            }
        }
    }

    @Test void lucroConcordaComTodasAsComprasEVendas() {
        for (int[] entrada : entradas()) {
            int[] precos = Arrays.stream(entrada).map(numero -> numero + 10).toArray();
            int esperado = 0;
            for (int compra = 0; compra < precos.length; compra++) {
                for (int venda = compra + 1; venda < precos.length; venda++) esperado = Math.max(esperado, precos[venda] - precos[compra]);
            }
            assertEquals(esperado, CompraEVendaDeAcoes.maiorLucro(precos));
        }
    }

    @Test void kadaneConcordaComTodosOsTrechosContiguos() {
        for (int[] numeros : entradas()) {
            Long esperado = null;
            for (int inicio = 0; inicio < numeros.length; inicio++) {
                long soma = 0;
                for (int fim = inicio; fim < numeros.length; fim++) {
                    soma += numeros[fim];
                    if (esperado == null || soma > esperado) esperado = soma;
                }
            }
            assertEquals(esperado, SubarrayMaximo.subarrayMaximo(numeros));
        }
    }

    @Test void parentesesConcordaComRemocaoDeParesAdjacentes() {
        var random = new Random(20261012);
        String simbolos = "()[]{}a";
        for (int caso = 0; caso < 500; caso++) {
            var texto = new StringBuilder();
            int tamanho = random.nextInt(20);
            for (int indice = 0; indice < tamanho; indice++) texto.append(simbolos.charAt(random.nextInt(simbolos.length())));
            String reduzido = texto.toString();
            String anterior;
            do {
                anterior = reduzido;
                reduzido = reduzido.replace("()", "").replace("[]", "").replace("{}", "");
            } while (!reduzido.equals(anterior));
            assertEquals(reduzido.isEmpty(), ParentesesValidos.parentesesValidos(texto.toString()));
        }
    }

    @Test void anagramaConcordaComOrdenacaoDePontosDeCodigo() {
        var random = new Random(20261012);
        int[] alfabeto = "aAéé 😀🦀".codePoints().toArray();
        for (int caso = 0; caso < 200; caso++) {
            var primeiro = new StringBuilder();
            var segundo = new StringBuilder();
            int tamanho = random.nextInt(20);
            for (int indice = 0; indice < tamanho; indice++) {
                primeiro.appendCodePoint(alfabeto[random.nextInt(alfabeto.length)]);
                segundo.appendCodePoint(alfabeto[random.nextInt(alfabeto.length)]);
            }
            String a = primeiro.toString();
            String b = segundo.toString();
            boolean esperado = Arrays.equals(a.codePoints().sorted().toArray(), b.codePoints().sorted().toArray());
            assertEquals(esperado, AnagramaValido.anagramaValido(a, b));
            assertTrue(AnagramaValido.anagramaValido(a, primeiro.reverse().toString()));
        }
    }
}
