<?php
declare(strict_types=1);

namespace LiveCoding\inverter_lista_ligada;

use LiveCoding\Shared\No;

function inverterListaLigada(?No $cabeca): ?No
{
    $anterior = null;
    $atual = $cabeca;
    while ($atual !== null) {
        $seguinte = $atual->proximo; // Guarde o restante antes de inverter a ligação.
        $atual->proximo = $anterior;
        $anterior = $atual;
        $atual = $seguinte;
    }
    return $anterior;
}
