<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\soma_de_dois\somaDeDois;

final class SomaDeDoisTest extends TestCase
{
    public static function casosCompartilhados(): iterable { return Casos::ler('soma_de_dois'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): ?array =>
            Casos::semMutacao($entrada['numeros'], static fn (array $numeros): ?array => somaDeDois($numeros, $entrada['alvo'])));
    }
}
