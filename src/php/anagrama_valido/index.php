<?php
declare(strict_types=1);

namespace LiveCoding\anagrama_valido;

use function LiveCoding\Shared\pontosDeCodigo;

function anagramaValido(string $primeiro, string $segundo): bool
{
    $contagens = [];
    foreach (pontosDeCodigo($primeiro) as $ponto) {
        // O prefixo conserva chaves de texto, mesmo quando o caractere é um dígito.
        $chave = 'c:' . $ponto;
        $contagens[$chave] = ($contagens[$chave] ?? 0) + 1;
    }
    foreach (pontosDeCodigo($segundo) as $ponto) {
        $chave = 'c:' . $ponto;
        if (!isset($contagens[$chave])) return false;
        if ($contagens[$chave] === 1) unset($contagens[$chave]);
        else $contagens[$chave]--;
    }
    return $contagens === [];
}
