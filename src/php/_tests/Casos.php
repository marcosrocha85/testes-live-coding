<?php
declare(strict_types=1);

namespace LiveCoding\Tests;

use PHPUnit\Framework\Assert;

final class Casos
{
    public static function ler(string $desafio): iterable
    {
        $arquivo = dirname(__DIR__, 3) . '/docs/casos/' . $desafio . '.json';
        $conteudo = file_get_contents($arquivo);
        if ($conteudo === false) throw new \RuntimeException('Casos não encontrados: ' . $desafio);
        foreach (json_decode($conteudo, true, 512, JSON_THROW_ON_ERROR) as $caso) {
            yield $caso['name'] => [$caso];
        }
    }

    public static function verificar(array $caso, callable $executar): void
    {
        $entrada = $caso['input'];
        if (isset($caso['error'])) {
            Assert::assertSame('RangeError', $caso['error']);
            try {
                $executar($entrada);
                Assert::fail('A entrada fora do domínio deveria ser rejeitada.');
            } catch (\InvalidArgumentException) {
                // Este é o equivalente PHP ao erro de domínio dos casos JSON.
            }
        } else {
            $resultado = $executar($entrada);
            if (isset($caso['expectedIndices'])) {
                Assert::assertTrue(in_array($resultado, $caso['expectedIndices'], true));
            } else {
                Assert::assertSame($caso['expected'], $resultado);
            }
        }
        Assert::assertSame($caso['input'], $entrada);
    }

    public static function semMutacao(array $entrada, callable $executar): mixed
    {
        $original = $entrada;
        try {
            return $executar($entrada);
        } finally {
            Assert::assertSame($original, $entrada, 'A solução não deve alterar o array recebido.');
        }
    }
}
