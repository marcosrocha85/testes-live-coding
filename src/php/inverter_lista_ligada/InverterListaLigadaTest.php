<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\inverter_lista_ligada\inverterListaLigada;

final class InverterListaLigadaTest extends TestCase
{
    private static function verificar(array $valores): array
    {
        $cabeca = Listas::criar($valores);
        $originais = Listas::nos($cabeca);
        $resultado = inverterListaLigada($cabeca);
        // assertSame compara os próprios objetos, incluindo a ordem e o fim da lista.
        self::assertSame(array_reverse($originais), Listas::nos($resultado));
        return Listas::valores($resultado);
    }

    public static function casosCompartilhados(): iterable { return Casos::ler('inverter_lista_ligada'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): array => self::verificar($entrada['valores']));
    }

    public function testListaLongaSemRecursao(): void
    {
        $valores = range(0, 9_999);
        self::assertSame(array_reverse($valores), self::verificar($valores));
    }

    public function testDuasInversoesRestauramAsReferencias(): void
    {
        $cabeca = Listas::criar([1, 1, 2, 1]);
        $nos = Listas::nos($cabeca);
        $resultado = inverterListaLigada(inverterListaLigada($cabeca));
        self::assertSame($cabeca, $resultado);
        self::assertSame($nos, Listas::nos($resultado));
    }
}
