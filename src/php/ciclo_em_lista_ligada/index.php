<?php
declare(strict_types=1);

namespace LiveCoding\ciclo_em_lista_ligada;

use LiveCoding\Shared\No;

function temCiclo(?No $cabeca): bool
{
    $lento = $rapido = $cabeca;
    while ($rapido !== null && $rapido->proximo !== null) {
        $lento = $lento->proximo;
        $rapido = $rapido->proximo->proximo;
        // === compara o mesmo objeto; valores repetidos não indicam ciclo.
        if ($lento === $rapido) return true;
    }
    return false;
}
