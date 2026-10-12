<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use LiveCoding\Shared\No;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\mesclar_listas_ordenadas\mesclarListasOrdenadas;

final class MesclarListasOrdenadasTest extends TestCase
{
    private static function verificar(?No $primeira, ?No $segunda): array
    {
        $esperados = [...Listas::nos($primeira), ...Listas::nos($segunda)];
        // usort é estável em PHP 8: a referência usa ordenação, não mesclagem de ponteiros.
        usort($esperados, static fn (No $a, No $b): int => $a->valor <=> $b->valor);
        $resultado = mesclarListasOrdenadas($primeira, $segunda);
        self::assertSame($esperados, Listas::nos($resultado));
        return Listas::valores($resultado);
    }

    public static function casosCompartilhados(): iterable { return Casos::ler('mesclar_listas_ordenadas'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): array =>
            self::verificar(Listas::criar($entrada['primeira']), Listas::criar($entrada['segunda'])));
    }

    public function testEmpateMantemOrdemEIdentidade(): void
    {
        self::assertSame([1, 1, 2, 2], self::verificar(new No(1, new No(2)), new No(1, new No(2))));
    }

    public function testListasLongasSemCopiarNos(): void
    {
        $pares = Listas::criar(range(0, 9_998, 2));
        $impares = Listas::criar(range(1, 9_999, 2));
        self::assertSame(range(0, 9_999), self::verificar($pares, $impares));
    }
}
