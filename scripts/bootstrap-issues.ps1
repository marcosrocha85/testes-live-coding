param([switch]$Apply, [string]$Repository = 'marcosrocha85/testes-live-coding')
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$catalog = Get-Content -LiteralPath (Join-Path $projectRoot 'docs/catalogo.json') -Raw | ConvertFrom-Json
if (-not $Apply) {
    Write-Output 'Prévia: 8 issues de linguagem, cada uma com 10 sub-issues. Use -Apply para criar as que faltarem.'
    foreach ($language in $catalog.languages) { Write-Output ("[Linguagem] Implementar os 10 desafios em " + $language.name) }
    return
}
$existingRaw = gh issue list --repo $Repository --state all --limit 500 --json number,title,state
if ($LASTEXITCODE -ne 0) { throw 'Não foi possível listar as issues existentes.' }
$existing = @($existingRaw | ConvertFrom-Json)
$temporaryJson = Join-Path ([System.IO.Path]::GetTempPath()) ('live-coding-issue-' + [guid]::NewGuid() + '.json')
$ledgerPath = Join-Path $projectRoot 'docs/roadmap-issues.json'
$ledger = [System.Collections.Generic.List[object]]::new()

function Save-IssueLedger {
    $json = ConvertTo-Json -InputObject @($script:ledger.ToArray()) -Depth 15
    # Mantém LF, como definido no .gitattributes, mesmo quando executado no Windows.
    [System.IO.File]::WriteAllText($script:ledgerPath, $json.Replace("`r`n", "`n") + "`n", [System.Text.UTF8Encoding]::new($false))
}

function Invoke-IssueApi([string]$Endpoint, [hashtable]$Payload) {
    $Payload | ConvertTo-Json -Depth 15 | Set-Content -LiteralPath $temporaryJson -Encoding utf8NoBOM
    $raw = gh api $Endpoint --method POST --input $temporaryJson
    if ($LASTEXITCODE -ne 0) { throw "Falha na API: $Endpoint. Não repita uma criação sem verificar as issues existentes." }
    return ($raw | ConvertFrom-Json)
}

function Get-OrCreateIssue([string]$Title, [string]$Body, [string[]]$Labels, [Nullable[long]]$ParentId) {
    $match = @($script:existing | Where-Object { $_.title -eq $Title })
    if ($match.Count -gt 1) { throw "Título duplicado: $Title" }
    if ($match.Count -eq 1) {
        $raw = gh api "repos/$Repository/issues/$($match[0].number)"
        if ($LASTEXITCODE -ne 0) { throw 'Falha ao recuperar issue existente.' }
        return ($raw | ConvertFrom-Json)
    }
    $payload = @{ title = $Title; body = $Body; labels = $Labels }
    if ($null -ne $ParentId) { $payload.parent_issue_id = $ParentId }
    $issue = Invoke-IssueApi "repos/$Repository/issues" $payload
    $script:existing += [pscustomobject]@{ number = $issue.number; title = $Title; state = $issue.state }
    return $issue
}

$labelRaw = gh api "repos/$Repository/labels?per_page=100"
if ($LASTEXITCODE -ne 0) { throw 'Falha ao listar labels.' }
$labelNames = @(($labelRaw | ConvertFrom-Json).name)
$labels = @(@{name='roadmap';color='7057ff';description='Etapa de implementação por linguagem'}, @{name='exercise';color='0e8a16';description='Implementação de um desafio com testes e explicações'})
foreach ($language in $catalog.languages) { $labels += @{name="lang:$($language.id)";color='1d76db';description="Desafios em $($language.name)"} }
foreach ($label in $labels) {
    if ($labelNames -notcontains $label.name) { $null = Invoke-IssueApi "repos/$Repository/labels" $label }
}

