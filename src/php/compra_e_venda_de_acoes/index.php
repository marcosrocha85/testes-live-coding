<?php
declare(strict_types=1);

namespace LiveCoding\compra_e_venda_de_acoes;

/** @param list<int> $precos */
function maiorLucro(array $precos): int
{
    if ($precos === []) return 0;
    $menor = $precos[0];
    $melhor = 0;
    $tamanho = count($precos);
    for ($dia = 1; $dia < $tamanho; $dia++) {
        // A venda de hoje só usa preços de compra dos dias anteriores.
        $melhor = max($melhor, $precos[$dia] - $menor);
        $menor = min($menor, $precos[$dia]);
    }
    return $melhor;
}
