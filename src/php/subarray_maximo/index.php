<?php
declare(strict_types=1);

namespace LiveCoding\subarray_maximo;

/** @param list<int> $numeros */
function subarrayMaximo(array $numeros): ?int
{
    if ($numeros === []) return null;
    // Começar no primeiro valor mantém a resposta correta para arrays só negativos.
    $atual = $melhor = $numeros[0];
    $tamanho = count($numeros);
    for ($indice = 1; $indice < $tamanho; $indice++) {
        $atual = max($numeros[$indice], $atual + $numeros[$indice]);
        $melhor = max($melhor, $atual);
    }
    return $melhor; // int de 64 bits comporta a soma máxima de dez bilhões.
}
