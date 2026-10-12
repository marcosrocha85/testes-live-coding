<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\busca_binaria\buscaBinaria;

final class BuscaBinariaTest extends TestCase
{
    public static function casosCompartilhados(): iterable { return Casos::ler('busca_binaria'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): int =>
            Casos::semMutacao($entrada['numeros'], static fn (array $numeros): int => buscaBinaria($numeros, $entrada['alvo'])));
    }

    public function testExtremosDeArrayLongo(): void
    {
        $numeros = range(0, 19_998, 2);
        self::assertSame(0, buscaBinaria($numeros, 0));
        self::assertSame(9_999, buscaBinaria($numeros, 19_998));
        self::assertSame(-1, buscaBinaria($numeros, 19_997));
    }
}