try {
    $previous = $null
    foreach ($language in $catalog.languages) {
        $title = "[Linguagem] Implementar os 10 desafios em $($language.name)"
        $dependency = if ($null -eq $previous) { 'Primeira etapa: implementação inicial.' } else { "Etapa posterior a #$previous. Trabalhar uma linguagem por vez." }
        $body = @"
Implementar os dez desafios iniciais em **$($language.name)**, com código idiomático, testes automatizados e explicações para iniciantes.

$dependency

As sub-issues reais abaixo representam um desafio cada. Contratos: [docs/contratos.md](https://github.com/$Repository/blob/main/docs/contratos.md). Catálogo: [docs/tests](https://github.com/$Repository/tree/main/docs/tests).

Critérios de conclusão:

- [ ] Concluir as dez sub-issues com soluções e testes dos casos compartilhados.
- [ ] Documentar instalação, versões, conceitos e comandos de execução em docs/linguagens/$($language.id).md.
- [ ] Explicar Unicode, precisão numérica, referências e mutação conforme os desafios.
- [ ] Incluir os testes do microprojeto na CI e validar os dez desafios.
- [ ] Disponibilizar as soluções reais na aba da linguagem no GitHub Pages.
- [ ] Revisar a implementação com Marcos Rocha.

Somente depois de cumprir estes critérios, marcar a linguagem como implementada no catálogo. Novos desafios são registrados em issues próprias.
"@
        $parent = Get-OrCreateIssue $title $body @('roadmap', "lang:$($language.id)") $null
        $record = [pscustomobject]@{ language = $language.id; name = $language.name; number = $parent.number; id = $parent.id; url = $parent.html_url; exercises = @() }
        $ledger.Add($record)
        Save-IssueLedger
        foreach ($exercise in $catalog.exercises) {
            $childTitle = "[$($language.name)] Implementar $($exercise.id) — $($exercise.name)"
            $skills = ($exercise.skills | ForEach-Object { "- $_" }) -join "`n"
            $childBody = @"
Parte de #$($parent.number). Implementar **$($exercise.problemName)** em **$($language.name)**, em src/$($language.id)/$($exercise.id)/.

## Problema

$($exercise.problem)

## Ideia

$($exercise.idea)

## Por que pedir este teste?

$($exercise.why)

Capacidades avaliadas:

$skills

## Contrato

$($exercise.contract)

Adapte nomes e erros para a linguagem, preservando o comportamento observável. [Explicação completa](https://github.com/$Repository/blob/main/docs/tests/$($exercise.id).md) e [casos compartilhados](https://github.com/$Repository/blob/main/docs/casos/$($exercise.id).json).

## Critérios de aceitação

- [ ] Implementar a solução idiomática sem usar outra linguagem para resolver o algoritmo.
- [ ] Criar testes automatizados consumindo todos os casos compartilhados.
- [ ] Acrescentar testes de borda e, para listas, identidade dos nós e efeitos nos ponteiros.
- [ ] Escrever comentários simples e README com exemplo, raciocínio, complexidade e erros comuns.
- [ ] Documentar comando de execução e testes; integrar na CI da linguagem.
- [ ] Disponibilizar o arquivo real na aba da linguagem quando a etapa estiver completa.
- [ ] Abrir PR com referência a esta issue e evidência dos testes executados.

Tempo esperado: $($exercise.time). Espaço adicional esperado: $($exercise.space).
"@
            $child = Get-OrCreateIssue $childTitle $childBody @('exercise', "lang:$($language.id)") ([long]$parent.id)
            $record.exercises += [pscustomobject]@{ exercise = $exercise.id; number = $child.number; id = $child.id; url = $child.html_url }
            Save-IssueLedger
            Write-Output "Issue #$($child.number): $($language.name) / $($exercise.id)"
        }
        $subRaw = gh api "repos/$Repository/issues/$($parent.number)/sub_issues?per_page=100"
        if ($LASTEXITCODE -ne 0) { throw 'Falha ao verificar sub-issues.' }
        $subIds = @(($subRaw | ConvertFrom-Json).id)
        foreach ($child in $record.exercises) {
            if ($subIds -notcontains $child.id) { $null = Invoke-IssueApi "repos/$Repository/issues/$($parent.number)/sub_issues" @{sub_issue_id=[long]$child.id} }
        }
        Write-Output "Etapa $($language.name): #$($parent.number), 10 sub-issues vinculadas."
        $previous = $parent.number
    }
} finally {
    if (Test-Path -LiteralPath $temporaryJson) { Remove-Item -LiteralPath $temporaryJson }
}
