<?php
declare(strict_types=1);

namespace LiveCoding\subir_escadas;

function subirEscadas(int|float $degraus): int
{
    if (!is_finite((float) $degraus) || $degraus < 0 || $degraus > 77
        || floor((float) $degraus) !== (float) $degraus) {
        throw new \InvalidArgumentException('Degraus deve ser um inteiro de 0 a 77.');
    }
    $anterior = 1; // Uma sequência vazia leva a zero degraus.
    $atual = 1;
    for ($degrau = 2; $degrau <= $degraus; $degrau++) {
        $seguinte = $anterior + $atual; // O último passo tem um ou dois degraus.
        $anterior = $atual;
        $atual = $seguinte;
    }
    return $atual;
}
