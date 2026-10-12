<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use LiveCoding\Shared\No;

final class Listas
{
    public static function criar(array $valores, int $indiceCiclo = -1): ?No
    {
        if ($indiceCiclo < -1 || $indiceCiclo >= count($valores)) {
            throw new \InvalidArgumentException('Índice de ciclo fora da lista.');
        }
        $nos = array_map(static fn (int $valor): No => new No($valor), $valores);
        for ($indice = 1; $indice < count($nos); $indice++) $nos[$indice - 1]->proximo = $nos[$indice];
        if ($indiceCiclo >= 0) $nos[count($nos) - 1]->proximo = $nos[$indiceCiclo];
        return $nos[0] ?? null;
    }

    /** @return list<No> */
    public static function nos(?No $cabeca): array
    {
        $visitados = new \SplObjectStorage();
        $nos = [];
        for ($atual = $cabeca; $atual !== null; $atual = $atual->proximo) {
            if (isset($visitados[$atual])) throw new \RuntimeException('Ciclo inesperado na lista.');
            $visitados[$atual] = true;
            $nos[] = $atual;
        }
        return $nos;
    }

    public static function valores(?No $cabeca): array
    {
        return array_map(static fn (No $no): int => $no->valor, self::nos($cabeca));
    }
}
