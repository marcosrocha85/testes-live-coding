<?php
declare(strict_types=1);

namespace LiveCoding\busca_binaria;

/** @param list<int> $numeros */
function buscaBinaria(array $numeros, int $alvo): int
{
    $inicio = 0;
    $fim = count($numeros) - 1;
    while ($inicio <= $fim) {
        $meio = $inicio + intdiv($fim - $inicio, 2);
        if ($numeros[$meio] === $alvo) return $meio;
        // O centro já foi conferido; avance uma posição para reduzir o intervalo.
        if ($numeros[$meio] < $alvo) $inicio = $meio + 1;
        else $fim = $meio - 1;
    }
    return -1;
}
