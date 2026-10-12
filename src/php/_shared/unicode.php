<?php
declare(strict_types=1);

namespace LiveCoding\Shared;

/** Entrega um ponto de código de cada vez como string UTF-8, sem montar um array inteiro. */
function pontosDeCodigo(string $texto): \Generator
{
    // A checagem ocorre uma única vez: bytes inválidos não podem virar caracteres fictícios.
    if (preg_match('//u', $texto) !== 1) {
        throw new \InvalidArgumentException('O texto precisa ser UTF-8 válido.');
    }
    $tamanho = strlen($texto); // strlen conta bytes, não caracteres.
    for ($posicao = 0; $posicao < $tamanho;) {
        $inicio = ord($texto[$posicao]);
        // Em UTF-8 bem formado, o primeiro byte informa se o ponto ocupa 1, 2, 3 ou 4 bytes.
        $largura = match (true) {
            $inicio < 0x80 => 1,
            $inicio < 0xE0 => 2,
            $inicio < 0xF0 => 3,
            default => 4,
        };
        yield substr($texto, $posicao, $largura);
        $posicao += $largura;
    }
}
