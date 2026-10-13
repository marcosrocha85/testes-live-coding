# C# para estudar os desafios

C# usa tipos estáticos e executa na plataforma .NET. Este microprojeto fixa **SDK .NET 10.0.100**, **C# 14** e `net10.0`. O SDK reúne compilador, runtime, CLI e formatador. As dez soluções usam a biblioteca padrão.

## Executar sem instalar SDK

Da raiz do repositório:

```sh
docker compose run --build --rm csharp
docker compose run --build --rm csharp sh executar.sh testes BuscaBinariaTest
docker compose run --build --rm csharp sh executar.sh exemplo soma_de_dois
```

O primeiro comando confere a versão, restaura dependências com lockfiles, verifica formatação, compila com análise e avisos como erros, roda toda a suíte em debug e release e os dez exemplos. Cada exemplo exige a resposta esperada antes de imprimir. O último imprime `soma_de_dois: (0, 1)`.

A imagem oficial está fixada por digest; fontes e casos são copiados, e compilação e testes rodam como usuário sem privilégios. Não há montagem do checkout nem SDK instalado no host. Veja [Docker](../docker.md).

Se já tiver SDK .NET 10.0.100, `sh src/csharp/executar.sh check` valida tudo em Linux/macOS. Com ferramentas já disponíveis, estes comandos também funcionam no PowerShell:

```sh
cd src/csharp
dotnet restore LiveCoding.slnx --locked-mode
dotnet format LiveCoding.slnx --no-restore --verify-no-changes
dotnet build LiveCoding.slnx --no-restore --configuration Debug
dotnet test _tests/Testes.csproj --no-build --no-restore --configuration Debug
dotnet build LiveCoding.slnx --no-restore --configuration Release
dotnet test _tests/Testes.csproj --no-build --no-restore --configuration Release
dotnet run --project _examples/Exemplos.csproj --no-restore --configuration Release -- soma_de_dois
```

Entre no microprojeto antes dos comandos: a resolução do SDK procura global.json a partir do diretório atual. `npm test` verifica a base Node e o site; não executa C#.

## Versão, projetos e dependências

