# PHP para iniciantes

Os dez desafios estão implementados em PHP, com funções independentes das outras linguagens. Você pode executá-los no terminal, sem servidor web. As soluções usam recursos padrão do PHP; PHPUnit e suas dependências são usados somente nos testes.

## Testar sem instalar ferramentas

Da raiz do clone, com Docker em modo Linux:

```sh
docker compose run --build --rm php
```

A imagem oficial, fixada por digest, fornece **PHP 8.4.26 de 64 bits**. Composer 2.9.8 instala **PHPUnit 12.5.34** e as dependências exatas do `composer.lock`. O comando confere a sintaxe e executa os **106 testes**, como usuário sem privilégios. Não instala PHP nem Composer no computador e não monta o checkout com escrita.

As dependências ficam na imagem; as camadas de instalação são reutilizadas enquanto o manifest e o lockfile não mudarem. Não há volume de cache PHP. `--build` incorpora suas edições; `--rm` remove o container quando ele termina. Veja [o guia Docker](../docker.md).

Só o desafio busca binária:

```sh
docker compose run --build --rm php composer --working-dir=src/php test -- --filter BuscaBinariaTest
```

Um exemplo de soma de dois:

```sh
docker compose run --build --rm php php src/php/soma_de_dois/exemplo.php
```

A saída é `[0,1]`: os índices zero e um têm números que somam nove.

## Alternativa com PHP local

Use **PHP 8.4 ou 8.5 de 64 bits** e **Composer 2.9.8**. PHPUnit precisa das extensões `dom`, `json`, `libxml`, `mbstring`, `xml` e `xmlwriter`; elas já estão disponíveis na imagem Docker usada aqui. `php -m` lista as extensões do seu PHP local. Para escolher a configuração, consulte `php --ini` e a [instalação oficial do PHPUnit](https://docs.phpunit.de/en/12.5/installation.html).

Da raiz, em PowerShell, Linux ou macOS:

```sh
composer --working-dir=src/php install
composer --working-dir=src/php check
```

`install` lê o lockfile e instala as dependências em `src/php/vendor`. `check` executa `php -l` nos arquivos próprios e depois PHPUnit. Os testes leem os casos canônicos por caminhos relativos aos arquivos, independentemente do diretório atual. `npm test` não executa PHP. A CI testa PHP 8.4 e 8.5, mais o container; Pages também testa PHP antes de publicar.

Para estudar uma solução sem PHPUnit ou Composer, basta PHP local:

```sh
php src/php/soma_de_dois/exemplo.php
```

Os dez arquivos `exemplo.php` são gerados junto com a documentação. Edite seus exemplos no gerador, não nesses arquivos. Cada README explica o uso e mostra a chamada completa.

## Lendo uma função

```php
<?php
declare(strict_types=1);

require_once 'src/php/bootstrap.php'; // Execute este exemplo da raiz do clone.
use function LiveCoding\soma_de_dois\somaDeDois;

$resposta = somaDeDois([2, 7, 11, 15], 9);
echo json_encode($resposta, JSON_THROW_ON_ERROR), PHP_EOL; // [0,1]
```

`<?php` inicia código PHP. Os arquivos só de código omitem o fechamento `?>` para evitar saída acidental de espaços. `require_once` carrega um arquivo uma única vez; `bootstrap.php` carrega as soluções sem depender de Composer. `namespace` organiza nomes e `use function` traz uma função para o arquivo atual. `echo` imprime; `PHP_EOL` termina a linha.

- Variáveis começam com `$`. `array` pode ser uma lista ou um mapa. Os arrays de entrada deste projeto são listas de inteiros, com índices consecutivos desde zero.
- `[]` cria um array. `$pilha[]` adiciona no fim; `array_pop` remove do fim. `isset($mapa[$chave])` verifica uma entrada não nula e aceita zero como valor existente.
- `?array`, `?int` e `?No` permitem o tipo indicado ou `null`. `??` fornece uma alternativa para ausência; `===` compara sem converter os tipos.
- `declare(strict_types=1)` no arquivo que faz a chamada impede conversões automáticas como string numérica para `int`. O tipo `array` não valida sozinho o tipo dos elementos nem a ordenação.
- Arrays são passados por valor e usam cópia sob escrita: não há cópia inteira apenas por chamar uma função que os lê. Nenhuma solução recebe arrays com `&`.

## Precisão, nós e mutação

Inteiros PHP dependem da plataforma. Exigimos 64 bits porque uma soma pode chegar a dez bilhões e escadas pode retornar `8.944.394.323.791.464`. A contagem usa somente adições inteiras. Não usamos float para guardar essas respostas. Composer exige `php-64bit`, e o bootstrap também confere `PHP_INT_SIZE`.

Escadas recebe `int|float` para rejeitar frações dos dados externos. Negativos, frações, valores acima de 77, NaN e infinitos lançam `InvalidArgumentException`, equivalente ao erro de domínio dos JSON. Chamadas estritas com string, booleano ou outro tipo não numérico lançam `TypeError`. O subarray vazio devolve `null`, não zero.

`No` é um objeto com `valor` inteiro somente de leitura e `proximo` alterável. `->` acessa propriedades. Atribuir um objeto a outra variável mantém acesso ao mesmo objeto; mudar sua propriedade altera o nó original. Inverter e mesclar reutilizam esses nós e alteram ligações. Detectar ciclo só lê os ponteiros.

Para objetos, `===` verifica identidade. `==` compara propriedades e pode seguir referências recursivas; não serve para detectar se os ponteiros chegaram ao mesmo nó. Os testes usam `assertSame` para conferir identidade, ordem e preservação de ligações.

## UTF-8 em palavras simples

Uma string PHP é uma sequência de bytes. `strlen` conta bytes; um emoji pode usar quatro. Anagrama precisa contar pontos de código completos. `_shared/unicode.php` valida UTF-8 uma vez e usa o primeiro byte para saber se o próximo ponto ocupa um, dois, três ou quatro bytes.

`yield` entrega cada ponto por um `Generator`, que retoma a leitura quando o `foreach` pede o próximo. Não é montado um array de todos os caracteres; o mapa guarda só frequências. O tempo continua linear e o espaço adicional da solução é proporcional aos pontos distintos. O auxiliar não normaliza acentos nem agrupa grafemas. Maiúsculas, espaços, quebras de linha e dígitos continuam significativos.

Parênteses aceita só seis símbolos ASCII de um byte; nesse exercício a leitura por byte é suficiente. Para as referências dos testes, usamos `mb_str_split` e ordenação, uma abordagem independente do gerador usado na solução.

## O que os testes verificam

Os **86 casos JSON** são executados por data providers do PHPUnit, com nome próprio para cada caso. Os **20 testes extras** conferem listas longas, identidade e mutação dos nós, precisão, tipos estritos, UTF-8 e todas as entradas válidas de escadas por contagem combinatória. Seis testes comparam os algoritmos com referências independentes e dados de semente fixa.

`vendor` e `.phpunit.cache` são ignorados pelo Git e pelo contexto Docker. Preserve o lockfile; não execute `composer update` apenas para testar. Para estudar os contratos comuns, consulte [Contratos](../contratos.md).

Referências: [tipos e chamadas estritas](https://www.php.net/manual/en/language.types.declarations.php), [inteiros PHP](https://www.php.net/manual/en/language.types.integer.php), [identidade de objetos](https://www.php.net/manual/en/language.oop5.object-comparison.php), [generators](https://www.php.net/manual/en/language.generators.overview.php) e [PHPUnit](https://docs.phpunit.de/en/12.5/writing-tests-for-phpunit.html).
