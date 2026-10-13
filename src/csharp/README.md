# Desafios em C#

Os dez desafios usam **SDK .NET 10.0.100**, **C# 14** e `net10.0`. `global.json` fixa o SDK, sem aceitar outra versão por rollForward; `Directory.Build.props` ativa nullable, análise, avisos como erros e verificações de overflow em debug e release. As soluções usam somente a biblioteca padrão.

Da raiz, sem instalar SDK .NET ou compilador no computador:

```sh
docker compose run --build --rm csharp
```

O comando confere a versão, restaura dependências em modo travado, exige `dotnet format --verify-no-changes`, compila com análise e avisos como erros, executa toda a suíte xUnit em debug e release e os dez exemplos compilados. Cada exemplo verifica seu resultado antes de imprimir. Os testes consomem diretamente os 86 casos canônicos, copiados de `docs/casos`, e acrescentam referências independentes, vazios, duplicatas, listas de dez mil nós, identidade, estabilidade, mutação, Unicode e precisão.

As dependências são somente dos testes: xUnit.net 3.2.1, adapter 3.1.5 e Test SDK 17.14.1. Preserve os três `packages.lock.json`, que fixam versões transitivas e hashes de conteúdo. O parser System.Text.Json, BigInteger e as referências UTF-32 vêm da biblioteca padrão.

A imagem oficial `mcr.microsoft.com/dotnet/sdk:10.0.100-noble` é fixada pelo digest `sha256:c7445f141c04f1a6b454181bd098dcfa606c61ba0bd213d0a702489e5bd4cd71`. Fontes e casos são copiados para a imagem; restore, compilação e testes usam `runner` (UID 10001), sem privilégios. Não há SDK instalado no host, checkout montado ou volume persistente C#. Pacotes NuGet, `bin` e `obj` ficam no container e nas camadas de build.

Para uma classe de testes ou um exemplo:

```sh
docker compose run --build --rm csharp sh executar.sh testes BuscaBinariaTest
docker compose run --build --rm csharp sh executar.sh exemplo soma_de_dois
```

O exemplo imprime `soma_de_dois: (0, 1)`. O gerador mantém `_examples/Program.cs` a partir de `scripts/csharp-docs.mjs`, junto com os trechos dos READMEs. Não edite o arquivo gerado; após mudar os trechos, execute `npm run docs`. Ele deve continuar formatado pela mesma toolchain.

Se já tiver o SDK 10.0.100 em Linux/macOS, `sh src/csharp/executar.sh check` executa a mesma suíte. Para comandos individuais, inclusive no PowerShell, entre no microprojeto para que global.json seja encontrado:

```sh
cd src/csharp
dotnet restore LiveCoding.slnx --locked-mode
dotnet format LiveCoding.slnx --no-restore --verify-no-changes
dotnet build LiveCoding.slnx --no-restore --configuration Release
dotnet test _tests/Testes.csproj --no-build --no-restore --configuration Release
dotnet run --project _examples/Exemplos.csproj --no-restore --configuration Release -- soma_de_dois
```

`npm test` não executa C#. A CI verifica diretamente a imagem do SDK e o serviço da matriz Compose; Pages exige a mesma suíte antes da publicação.

Valores, somas e contagens usam `long` de 64 bits; índices usam `int`. `ReadOnlySpan<long>` permite somente ler números. Ausência de par é uma tupla nullable, ausência de soma usa `long?` e escadas lança `ArgumentOutOfRangeException`, mantendo 0 a 77. Anagrama usa `EnumerateRunes()` sem contar unidades UTF-16 nem normalizar. Nós são objetos reais `No`; identidade usa `ReferenceEquals`. Inversão e mesclagem alteram ligações; Floyd apenas lê. O coletor de lixo pode recolher ciclos que deixam de ser alcançáveis.

Veja o [guia C#](../../docs/linguagens/csharp.md), os [contratos](../../docs/contratos.md) e o [guia Docker](../../docs/docker.md).
