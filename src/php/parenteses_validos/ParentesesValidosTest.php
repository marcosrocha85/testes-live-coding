<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\parenteses_validos\parentesesValidos;

final class ParentesesValidosTest extends TestCase
{
    public static function casosCompartilhados(): iterable { return Casos::ler('parenteses_validos'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): bool => parentesesValidos($entrada['texto']));
    }
}
