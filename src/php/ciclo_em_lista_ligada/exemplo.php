<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\ciclo_em_lista_ligada\temCiclo;
use LiveCoding\Shared\No;

$primeiro = new No(1);
$segundo = new No(2, $primeiro);
$primeiro->proximo = $segundo;
var_export(temCiclo($primeiro)); // true
echo PHP_EOL;
