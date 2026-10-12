<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\soma_de_dois\somaDeDois;

echo json_encode(somaDeDois([2, 7, 11, 15], 9), JSON_THROW_ON_ERROR), PHP_EOL; // [0,1]
