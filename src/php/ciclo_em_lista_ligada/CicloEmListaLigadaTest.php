<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use function LiveCoding\ciclo_em_lista_ligada\temCiclo;

final class CicloEmListaLigadaTest extends TestCase
{
    private static function verificar(array $valores, int $retorno): bool
    {
        $cabeca = Listas::criar($valores, $retorno);
        $atual = $cabeca;
        $nos = $seguintes = [];
        // O tamanho conhecido limita a leitura, mesmo se a cauda voltar para um nó anterior.
        foreach ($valores as $_) {
            $nos[] = $atual;
            $seguintes[] = $atual->proximo;
            $atual = $atual->proximo;
        }
        $resultado = temCiclo($cabeca);
        foreach ($nos as $indice => $no) self::assertSame($seguintes[$indice], $no->proximo);
        return $resultado;
    }

    public static function casosCompartilhados(): iterable { return Casos::ler('ciclo_em_lista_ligada'); }

    #[DataProvider('casosCompartilhados')]
    public function testCasosCompartilhados(array $caso): void
    {
        Casos::verificar($caso, static fn (array $entrada): bool => self::verificar($entrada['valores'], $entrada['indiceCiclo']));
    }

    public function testTodasAsPosicoesComValoresRepetidosSemMudarPonteiros(): void
    {
        for ($tamanho = 0; $tamanho <= 20; $tamanho++) {
            for ($retorno = -1; $retorno < $tamanho; $retorno++) {
                self::assertSame($retorno >= 0, self::verificar(array_fill(0, $tamanho, 0), $retorno));
            }
        }
    }
}
