<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\compra_e_venda_de_acoes\maiorLucro;

final class CompraEVendaDeAcoesTest extends TestCase
{
    public static function casosCompartilhados(): iterable { return Casos::ler('compra_e_venda_de_acoes'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): int => Casos::semMutacao($entrada['precos'], maiorLucro(...)));
    }
}