`global.json` exige SDK 10.0.100 com `rollForward: disable` e sem versões de prévia. O script também confere `dotnet --version`. Se o SDK exato estiver ausente, use Docker. A [documentação de global.json](https://learn.microsoft.com/en-us/dotnet/core/tools/global-json) explica a seleção.

`Directory.Build.props` aplica `net10.0`, C# 14, tipos nullable, avisos como erros, análise e overflow a todos os projetos. `LiveCoding.slnx` reúne a biblioteca `LiveCoding.csproj`, o projeto de testes e o executável de exemplos. Os arquivos permanecem nas pastas originais; os manifests incluem as soluções e testes separadamente.

Os testes usam xUnit.net 3.2.1, adapter 3.1.5 e Test SDK 17.14.1. As versões diretas são exatas no projeto. Cada `packages.lock.json` registra também dependências transitivas e hashes; `--locked-mode` falha se houver divergência. Preserve os três lockfiles. NuGet.Config limita a fonte a nuget.org. System.Text.Json decodifica os casos sem outro pacote.

`dotnet format` vem com o SDK e lê `.editorconfig`; `--verify-no-changes` falha se o código precisar ser reformatado. `dotnet build` executa os analisadores e rejeita avisos. Consulte a [documentação do formatador](https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format).

O gerador mantém `_examples/Program.cs` junto com os trechos dos READMEs, a partir de [scripts/csharp-docs.mjs](../../scripts/csharp-docs.mjs). Edite a fonte e execute `npm run docs`; não altere o programa gerado manualmente.

## Classes, métodos e spans

`namespace LiveCoding;` agrupa os nomes do microprojeto. `public static class` contém métodos que podem ser chamados sem criar uma instância: `BuscaBinaria.Buscar(...)`. `var` pede ao compilador que descubra o tipo; não torna a variável dinâmica.

`long[]` é um array de valores. `ReadOnlySpan<long>` é uma vista que permite ler um trecho sem copiar o array nem escrever em seus elementos. As funções numéricas aceitam essa vista; arrays e expressões como `[2, 7, 11, 15]` são convertidos na chamada. `numeros[1..]` recorta a vista. As funções não ordenam nem modificam entradas.

`Dictionary<long, int>` associa valores a índices. TryGetValue devolve um bool e preenche o parâmetro out, distinguindo índice zero de ausência. TryAdd conserva a primeira ocorrência. Stack<char> usa Push e TryPop para implementar a pilha dos parênteses.

## Null e tuplas

`(int Anterior, int Atual)` é uma tupla com dois índices. O sufixo ? permite ausência: soma de dois retorna `(int Anterior, int Atual)?`. Um par presente tem HasValue=true; null equivale ao null dos JSON.

`long?` distingue subarray vazio de uma resposta presente, inclusive zero ou negativa. Confira HasValue antes de ler Value. O próprio método não lança erro para ausência.

`No?` descreve uma referência que pode ser null. Nullable permite ao compilador avisar quando o código pode acessar uma referência ausente; não muda o formato dos objetos em execução. `?.` acessa um campo somente se houver objeto; `??` escolhe uma alternativa se o primeiro valor for null. Busca mantém -1 como ausência, conforme o contrato.

## Inteiros e erros

`long` tem 64 bits assinados, independentemente de a máquina ser de 32 ou 64 bits. Valores, somas e frequências usam long. Índices e tamanhos usam int. Dez mil elementos de um milhão somam **10.000.000.000**, que não cabe em int.

Escadas aceita `double` somente na entrada para poder rejeitar frações, NaN e infinitos. A validação ocorre antes de converter para int. As contas usam exclusivamente long. O domínio permanece **0 a 77**: zero tem uma sequência vazia; 77 retorna exatamente **8.944.394.323.791.464**.

Entradas inválidas lançam `ArgumentOutOfRangeException`, equivalente a RangeError. A exceção informa ParamName=degraus e o valor recebido. Os testes conferem tipo, parâmetro e mensagem. Um chamador pode usar try/catch para tratar essa rejeição.

`CheckForOverflowUnderflow` ativa verificação de overflow tanto em debug quanto em release. As soluções pressupõem o domínio dos contratos, sem validar genericamente ordenação ou limites dos arrays. Testar valores maiores em casos locais apenas comprova o uso de long; não amplia o contrato.

## Unicode

Strings .NET usam UTF-16. `Length` conta unidades de 16 bits e `foreach(char)` percorre essas unidades. Um emoji pode ocupar duas unidades. Isso basta para rejeitar qualquer símbolo fora dos seis ASCII no exercício de parênteses, mas não para comparar anagramas.

`string.EnumerateRunes()` produz `System.Text.Rune`, um valor escalar Unicode completo. O anagrama usa Dictionary<Rune, long>, sem normalizar, agrupar grafemas, remover espaços ou ignorar maiúsculas. `"é"` e `"e\u0301"` têm pontos diferentes.

O contrato pressupõe strings Unicode bem formadas. Em sequências UTF-16 inválidas, EnumerateRunes produziria U+FFFD, como descreve a [documentação oficial](https://learn.microsoft.com/en-us/dotnet/api/system.string.enumeraterunes?view=net-10.0). A suíte cobre todos os valores escalares, emojis, acentos combinantes, multiplicidades e pares com as mesmas unidades UTF-16 contadas, mas pontos diferentes.

## Nós reais e identidade

`No` é uma classe, com Valor de leitura e Proximo mutável. Cada `new No(...)` cria um objeto distinto. Atribuir uma variável No guarda a referência ao objeto; não copia o nó. Arrays e LINQ são usados somente para montar fixtures ou comparar respostas, não para resolver os algoritmos de listas.

`ReferenceEquals(a, b)` compara identidade. Dois nós com Valor=1 não são o mesmo nó. Os testes usam Assert.Same para exigir os objetos originais; a referência independente de ciclo usa um HashSet com ReferenceEqualityComparer.

Inversão muda Proximo e devolve outra cabeça. Mesclagem exige entradas ordenadas, acíclicas e independentes; religa os próprios nós e mantém a primeira lista em empate. O único novo nó é a sentinela, fora da saída. Guarde a cabeça retornada. Floyd apenas lê, sem mudar os valores ou ligações.

## Memória e coletor de lixo

O coletor de lixo administra os objetos que deixam de ser alcançáveis. Ele também pode recolher ciclos sem exigir que o algoritmo quebre ligações. Não há destrutor recursivo, liberação manual, IDisposable ou ponteiros unsafe para esses nós. As fixtures mantêm referências aos nós originais enquanto verificam identidade e efeitos da mutação.

O instante de coleta não faz parte do contrato. Os testes verificam o comportamento dos algoritmos e as ligações; não dependem de forçar o coletor ou de observar uma liberação imediata.

## O que a suíte confere

Cada um dos 86 casos JSON é uma execução parametrizada xUnit. Referências independentes usam enumeração de pares para soma, compras e vendas para lucro, todos os trechos para subarray, remoção de pares para parênteses, varredura linear para busca e combinações com BigInteger para todo o domínio de escadas.

O anagrama é comparado com pontos decodificados em UTF-32 e ordenados. A inversão exige todos os nós na ordem inversa e restaura as ligações ao inverter novamente. A mesclagem é comparada à ordenação estável dos nós originais concatenados. Floyd é comparado a um conjunto de referências e consultado repetidamente para conferir ausência de mutação.

As verificações incluem vazios, duplicatas, entradas longas, identidade, estabilidade, precisão e Unicode. A mesma suíte roda em debug, release, CI e Docker.

Leia os [contratos](../contratos.md), a [arquitetura](../arquitetura.md) e a [documentação de C#](https://learn.microsoft.com/en-us/dotnet/csharp/).
