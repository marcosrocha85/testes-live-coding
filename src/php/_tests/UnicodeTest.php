<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\TestCase;
use function LiveCoding\Shared\pontosDeCodigo;

final class UnicodeTest extends TestCase
{
    public function testLimitesUtf8QuebrasDeLinhaENulSemSepararPontos(): void
    {
        $pontos = ['A', "\u{0080}", "\u{07FF}", "\u{0800}", "\u{FFFF}", "\u{10000}", "\u{10FFFF}", "\n", "\0"];
        $texto = implode('', $pontos);
        self::assertInstanceOf(\Generator::class, pontosDeCodigo($texto));
        self::assertSame($pontos, iterator_to_array(pontosDeCodigo($texto), false));
        self::assertSame(mb_str_split($texto, 1, 'UTF-8'), iterator_to_array(pontosDeCodigo($texto), false));
        self::assertSame([], iterator_to_array(pontosDeCodigo(''), false));
    }

    public function testRejeitaUtf8MalformadoNoAuxiliar(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        iterator_to_array(pontosDeCodigo("\xC3\x28"));
    }
}
