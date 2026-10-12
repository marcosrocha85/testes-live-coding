<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\anagrama_valido\anagramaValido;

final class AnagramaValidoTest extends TestCase
{
    public static function casosCompartilhados(): iterable { return Casos::ler('anagrama_valido'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): bool => anagramaValido($entrada['primeiro'], $entrada['segundo']));
    }

    public function testMesmosBytesPodemFormarPontosDeCodigoDiferentes(): void
    {
        $a = "\u{00A0}\u{00E1}";
        $b = "\u{00A1}\u{00E0}";
        $bytesA = str_split($a);
        $bytesB = str_split($b);
        sort($bytesA);
        sort($bytesB);
        self::assertSame($bytesA, $bytesB);
        self::assertFalse(anagramaValido($a, $b));
    }

    public function testDigitosEspacosERepeticoes(): void
    {
        self::assertTrue(anagramaValido('00 1', '1 00'));
        self::assertFalse(anagramaValido('00', '0'));
        self::assertFalse(anagramaValido('01', '1'));
    }
}
