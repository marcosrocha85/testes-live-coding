<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\mesclar_listas_ordenadas\mesclarListasOrdenadas;
use LiveCoding\Shared\No;

$mesclada = mesclarListasOrdenadas(new No(1, new No(3)), new No(2, new No(4)));
echo $mesclada->valor, PHP_EOL; // 1; a sequência é 1 → 2 → 3 → 4 → null
