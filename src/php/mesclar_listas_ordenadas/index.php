<?php
declare(strict_types=1);

namespace LiveCoding\mesclar_listas_ordenadas;

use LiveCoding\Shared\No;

function mesclarListasOrdenadas(?No $primeira, ?No $segunda): ?No
{
    $sentinela = new No(0); // Facilita a primeira ligação e fica fora do resultado.
    $cauda = $sentinela;
    while ($primeira !== null && $segunda !== null) {
        if ($primeira->valor <= $segunda->valor) { // A primeira lista vence o empate.
            $escolhido = $primeira;
            $primeira = $primeira->proximo;
        } else {
            $escolhido = $segunda;
            $segunda = $segunda->proximo;
        }
        $cauda->proximo = $escolhido;
        $cauda = $escolhido;
    }
    $cauda->proximo = $primeira ?? $segunda;
    return $sentinela->proximo;
}
