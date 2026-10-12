<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\subarray_maximo\subarrayMaximo;

echo subarrayMaximo([-2, 1, -3, 4, -1, 2, 1, -5, 4]), PHP_EOL; // 6
