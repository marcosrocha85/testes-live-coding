<?php
declare(strict_types=1);

// Carregue as soluções sem depender de Composer, servidor web ou outro microprojeto.
if (PHP_INT_SIZE !== 8) {
    throw new RuntimeException('Este microprojeto precisa de PHP com inteiros de 64 bits.');
}
require_once __DIR__ . '/_shared/No.php';
require_once __DIR__ . '/_shared/unicode.php';
foreach ([
    'soma_de_dois', 'parenteses_validos', 'inverter_lista_ligada', 'busca_binaria',
    'mesclar_listas_ordenadas', 'compra_e_venda_de_acoes', 'subarray_maximo',
    'subir_escadas', 'anagrama_valido', 'ciclo_em_lista_ligada',
] as $desafio) {
    require_once __DIR__ . '/' . $desafio . '/index.php';
}
