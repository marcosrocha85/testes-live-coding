package tinker.livecoding.parenteses_validos;

import java.util.ArrayDeque;
import java.util.Deque;

public final class ParentesesValidos {
    private ParentesesValidos() {}

    /** Aceita apenas (), [] e {} fechados na ordem correta. */
    public static boolean parentesesValidos(String texto) {
        Deque<Character> pilha = new ArrayDeque<>();
        for (int indice = 0; indice < texto.length(); indice++) {
            char caractere = texto.charAt(indice);
            if (caractere == '(' || caractere == '[' || caractere == '{') {
                pilha.push(caractere);
            } else {
                char abertura = switch (caractere) {
                    case ')' -> '(';
                    case ']' -> '[';
                    case '}' -> '{';
                    default -> '\0';
                };
                // O último símbolo aberto precisa ser o primeiro a fechar.
                if (abertura == '\0' || pilha.isEmpty() || pilha.pop() != abertura) return false;
            }
        }
        return pilha.isEmpty();
    }
}
