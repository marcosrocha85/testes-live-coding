<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\parenteses_validos\parentesesValidos;

var_export(parentesesValidos("{[()]}")); // true
echo PHP_EOL;
