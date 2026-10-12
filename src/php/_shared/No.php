<?php
declare(strict_types=1);

namespace LiveCoding\Shared;

final class No
{
    // O valor não muda; a ligação pode mudar ou terminar em null.
    public function __construct(public readonly int $valor, public ?No $proximo = null) {}
}
