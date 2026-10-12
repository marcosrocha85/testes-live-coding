<?php
declare(strict_types=1);

$raiz = dirname(__DIR__);
$arquivos = new RecursiveIteratorIterator(
    new RecursiveCallbackFilterIterator(new RecursiveDirectoryIterator($raiz, FilesystemIterator::SKIP_DOTS),
        static fn (SplFileInfo $arquivo): bool => !in_array($arquivo->getFilename(), ['vendor', '.phpunit.cache'], true))
);
$total = 0;
foreach ($arquivos as $arquivo) {
    if ($arquivo->getExtension() !== 'php') continue;
    // Um array de argumentos evita montar comandos de shell com os caminhos.
    $processo = proc_open([PHP_BINARY, '-l', $arquivo->getPathname()], [1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes);
    if (!is_resource($processo)) throw new RuntimeException('Não foi possível iniciar o lint.');
    $saida = stream_get_contents($pipes[1]) . stream_get_contents($pipes[2]);
    fclose($pipes[1]);
    fclose($pipes[2]);
    if (proc_close($processo) !== 0) {
        fwrite(STDERR, $saida);
        exit(1);
    }
    $total++;
}
echo "Sintaxe PHP conferida em $total arquivos.\n";
