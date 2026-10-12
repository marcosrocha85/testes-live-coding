<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\compra_e_venda_de_acoes\maiorLucro;

echo maiorLucro([7, 1, 5, 3, 6, 4]), PHP_EOL; // 5
