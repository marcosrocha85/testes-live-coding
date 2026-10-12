<?php
declare(strict_types=1);

// Gerado por npm run docs. Consulte o README deste desafio.
require_once dirname(__DIR__) . '/bootstrap.php';

use function LiveCoding\inverter_lista_ligada\inverterListaLigada;
use LiveCoding\Shared\No;

$cabeca = new No(1, new No(2, new No(3)));
$invertida = inverterListaLigada($cabeca);
echo $invertida->valor, PHP_EOL; // 3; as ligações são 3 → 2 → 1 → null
