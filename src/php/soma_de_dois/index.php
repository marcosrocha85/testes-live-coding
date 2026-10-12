<?php
declare(strict_types=1);

namespace LiveCoding\soma_de_dois;

/** @param list<int> $numeros @return array{int, int}|null */
function somaDeDois(array $numeros, int $alvo): ?array
{
    $vistos = [];
    foreach ($numeros as $indice => $numero) {
        $complemento = $alvo - $numero;
        // Procure antes de guardar, para não usar a mesma posição duas vezes.
        if (isset($vistos[$complemento])) {
            return [$vistos[$complemento], $indice];
        }
        if (!isset($vistos[$numero])) {
            $vistos[$numero] = $indice; // Preserve o primeiro índice do valor.
        }
    }
    return null;
}
