<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\TestCase;
use Random\Engine\Mt19937;
use Random\Randomizer;
use function LiveCoding\soma_de_dois\somaDeDois;
use function LiveCoding\busca_binaria\buscaBinaria;
use function LiveCoding\compra_e_venda_de_acoes\maiorLucro;
use function LiveCoding\subarray_maximo\subarrayMaximo;
use function LiveCoding\parenteses_validos\parentesesValidos;
use function LiveCoding\anagrama_valido\anagramaValido;

final class ReferenciaTest extends TestCase
{
    private static function entradas(): array
    {
        $random = new Randomizer(new Mt19937(20261012));
        $entradas = [];
        for ($caso = 0; $caso < 150; $caso++) {
            $numeros = [];
            $tamanho = $random->getInt(0, 14);
            for ($indice = 0; $indice < $tamanho; $indice++) $numeros[] = $random->getInt(-10, 10);
            $entradas[] = $numeros;
        }
        return $entradas;
    }

    public function testSomaConcordaComTodosOsParesNaOrdemDoContrato(): void
    {
        foreach (self::entradas() as $numeros) {
            for ($alvo = -20; $alvo <= 20; $alvo++) {
                $esperado = null;
                for ($segundo = 0; $segundo < count($numeros); $segundo++) {
                    for ($primeiro = 0; $primeiro < $segundo; $primeiro++) {
                        if ($numeros[$primeiro] + $numeros[$segundo] === $alvo) {
                            $esperado = [$primeiro, $segundo];
                            break 2;
                        }
                    }
                }
                self::assertSame($esperado, somaDeDois($numeros, $alvo));
            }
        }
    }

    public function testBuscaConcordaComBuscaLinear(): void
    {
        foreach (self::entradas() as $numeros) {
            sort($numeros);
            for ($alvo = -11; $alvo <= 11; $alvo++) {
                $indice = buscaBinaria($numeros, $alvo);
                if (in_array($alvo, $numeros, true)) {
                    self::assertGreaterThanOrEqual(0, $indice);
                    self::assertLessThan(count($numeros), $indice);
                    self::assertSame($alvo, $numeros[$indice]);
                } else self::assertSame(-1, $indice);
            }
        }
    }

    public function testLucroConcordaComTodasAsComprasEVendas(): void
    {
        foreach (self::entradas() as $entrada) {
            $precos = array_map(static fn (int $numero): int => $numero + 10, $entrada);
            $esperado = 0;
            for ($compra = 0; $compra < count($precos); $compra++) {
                for ($venda = $compra + 1; $venda < count($precos); $venda++) {
                    $esperado = max($esperado, $precos[$venda] - $precos[$compra]);
                }
            }
            self::assertSame($esperado, maiorLucro($precos));
        }
    }

    public function testKadaneConcordaComTodosOsTrechos(): void
    {
        foreach (self::entradas() as $numeros) {
            $esperado = null;
            for ($inicio = 0; $inicio < count($numeros); $inicio++) {
                $soma = 0;
                for ($fim = $inicio; $fim < count($numeros); $fim++) {
                    $soma += $numeros[$fim];
                    if ($esperado === null || $soma > $esperado) $esperado = $soma;
                }
            }
            self::assertSame($esperado, subarrayMaximo($numeros));
        }
    }

    public function testParentesesConcordaComRemocaoDeParesAdjacentes(): void
    {
        $random = new Randomizer(new Mt19937(20261012));
        $simbolos = '()[]{}a';
        for ($caso = 0; $caso < 500; $caso++) {
            $texto = '';
            $tamanho = $random->getInt(0, 19);
            for ($indice = 0; $indice < $tamanho; $indice++) $texto .= $simbolos[$random->getInt(0, strlen($simbolos) - 1)];
            $reduzido = $texto;
            do {
                $anterior = $reduzido;
                $reduzido = str_replace(['()', '[]', '{}'], '', $reduzido);
            } while ($reduzido !== $anterior);
            self::assertSame($reduzido === '', parentesesValidos($texto));
        }
    }

    public function testAnagramaConcordaComOrdenacaoDePontos(): void
    {
        $random = new Randomizer(new Mt19937(20261012));
        $alfabeto = mb_str_split("aAéé 😀🦀\n0", 1, 'UTF-8');
        $texto = static function () use ($random, $alfabeto): string {
            $resultado = '';
            $tamanho = $random->getInt(0, 19);
            for ($indice = 0; $indice < $tamanho; $indice++) $resultado .= $alfabeto[$random->getInt(0, count($alfabeto) - 1)];
            return $resultado;
        };
        for ($caso = 0; $caso < 200; $caso++) {
            $a = $texto();
            $b = $texto();
            $pontosA = mb_str_split($a, 1, 'UTF-8');
            $pontosB = mb_str_split($b, 1, 'UTF-8');
            sort($pontosA, SORT_STRING);
            sort($pontosB, SORT_STRING);
            self::assertSame($pontosA === $pontosB, anagramaValido($a, $b));
            self::assertTrue(anagramaValido($a, implode('', array_reverse(mb_str_split($a, 1, 'UTF-8')))));
        }
    }
}
