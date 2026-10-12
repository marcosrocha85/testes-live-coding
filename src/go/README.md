# Desafios em Go

Os dez desafios têm soluções, testes próprios e READMEs nas pastas originais. O módulo usa **Go 1.27.2** e somente a biblioteca padrão, incluindo `testing`, `encoding/json` e `math/big` nas referências dos testes. Não há dependências externas nem necessidade de `go.sum`.

Da raiz do repositório, sem instalar Go no computador:

```sh
docker compose run --build --rm go
```

O comando confere a versão e a formatação com `gofmt`, executa `go vet`, toda a suíte com detector de corridas, repete os testes em 32 bits e compila e executa os dez exemplos. Cada exemplo verifica sua resposta antes de imprimir. Os 86 casos JSON vêm diretamente de `docs/casos`; referências independentes também verificam ordem, identidade, estabilidade, mutação, Unicode e precisão numérica.

A imagem oficial `golang:1.27.2-bookworm` está fixada pelo digest `sha256:5cf287a799e6b94384bad13d16b14904c531f51ba65792237e122ce42b392f61`. Fontes e casos são copiados para a imagem. Compilação e execução usam o usuário `runner`, sem privilégios; nenhum checkout é montado e não há cache persistente do microprojeto. `GOTOOLCHAIN=local` impede baixar outra versão de Go e `GOPROXY=off` impede buscar módulos.

Somente um desafio ou exemplo:

```sh
docker compose run --build --rm go sh executar.sh testes busca_binaria
docker compose run --build --rm go sh executar.sh exemplo soma_de_dois
```

O exemplo imprime `soma_de_dois: [0 1]`. O gerador da documentação mantém `cmd/exemplos/main.go` a partir de `scripts/go-docs.mjs`; não edite o arquivo gerado. Após mudar os trechos, execute `npm run docs`. `build/exemplos` e caches de compilação ficam no container e são descartados.

Se já tiver Go 1.27.2 em Linux/macOS, `sh src/go/executar.sh check` executa a mesma validação. Para comandos individuais, inclusive no PowerShell:

```sh
gofmt -w src/go
go -C src/go vet ./...
go -C src/go test -race -count=1 ./...
go -C src/go run ./cmd/exemplos soma_de_dois
```

`-race` precisa de uma plataforma suportada e compilador C; ambos já estão na imagem Docker. `npm test` não executa Go. A CI usa o mesmo container e o workflow Pages exige sua aprovação antes de publicar.

Slices compartilham o array subjacente, mas as funções numéricas somente leem a entrada. Valores, somas e contagens usam `int64`; índices usam `int`. Soma de dois e subarray retornam um valor acompanhado de `ok`; `ok=false` representa ausência. Listas usam `*lista.No` e `nil`, e comparam identidade por ponteiro. Inversão e mesclagem mudam as ligações; Floyd somente consulta. Escadas retorna `error` para entradas inválidas e mantém o domínio de 0 a 77. Anagrama percorre runes com `range`, sem contar bytes ou normalizar Unicode.

Veja o [guia Go](../../docs/linguagens/go.md), os [contratos](../../docs/contratos.md) e o [guia Docker](../../docs/docker.md).
