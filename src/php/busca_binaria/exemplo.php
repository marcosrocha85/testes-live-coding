<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\busca_binaria\buscaBinaria;

echo buscaBinaria([1, 3, 5, 7, 9], 7), PHP_EOL; // 3
