param([string]$Repository = 'marcosrocha85/testes-live-coding')
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$wikiDirectory = Join-Path ([System.IO.Path]::GetTempPath()) ('live-coding-wiki-' + [guid]::NewGuid())

Push-Location $projectRoot
try {
    npm run docs
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao gerar a documentação.' }
    git -c credential.interactive=never clone "https://github.com/$Repository.wiki.git" $wikiDirectory
    if ($LASTEXITCODE -ne 0) { throw 'Crie a primeira página Home na Wiki do GitHub e execute este script novamente.' }
    Get-ChildItem -LiteralPath (Join-Path $projectRoot 'docs/wiki') -Filter '*.md' | ForEach-Object {
        Copy-Item -LiteralPath $_.FullName -Destination (Join-Path $wikiDirectory $_.Name)
    }
    git -C $wikiDirectory add -- '*.md'
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao preparar os arquivos da Wiki.' }
    git -C $wikiDirectory diff --cached --quiet
    if ($LASTEXITCODE -eq 0) { Write-Output 'Wiki já atualizada.'; return }
    if ($LASTEXITCODE -ne 1) { throw 'Falha ao comparar o conteúdo da Wiki.' }
    git -C $wikiDirectory commit -m 'docs: atualizar explicações dos desafios'
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao criar o commit da Wiki.' }
    # Reutiliza a autenticação já configurada no gh, sem alterar o Git global.
    git -c credential.helper= -c 'credential.helper=!gh auth git-credential' -C $wikiDirectory push
    if ($LASTEXITCODE -ne 0) { throw 'Falha ao publicar a Wiki.' }
    Write-Output "Wiki atualizada: https://github.com/$Repository/wiki"
} finally {
    Pop-Location
    # Mantém o clone para inspeção, sem apagar caminhos temporários automaticamente.
    if (Test-Path -LiteralPath $wikiDirectory) { Write-Output "Clone da Wiki: $wikiDirectory" }
}
