<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\subir_escadas\subirEscadas;

final class SubirEscadasTest extends TestCase
{
    public static function casosCompartilhados(): iterable { return Casos::ler('subir_escadas'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): int => subirEscadas($entrada['degraus']));
    }

    public function testTodoDominioConcordaComCombinacoesExatas(): void
    {
        // Conta as posições dos passos duplos, sem repetir a recorrência Fibonacci.
        for ($n = 0; $n <= 77; $n++) {
            $esperado = 0;
            for ($duplos = 0; $duplos <= intdiv($n, 2); $duplos++) $esperado += self::combinacao($n - $duplos, $duplos);
            self::assertSame($esperado, subirEscadas($n), 'degraus=' . $n);
        }
    }

    private static function combinacao(int $n, int $k): int
    {
        $resultado = 1;
        // Neste domínio, inclusive os produtos intermediários cabem em int de 64 bits.
        for ($i = 1; $i <= $k; $i++) $resultado = intdiv($resultado * ($n - $i + 1), $i);
        return $resultado;
    }

    public function testRejeitaNaNEInfinitos(): void
    {
        foreach ([NAN, INF, -INF] as $numero) {
            try {
                subirEscadas($numero);
                self::fail('Número não finito deveria ser rejeitado.');
            } catch (\InvalidArgumentException) {
                self::assertTrue(true);
            }
        }
    }

    public function testChamadorEstritoRejeitaTiposNaoNumericos(): void
    {
        foreach (['3', true, null, []] as $valor) {
            try {
                subirEscadas($valor);
                self::fail('Um chamador estrito não deve converter este tipo.');
            } catch (\TypeError) {
                self::assertTrue(true);
            }
        }
    }
}
