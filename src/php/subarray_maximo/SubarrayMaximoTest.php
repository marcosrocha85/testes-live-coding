<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\subarray_maximo\subarrayMaximo;

final class SubarrayMaximoTest extends TestCase
{
    public static function casosCompartilhados(): iterable { return Casos::ler('subarray_maximo'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): ?int => Casos::semMutacao($entrada['numeros'], subarrayMaximo(...)));
    }

    public function testSomaGrandePermaneceInteiroExato(): void
    {
        self::assertSame(10_000_000_000, subarrayMaximo(array_fill(0, 10_000, 1_000_000)));
        self::assertSame(-1_000_000, subarrayMaximo(array_fill(0, 10_000, -1_000_000)));
    }
}
