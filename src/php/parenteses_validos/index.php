<?php
declare(strict_types=1);

namespace LiveCoding\parenteses_validos;

function parentesesValidos(string $texto): bool
{
    $pilha = [];
    $aberturas = [')' => '(', ']' => '[', '}' => '{'];
    $tamanho = strlen($texto);
    for ($indice = 0; $indice < $tamanho; $indice++) {
        $simbolo = $texto[$indice]; // Todos os símbolos aceitos são ASCII, de um byte.
        if ($simbolo === '(' || $simbolo === '[' || $simbolo === '{') {
            $pilha[] = $simbolo;
        } elseif (isset($aberturas[$simbolo])) {
            // O último par aberto precisa ser o primeiro a fechar. Pilha vazia devolve null.
            if (array_pop($pilha) !== $aberturas[$simbolo]) return false;
        } else {
            return false;
        }
    }
    return $pilha === [];
}
