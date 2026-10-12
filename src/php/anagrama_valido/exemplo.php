<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\anagrama_valido\anagramaValido;

var_export(anagramaValido("😀a😀", "😀😀a")); // true
echo PHP_EOL;
