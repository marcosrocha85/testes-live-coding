import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { notasPascal, exemplosPascal, programaPascal } from './pascal-docs.mjs';
import { notasCpp, exemplosCpp, programaCpp } from './cpp-docs.mjs';
import { notasGo, exemplosGo, programaGo } from './go-docs.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const catalogo = JSON.parse(await readFile(resolve(root, 'docs/catalogo.json'), 'utf8'));
const disponiveis = catalogo.languages.filter((linguagem) => linguagem.status === 'implemented');
const listaNomes = (linguagens) => new Intl.ListFormat('pt-BR').format(linguagens.map((item) => item.name));
const aviso = '<!-- Gerado por npm run docs a partir de docs/catalogo.json e docs/casos. -->\n\n';
const baseGitHub = 'https://github.com/marcosrocha85/testes-live-coding';
let desatualizados = 0;

const notasTypeScript = {
  soma_de_dois: '`readonly number[]` permite ler o array, sem alterá-lo. `[number, number] | null` é uma tupla de dois índices ou ausência de resposta. `Map<number, number>` associa valores a índices. Confira `!== undefined`: o índice zero também é válido.',
  parenteses_validos: '`string[]` descreve a pilha. `Map<string, string>` associa um fechamento à sua abertura. `pop()` e `get()` podem devolver `undefined`, por isso a solução trata essa ausência antes de comparar.',
  inverter_lista_ligada: '`No | null` representa um nó ou o fim da lista. O laço verifica `atual !== null` antes de acessar seus campos. `import type` traz somente a descrição do tipo. A variável `seguinte` guarda uma referência ao nó existente; não cria uma cópia.',
  busca_binaria: '`readonly number[]` impede escrita no array pela função. Com `noUncheckedIndexedAccess`, uma leitura por índice pode ser `undefined`. O `!` informa ao compilador que os limites do laço garantem essa posição. Ele desaparece na compilação e não valida a ordenação ou a entrada em execução.',
  mesclar_listas_ordenadas: 'A classe `No` descreve o valor e a referência `proximo: No | null`. Os parâmetros podem ser `null`. O nó sentinela simplifica a primeira ligação e fica fora do resultado. O restante dos nós vem das listas originais; seus ponteiros são modificados.',
  compra_e_venda_de_acoes: '`readonly number[]` aceita também um array congelado. `Infinity` é um valor de `number`, usado como preço inicial maior que todos os preços válidos. O lucro começa em zero para representar a decisão de não negociar.',
  subarray_maximo: '`number | null` distingue a soma de um trecho da ausência de elementos. A primeira leitura é verificada antes do cálculo. Começar pelo primeiro valor mantém a resposta correta quando todos os números são negativos.',
  subir_escadas: '`number` continua usando a mesma representação numérica do JavaScript. O limite de 77 preserva resultados inteiros exatos. `Number.isInteger` e `RangeError` continuam necessários em execução, pois os tipos não impedem que JavaScript ou dados externos forneçam valores inválidos.',
  anagrama_valido: '`Map<string, number>` guarda a frequência de cada ponto de código. O tipo `string` não muda as regras de Unicode do JavaScript. `for...of` lê pontos de código completos; não conta unidades UTF-16 isoladas, não normaliza acentos e não agrupa grafemas.',
  ciclo_em_lista_ligada: 'Os ponteiros têm tipo `No | null`. As verificações no laço permitem acessar seus campos com segurança. `lento === rapido` compara referências aos próprios objetos. O tipo do valor do nó não determina se existe um ciclo.'
};

const notasJava = {
  soma_de_dois: '`int[]` é um array de inteiros. A resposta é um novo array com dois índices, ou `null`. `HashMap<Integer, Integer>` usa as versões objeto dos números como chaves e valores. `putIfAbsent` conserva o primeiro índice. O `Integer` retornado por `get` pode ser `null`.',
  parenteses_validos: '`Deque<Character>` representa a pilha e `ArrayDeque` é sua implementação. `push` coloca no topo e `pop` remove do topo. O teste de pilha vazia acontece antes de remover. `charAt` é adequado aqui porque todos os símbolos aceitos são ASCII; qualquer outro caractere é rejeitado.',
  inverter_lista_ligada: '`No` é a classe dos nós. Uma variável `No` guarda uma referência ao objeto e também pode ser `null`. Guardar `seguinte` preserva a ligação antiga enquanto `atual.proximo` é mudado. O resultado aponta para um dos objetos originais.',
  busca_binaria: 'Índices e valores usam `int`. A divisão de inteiros calcula a posição central. O laço só acessa posições entre os limites do array; por isso uma entrada vazia retorna `-1` sem tentar ler o índice zero. A função não ordena nem modifica os valores.',
  mesclar_listas_ordenadas: 'O nó sentinela simplifica a primeira ligação e não aparece no resultado. Os nós reais são reaproveitados. `<=` preserva a preferência pela primeira lista quando os valores são iguais. O operador `?:` escolhe o restante da lista que ainda não terminou.',
  compra_e_venda_de_acoes: '`Integer.MAX_VALUE` é um preço inicial maior que qualquer preço permitido pelo contrato. As diferenças de preço cabem em `int` porque os preços estão entre zero e um milhão. O lucro começa em zero e só aumenta quando a venda acontece depois da compra.',
  subarray_maximo: 'Cada elemento cabe em `int`, mas a soma pode chegar a dez bilhões. Por isso os acumuladores usam `long`. A saída usa `Long`, a versão objeto que também pode ser `null` para um array vazio. Um valor negativo continua sendo uma resposta válida.',
  subir_escadas: 'A entrada `double` permite verificar e rejeitar valores fracionários, como nos casos JSON. Após conferir que ela é finita, inteira e está entre 0 e 77, a conversão para `int` é segura. Os resultados usam `long`, com 64 bits. `IllegalArgumentException` equivale à rejeição de domínio indicada por `RangeError` nos casos compartilhados.',
  anagrama_valido: '`String` usa UTF-16, mas `codePoints()` percorre pontos de código inteiros. `PrimitiveIterator.OfInt` permite ler cada ponto sem copiar toda a string para um array. O mapa liga cada ponto à sua frequência. Não há normalização, comparação de grafemas ou remoção de espaços.',
  ciclo_em_lista_ligada: '`==` compara referências aos próprios objetos `No`. A comparação não usa os valores numéricos dos nós. Enquanto o ponteiro rápido consegue avançar duas posições, o lento consegue avançar uma. Nenhum campo `proximo` é alterado.'
};

const exemplosJava = {
  soma_de_dois: 'System.out.println(java.util.Arrays.toString(SomaDeDois.somaDeDois(new int[] {2, 7, 11, 15}, 9))); // [0, 1]',
  parenteses_validos: 'System.out.println(ParentesesValidos.parentesesValidos("{[()]}")); // true',
  inverter_lista_ligada: 'No cabeca = new No(1, new No(2, new No(3)));\nNo invertida = InverterListaLigada.inverterListaLigada(cabeca);\nSystem.out.println(invertida.valor); // 3; as ligações agora são 3 → 2 → 1 → null',
  busca_binaria: 'System.out.println(BuscaBinaria.buscaBinaria(new int[] {1, 3, 5, 7, 9}, 7)); // 3',
  mesclar_listas_ordenadas: 'No primeira = new No(1, new No(3));\nNo segunda = new No(2, new No(4));\nNo mesclada = MesclarListasOrdenadas.mesclarListasOrdenadas(primeira, segunda);\nSystem.out.println(mesclada.valor); // 1; a sequência é 1 → 2 → 3 → 4 → null',
  compra_e_venda_de_acoes: 'System.out.println(CompraEVendaDeAcoes.maiorLucro(new int[] {7, 1, 5, 3, 6, 4})); // 5',
  subarray_maximo: 'System.out.println(SubarrayMaximo.subarrayMaximo(new int[] {-2, 1, -3, 4, -1, 2, 1, -5, 4})); // 6',
  subir_escadas: 'System.out.println(SubirEscadas.subirEscadas(5)); // 8',
  anagrama_valido: 'System.out.println(AnagramaValido.anagramaValido("😀a😀", "😀😀a")); // true',
  ciclo_em_lista_ligada: 'No primeiro = new No(1);\nNo segundo = new No(2);\nprimeiro.proximo = segundo;\nsegundo.proximo = primeiro;\nSystem.out.println(CicloEmListaLigada.temCiclo(primeiro)); // true'
};

const notasKotlin = {
  soma_de_dois: '`IntArray` guarda inteiros; `IntArray?` permite devolver `null`. `mutableMapOf<Int, Int>()` liga cada valor ao primeiro índice. Uma consulta ausente devolve `null`, mas o índice zero é válido. `putIfAbsent` mantém a primeira ocorrência.',
  parenteses_validos: '`ArrayDeque<Char>` é a pilha. `addLast` e `removeLastOrNull` usam a mesma ponta. A remoção devolve `null` quando falta uma abertura. `when` distingue os símbolos aceitos; qualquer outro torna a sequência inválida.',
  inverter_lista_ligada: '`No?` indica uma referência que pode ser `null`. Dentro do laço, o compilador reconhece que `atual` não é nulo. `val seguinte` preserva uma referência; o objeto continua o mesmo. `var proximo` permite alterar a ligação.',
  busca_binaria: '`lastIndex` vale `-1` em um array vazio. Assim o laço termina antes de ler uma posição. A divisão de dois `Int` também produz um inteiro. `when` escolhe qual limite mudar; a entrada precisa estar ordenada.',
  mesclar_listas_ordenadas: '`a ?: b` usa `a` se ele não for nulo; caso contrário, usa `b`. O sentinela facilita a primeira ligação e não faz parte da saída. `<=` mantém os nós da primeira lista antes dos da segunda em empate. Os nós são reutilizados.',
  compra_e_venda_de_acoes: '`1..precos.lastIndex` percorre dias depois do primeiro; a faixa `1..0` é vazia para um único preço. `maxOf` e `minOf` escolhem entre dois valores. A comparação do lucro ocorre antes de atualizar o menor preço, preservando a ordem dos dias.',
  subarray_maximo: '`Long?` representa uma soma de 64 bits ou ausência de elementos. `toLong()` amplia cada número antes da adição: somar em `Int` e converter depois poderia perder a resposta. O primeiro valor inicializa as somas para aceitar trechos só negativos.',
  subir_escadas: '`Double` permite receber e rejeitar frações vindas dos dados externos. Kotlin não converte `Int` em `Double` implicitamente: use `3.0` ou `n.toDouble()`. `require` lança `IllegalArgumentException` para NaN, infinitos, frações e valores fora de 0 a 77. Depois da validação, `toInt()` é seguro. `1L` é um literal `Long`; as contagens são exatas.',
  anagrama_valido: '`Char` representa uma unidade UTF-16, enquanto `codePoints().iterator()` percorre pontos de código completos sem copiar a string. A chave do mapa é o código inteiro do símbolo. `?: 0` começa a contagem; `?: return false` rejeita um símbolo ausente. Maiúsculas, espaços e acentos continuam significativos.',
  ciclo_em_lista_ligada: '`?.` só acessa o campo se a referência existir. `===` compara identidade: os dois ponteiros precisam chegar ao mesmo objeto. A classe `No` é uma classe comum, sem igualdade recursiva de `data class`. Nenhum ponteiro é modificado.'
};

const exemplosKotlin = {
  soma_de_dois: 'println(somaDeDois(intArrayOf(2, 7, 11, 15), 9)?.contentToString()) // [0, 1]',
  parenteses_validos: 'println(parentesesValidos("{[()]}")) // true',
  inverter_lista_ligada: 'val cabeca = No(1, No(2, No(3)))\nval invertida = inverterListaLigada(cabeca)\nprintln(invertida?.valor) // 3; as ligações são 3 → 2 → 1 → null',
  busca_binaria: 'println(buscaBinaria(intArrayOf(1, 3, 5, 7, 9), 7)) // 3',
  mesclar_listas_ordenadas: 'val mesclada = mesclarListasOrdenadas(No(1, No(3)), No(2, No(4)))\nprintln(mesclada?.valor) // 1; a sequência é 1 → 2 → 3 → 4 → null',
  compra_e_venda_de_acoes: 'println(maiorLucro(intArrayOf(7, 1, 5, 3, 6, 4))) // 5',
  subarray_maximo: 'println(subarrayMaximo(intArrayOf(-2, 1, -3, 4, -1, 2, 1, -5, 4))) // 6',
  subir_escadas: 'println(subirEscadas(3.0)) // 3',
  anagrama_valido: 'println(anagramaValido("😀a😀", "😀😀a")) // true',
  ciclo_em_lista_ligada: 'val primeiro = No(1)\nval segundo = No(2, primeiro)\nprimeiro.proximo = segundo\nprintln(temCiclo(primeiro)) // true'
};

const notasPHP = {
  soma_de_dois: '`array` é usado como lista na entrada e como mapa em `$vistos`. A anotação `list<int>` documenta índices de zero a n - 1; PHP não verifica os tipos dos elementos. `isset` aceita o índice zero como valor existente. `?array` permite retornar `null`. Os arrays são passados por valor, sem `&`.',
  parenteses_validos: '`$pilha[]` acrescenta uma abertura ao fim do array. `array_pop` remove dessa mesma ponta e devolve `null` se estiver vazia. Strings PHP são sequências de bytes; acessar um byte é adequado porque os seis símbolos aceitos são ASCII. A comparação `!==` evita conversões implícitas.',
  inverter_lista_ligada: '`?No` aceita um objeto ou `null`. `->` acessa uma propriedade. Atribuir um objeto a outra variável conserva o mesmo objeto; não faz uma cópia. Por isso guardar `$seguinte` preserva o restante da lista e mudar `proximo` altera o nó original, mesmo sem usar `&`.',
  busca_binaria: '`count` mede o array e `intdiv` divide dois inteiros sem produzir um float. A entrada é uma lista de inteiros com índices consecutivos, começando em zero. `===` compara também o tipo. A função não ordena a entrada; no array vazio, o fim vale -1 e não há leitura de posição.',
  mesclar_listas_ordenadas: '`new No(0)` cria somente o sentinela, que fica fora da resposta. Os outros objetos vêm das listas originais. `<=` escolhe o nó da primeira lista em empate. `??` usa a primeira referência não nula. Alterar uma propriedade do objeto modifica o nó recebido.',
  compra_e_venda_de_acoes: 'O array é uma lista de preços inteiros. `max` e `min` escolhem entre dois valores. O lucro é calculado antes de atualizar o menor preço, para manter a compra em um dia anterior. Zero representa a decisão de não negociar.',
  subarray_maximo: '`?int` permite uma soma inteira ou `null` para a entrada vazia. O microprojeto exige PHP de 64 bits: a soma de dez bilhões não cabe em um inteiro de 32 bits. Começar no primeiro valor permite uma resposta negativa quando todos os números são negativos.',
  subir_escadas: '`int|float` permite validar também valores fracionários dos casos externos. `is_finite` e `floor` rejeitam NaN, infinitos e frações; negativos e valores acima de 77 lançam `InvalidArgumentException`. Somente a validação usa float; as contagens usam inteiros de 64 bits. Em chamadas com `strict_types=1`, strings numéricas e booleanos causam `TypeError`.',
  anagrama_valido: '`pontosDeCodigo` entrega strings UTF-8 completas por um Generator, sem criar um array de todos os caracteres. O prefixo `c:` impede que dígitos virem chaves inteiras no mapa. `?? 0` inicia uma contagem e `unset` remove uma chave já consumida. O auxiliar valida UTF-8 uma vez e usa o primeiro byte para determinar a largura do ponto. Espaços, maiúsculas e acentos continuam significativos.',
  ciclo_em_lista_ligada: '`===` compara se os ponteiros apontam para o mesmo objeto. `==` poderia comparar propriedades e não serve para Floyd. O laço verifica a existência do rápido e do próximo nó antes de avançar duas posições. Os campos são apenas lidos.'
};

const exemplosPHP = {
  soma_de_dois: 'echo json_encode(somaDeDois([2, 7, 11, 15], 9), JSON_THROW_ON_ERROR), PHP_EOL; // [0,1]',
  parenteses_validos: 'var_export(parentesesValidos("{[()]}")); // true\necho PHP_EOL;',
  inverter_lista_ligada: '$cabeca = new No(1, new No(2, new No(3)));\n$invertida = inverterListaLigada($cabeca);\necho $invertida->valor, PHP_EOL; // 3; as ligações são 3 → 2 → 1 → null',
  busca_binaria: 'echo buscaBinaria([1, 3, 5, 7, 9], 7), PHP_EOL; // 3',
  mesclar_listas_ordenadas: '$mesclada = mesclarListasOrdenadas(new No(1, new No(3)), new No(2, new No(4)));\necho $mesclada->valor, PHP_EOL; // 1; a sequência é 1 → 2 → 3 → 4 → null',
  compra_e_venda_de_acoes: 'echo maiorLucro([7, 1, 5, 3, 6, 4]), PHP_EOL; // 5',
  subarray_maximo: 'echo subarrayMaximo([-2, 1, -3, 4, -1, 2, 1, -5, 4]), PHP_EOL; // 6',
  subir_escadas: 'echo subirEscadas(3), PHP_EOL; // 3',
  anagrama_valido: 'var_export(anagramaValido("😀a😀", "😀😀a")); // true\necho PHP_EOL;',
  ciclo_em_lista_ligada: '$primeiro = new No(1);\n$segundo = new No(2, $primeiro);\n$primeiro->proximo = $segundo;\nvar_export(temCiclo($primeiro)); // true\necho PHP_EOL;'
};

const notasSwift = {
  "soma_de_dois": "`[Int]` é um array de inteiros e `[Int]?` permite devolver `nil`. O parâmetro `_` permite chamar a função sem escrever rótulos. `Dictionary` associa valores a índices; `if let` distingue um índice existente, inclusive zero, de `nil`. Arrays têm semântica de valor e não são recebidos como `inout`.",
  "parenteses_validos": "`unicodeScalars` percorre pontos de código. A pilha guarda seus códigos `UInt32`: 40 e 41 são os parênteses, 91 e 93 são os colchetes, 123 e 125 são as chaves. `append` e `popLast` usam a mesma ponta do array. `popLast()` pode devolver `nil`, o que invalida um fechamento sem abertura. Outros símbolos são rejeitados.",
  "inverter_lista_ligada": "`No?` é uma referência opcional. `while let` extrai um nó enquanto a referência existe. A classe preserva identidade: `let seguinte` conserva o mesmo objeto, sem copiá-lo. `let` impede trocar uma variável, mas a propriedade `var proximo` do objeto ainda pode mudar.",
  "busca_binaria": "`Int` representa índices e valores. A divisão inteira calcula o meio. `fim` começa em -1 se o array está vazio, então nenhuma posição é lida. O array é um valor recebido sem `inout`; a função não modifica nem ordena sua entrada.",
  "mesclar_listas_ordenadas": "`if` com `<=` preserva a preferência pela primeira lista em empate. `while let` exige que ambas tenham um nó. `a ?? b` escolhe a referência não nula restante. A classe permite reutilizar os objetos originais e alterar suas ligações; o único nó novo é o sentinela, fora da resposta.",
  "compra_e_venda_de_acoes": "`first` é opcional: `guard` retorna zero se não há preços. `dropFirst()` percorre os dias após o primeiro sem copiar todo o array. O menor preço só é atualizado depois de avaliar a venda atual. `max` e `min` escolhem entre dois inteiros.",
  "subarray_maximo": "`Int?` distingue uma soma de `nil` para o array vazio. O microprojeto exige plataforma de 64 bits: a soma pode chegar a dez bilhões. Iniciar no primeiro número preserva respostas negativas. Não use operações com overflow modular, como `&+`, para calcular a soma.",
  "subir_escadas": "`Double` permite receber frações e rejeitá-las antes de converter para `Int`. `isFinite` elimina NaN e infinitos; `Int(exactly:)` só converte valores inteiros representáveis, devolvendo nil para frações. `throws` sinaliza que a função pode lançar `ErroDeEntrada.degrausForaDoDominio`; chame com `try`. Somente a entrada usa Double: as contagens usam inteiros exatos de 64 bits. O limite permanece 77, como nas outras linguagens.",
  "anagrama_valido": "`String` percorre grafemas quando usado diretamente em um `for`, e sua igualdade considera equivalência canônica. Isso não atende este contrato. `unicodeScalars` percorre pontos de código e `.value` fornece um `UInt32` para cada um. As chaves numéricas do mapa preservam acentos compostos, maiúsculas e espaços sem normalizar o texto. Os pontos são lidos sem criar arrays das strings.",
  "ciclo_em_lista_ligada": "`?.` acessa uma propriedade somente quando a referência existe. `===` compara a identidade dos objetos, não seus valores. As ligações são apenas lidas. Swift usa ARC; ciclos de referências fortes continuam na memória até serem desfeitos. Os testes e o exemplo quebram o ciclo após verificar o resultado. Usar `weak` em todo campo proximo faria uma lista normal perder seus nós quando só a cabeça fosse mantida."
};

const exemplosSwift = {
  "soma_de_dois": "print(somaDeDois([2, 7, 11, 15], 9) ?? []) // [0, 1]",
  "parenteses_validos": "print(parentesesValidos(\"{[()]}\")) // true",
  "inverter_lista_ligada": "let cabeca = No(1, No(2, No(3)))\nlet invertida = inverterListaLigada(cabeca)\nprint(invertida?.valor ?? 0) // 3; as ligações são 3 → 2 → 1 → nil",
  "busca_binaria": "print(buscaBinaria([1, 3, 5, 7, 9], 7)) // 3",
  "mesclar_listas_ordenadas": "let mesclada = mesclarListasOrdenadas(No(1, No(3)), No(2, No(4)))\nprint(mesclada?.valor ?? 0) // 1; a sequência é 1 → 2 → 3 → 4 → nil",
  "compra_e_venda_de_acoes": "print(maiorLucro([7, 1, 5, 3, 6, 4])) // 5",
  "subarray_maximo": "print(subarrayMaximo([-2, 1, -3, 4, -1, 2, 1, -5, 4]) ?? 0) // 6",
  "subir_escadas": "print(try subirEscadas(3)) // 3",
  "anagrama_valido": "print(anagramaValido(\"😀a😀\", \"😀😀a\")) // true",
  "ciclo_em_lista_ligada": "let primeiro = No(1)\nlet segundo = No(2, primeiro)\nprimeiro.proximo = segundo\ndefer { primeiro.proximo = nil; segundo.proximo = nil } // Libera o ciclo em ARC.\nprint(temCiclo(primeiro)) // true"
};

async function salvar(caminho, conteudo) {
  const destino = resolve(root, caminho);
  if (process.argv.includes('--check')) {
    let atual;
    try { atual = await readFile(destino, 'utf8'); } catch { atual = ''; }
    if (atual !== conteudo) {
      console.error(`Documento desatualizado: ${caminho}`);
      desatualizados++;
    }
  } else {
    await mkdir(dirname(destino), { recursive: true });
    await writeFile(destino, conteudo);
  }
}

function comandoDesafio(linguagem, id) {
  if (linguagem.id === 'go') return `docker compose run --build --rm go sh executar.sh testes ${id}`;
  if (linguagem.id === 'cpp') return `docker compose run --build --rm cpp sh src/cpp/executar.sh testes ${id}`;
  if (linguagem.id === 'pascal') return `docker compose run --build --rm pascal sh src/pascal/executar.sh testes ${id}`;
  if (linguagem.id === 'javascript') return `node --test src/javascript/${id}/index.test.js`;
  if (linguagem.id === 'typescript') return `npm run build --workspace src/typescript\nnode --test src/typescript/dist/${id}/index.test.js`;
  if (linguagem.exerciseTestCommand) {
    const testClass = linguagem.testFiles[id].split('/').at(-1).replace(/\.[^.]+$/, '');
    return linguagem.exerciseTestCommand.replace('{testClass}', testClass);
  }
  return linguagem.testCommand;
}

for (const exercicio of catalogo.exercises) {
  const casos = JSON.parse(await readFile(resolve(root, `docs/casos/${exercicio.id}.json`), 'utf8'));
  const listaCasos = casos.map((caso) => {
    const esperado = caso.error ? `erro ${caso.error}` : caso.expectedIndices ? `um dos índices ${JSON.stringify(caso.expectedIndices)}` : JSON.stringify(caso.expected);
    return `- **${caso.name}**: entrada \`${JSON.stringify(caso.input)}\`; saída \`${esperado}\`.`;
  }).join('\n');
  const implementacoes = disponiveis.map((linguagem) => {
    const solucao = linguagem.solutionFiles?.[exercicio.id] ?? `src/${linguagem.id}/${exercicio.id}/index.${linguagem.extension}`;
    const testes = linguagem.testFiles?.[exercicio.id] ?? `src/${linguagem.id}/${exercicio.id}/index.test.${linguagem.extension}`;
    return `- [Solução ${linguagem.name}](${baseGitHub}/blob/main/${solucao})\n- [Testes ${linguagem.name}](${baseGitHub}/blob/main/${testes})`;
  }).join('\n');
  const comandos = disponiveis.map((linguagem) => {
    if (!linguagem.dockerTestCommand) throw new Error(`Linguagem implementada sem comando Docker: ${linguagem.id}`);
    const comando = comandoDesafio(linguagem, exercicio.id);
    const docker = `\nCom Docker, todos os desafios de ${linguagem.name}: \`${linguagem.dockerTestCommand}\`. Veja [como executar sem SDK local](${baseGitHub}/blob/main/docs/docker.md).\n`;
    if (['pascal', 'cpp', 'go'].includes(linguagem.id)) {
      return `### ${linguagem.name}\n\nDa raiz, sem instalar compilador no computador:\n\n\`\`\`sh\n${comando}\n\`\`\`\n` + docker;
    }
    if (linguagem.id === 'java') {
      const windows = comando.replace('./src/java/mvnw', '.\\src\\java\\mvnw.cmd').replace(/-Dtest=([^ ]+)/, '"-Dtest=$1"');
      return `### Java\n\nDa raiz, com JDK 21 ou superior. Linux/macOS:\n\n\`\`\`sh\n${comando}\n\`\`\`\n\nPowerShell:\n\n\`\`\`powershell\n${windows}\n\`\`\`\n` + docker;
    }
    if (linguagem.id === 'kotlin') {
      const windows = comando.replace('./src/kotlin/gradlew', '.\\src\\kotlin\\gradlew.bat');
      return `### Kotlin\n\nDa raiz, com JDK 21. O Wrapper baixa Gradle e o compilador Kotlin. Linux/macOS:\n\n\`\`\`sh\n${comando}\n\`\`\`\n\nPowerShell:\n\n\`\`\`powershell\n${windows}\n\`\`\`\n` + docker;
    }
    if (linguagem.id === 'php') {
      return `### PHP\n\nDa raiz, com PHP 8.4 ou 8.5 de 64 bits e Composer. O comando funciona também no PowerShell:\n\n\`\`\`sh\ncomposer --working-dir=src/php install\n${comando}\n\`\`\`\n` + docker;
    }
    return `### ${linguagem.name}\n\nDa raiz do repositório, após \`npm ci\`:\n\n\`\`\`sh\n${comando}\n\`\`\`\n` + docker;
  }).join('\n');
  const corpo = [
    `# ${exercicio.name}`,
    `Nome na entrevista: **${exercicio.problemName}**. Pasta: \`${exercicio.id}\`.`,
    '## Problema', exercicio.problem,
    '## Ideia', exercicio.idea,
    exercicio.steps.map((passo, indice) => `${indice + 1}. ${passo}`).join('\n'),
    '## Exemplo explicado', exercicio.walkthrough,
    `\`\`\`js\n${exercicio.example}\n\`\`\``,
    '## Por que pedir este teste?', exercicio.why,
    'Capacidades avaliadas:',
    exercicio.skills.map((habilidade) => `- ${habilidade}`).join('\n'),
    'O exercício fornece evidência dessas habilidades. A avaliação deve considerar também como a pessoa explica, testa e discute alternativas; uma resposta memorizada sozinha não comprova domínio.',
    '## Contrato', exercicio.contract,
    '## Complexidade', `- Tempo: ${exercicio.time}.\n- Espaço adicional: ${exercicio.space}.`,
    `Consulte as definições de complexidade e o domínio das entradas em [Contratos](${baseGitHub}/blob/main/docs/contratos.md).`,
    '## Erros comuns', exercicio.pitfalls.map((erro) => `- ${erro}`).join('\n'),
    '## Casos compartilhados', listaCasos,
    'Os portes devem executar esses exemplos e acrescentar testes próprios da linguagem. Os exercícios de listas também precisam verificar identidade dos nós e efeitos nos ponteiros.',
    '## Implementação e testes',
    `${implementacoes}\n- [Casos JSON](${baseGitHub}/blob/main/docs/casos/${exercicio.id}.json)\n- [Comparar linguagens no site](https://marcosrocha85.github.io/testes-live-coding/#${exercicio.id}.javascript)`,
    comandos
  ].join('\n\n');
  await salvar(`docs/tests/${exercicio.id}.md`, aviso + corpo);
  await salvar(`docs/wiki/${exercicio.id}.md`, aviso + corpo);
  for (const linguagem of disponiveis) {
    let notas = linguagem.id === 'typescript'
      ? `\n## Lendo os tipos desta solução\n\n${notasTypeScript[exercicio.id]}\n\nVeja [o guia de TypeScript](${baseGitHub}/blob/main/docs/linguagens/typescript.md) para instalação, compilação e conceitos.\n`
      : '';
    if (linguagem.id === 'java') {
      const classe = linguagem.solutionFiles[exercicio.id].split('/').at(-1).replace('.java', '');
      const importaNo = ['inverter_lista_ligada', 'mesclar_listas_ordenadas', 'ciclo_em_lista_ligada'].includes(exercicio.id);
      const imports = `import tinker.livecoding.${exercicio.id}.${classe};\n` + (importaNo ? 'import tinker.livecoding._shared.No;\n' : '');
      notas = `\n## Particularidades em Java\n\n${notasJava[exercicio.id]}\n\n## Exemplo em Java\n\nCompile com Maven e abra \`jshell --class-path src/java/target/classes\` da raiz. No JShell, execute:\n\n\`\`\`java\n${imports}\n${exemplosJava[exercicio.id]}\n\`\`\`\n\nVeja [o guia de Java](${baseGitHub}/blob/main/docs/linguagens/java.md) para instalação, ferramentas, tipos e comandos.\n`;
    }
    if (linguagem.id === 'kotlin') {
      const imports = `import livecoding.${exercicio.id}.${exercicio.functionName}\n` + (linguagem.supportFilesByExercise?.[exercicio.id] ? 'import livecoding._shared.No\n' : '');
      const exemplo = exemplosKotlin[exercicio.id].split('\n').map(linha => `    ${linha}`).join('\n');
      notas = `\n## Particularidades em Kotlin\n\n${notasKotlin[exercicio.id]}\n\n## Exemplo de uso em Kotlin\n\nAs funções são declaradas no topo do arquivo. Em um programa Kotlin que use este microprojeto:\n\n\`\`\`kotlin\n${imports}\nfun main() {\n${exemplo}\n}\n\`\`\`\n\nVeja [o guia de Kotlin](${baseGitHub}/blob/main/docs/linguagens/kotlin.md) para ferramentas, tipos, Unicode e comandos.\n`;
    }
    if (linguagem.id === 'php') {
      const usaNo = ['inverter_lista_ligada', 'mesclar_listas_ordenadas', 'ciclo_em_lista_ligada'].includes(exercicio.id);
      const imports = `use function LiveCoding\\${exercicio.id}\\${exercicio.functionName};\n` + (usaNo ? 'use LiveCoding\\Shared\\No;\n' : '');
      const exemplo = `<?php\ndeclare(strict_types=1);\n\n// Gerado por npm run docs. Consulte o README deste desafio.\nrequire_once dirname(__DIR__) . '/bootstrap.php';\n\n${imports}\n${exemplosPHP[exercicio.id]}\n`;
      await salvar(`src/php/${exercicio.id}/exemplo.php`, exemplo);
      notas = `\n## Particularidades em PHP\n\n${notasPHP[exercicio.id]}\n\n## Exemplo executável em PHP\n\nCom PHP local, execute da raiz (sem instalar Composer para este exemplo):\n\n\`\`\`sh\nphp src/php/${exercicio.id}/exemplo.php\n\`\`\`\n\nOu dentro do container:\n\n\`\`\`sh\ndocker compose run --build --rm php php src/php/${exercicio.id}/exemplo.php\n\`\`\`\n\n\`\`\`php\n${exemplo}\`\`\`\n\nVeja [o guia de PHP](${baseGitHub}/blob/main/docs/linguagens/php.md) para ferramentas, tipos, Unicode e comandos.\n`;
    }
    if (linguagem.id === 'swift') {
      notas = `\n## Particularidades em Swift\n\n${notasSwift[exercicio.id]}\n\n## Exemplo executável em Swift\n\nCom Swift local, execute da raiz:\n\n\`\`\`sh\nswift run --package-path src/swift --jobs 2 exemplo ${exercicio.id}\n\`\`\`\n\nOu no container:\n\n\`\`\`sh\ndocker compose run --build --rm swift swift run --package-path src/swift --jobs 2 exemplo ${exercicio.id}\n\`\`\`\n\nO trecho abaixo faz parte do executável de exemplos, compilado pelo Package Manager:\n\n\`\`\`swift\nimport LiveCoding\n\n${exemplosSwift[exercicio.id]}\n\`\`\`\n\nVeja [o guia Swift](${baseGitHub}/blob/main/docs/linguagens/swift.md) para ferramentas, tipos, Unicode e ARC.\n`;
    }
    if (linguagem.id === 'pascal') {
      notas = `\n## Particularidades em Pascal\n\n${notasPascal[exercicio.id]}\n\n## Exemplo executável em Pascal\n\nDa raiz, compile e execute no container:\n\n\`\`\`sh\ndocker compose run --build --rm pascal sh src/pascal/executar.sh exemplo ${exercicio.id}\n\`\`\`\n\nEste trecho pertence ao programa gerado \`_examples/exemplos.pas\`. \`Exigir\` lança uma exceção se o exemplo produzir um resultado inesperado. As variáveis e units usadas estão declaradas no programa completo:\n\n\`\`\`pascal\n${exemplosPascal[exercicio.id]}\n\`\`\`\n\nVeja [o guia Pascal](${baseGitHub}/blob/main/docs/linguagens/pascal.md) para compilação, tipos, Unicode e gerenciamento de memória.\n`;
    }
    if (linguagem.id === 'cpp') {
      notas = `\n## Particularidades em C++\n\n${notasCpp[exercicio.id]}\n\n## Exemplo executável em C++\n\nDa raiz, compile e execute no container:\n\n\`\`\`sh\ndocker compose run --build --rm cpp sh src/cpp/executar.sh exemplo ${exercicio.id}\n\`\`\`\n\nEste trecho faz parte de \`_examples/main.cpp\`, gerado com os headers de cada desafio. Os nomes estão no namespace \`desafios\`; \`exigir\` lança uma exceção se a resposta estiver incorreta:\n\n\`\`\`cpp\n${exemplosCpp[exercicio.id]}\n\`\`\`\n\nVeja [o guia C++](${baseGitHub}/blob/main/docs/linguagens/cpp.md) para compilação, tipos, Unicode e propriedade da memória.\n`;
    }
    if (linguagem.id === 'go') {
      notas = `\n## Particularidades em Go\n\n${notasGo[exercicio.id]}\n\n## Exemplo executável em Go\n\nDa raiz, compile e execute no container:\n\n\`\`\`sh\ndocker compose run --build --rm go sh executar.sh exemplo ${exercicio.id}\n\`\`\`\n\nEste trecho faz parte de \`cmd/exemplos/main.go\`, gerado junto com os imports e a função main. \`exigir\` encerra o programa se o resultado for inesperado:\n\n\`\`\`go\n${exemplosGo[exercicio.id]}\n\`\`\`\n\nVeja [o guia Go](${baseGitHub}/blob/main/docs/linguagens/go.md) para módulos, slices, mapas, nil, ponteiros, Unicode e erros.\n`;
    }
    await salvar(`src/${linguagem.id}/${exercicio.id}/README.md`, aviso + corpo + notas);
  }
}

if (disponiveis.some(item => item.id === 'pascal')) {
  await salvar('src/pascal/_examples/exemplos.pas', programaPascal(catalogo.exercises));
}

if (disponiveis.some(item => item.id === 'cpp')) {
  await salvar('src/cpp/_examples/main.cpp', programaCpp(catalogo.exercises));
}

// Permite validar o executável antes de anunciar a linguagem como implementada.
if (catalogo.languages.some(item => item.id === 'go')) {
  await salvar('src/go/cmd/exemplos/main.go', programaGo(catalogo.exercises));
}

if (disponiveis.some(item => item.id === 'swift')) {
  const blocos = catalogo.exercises.map(item => `case "${item.id}":\n${exemplosSwift[item.id].split('\n').map(linha => '    ' + linha).join('\n')}`).join('\n');
  await salvar('src/swift/_examples/main.swift', '// Gerado por npm run docs. Consulte os READMEs dos desafios.\nimport LiveCoding\n\nguard let desafio = CommandLine.arguments.dropFirst().first else {\n    fatalError("Informe o ID do desafio, como soma_de_dois.")\n}\nswitch desafio {\n' + blocos + '\ndefault:\n    fatalError("Desafio desconhecido: " + desafio)\n}\n');
}

await salvar('docs/tests/README.md', aviso + '# Desafios de live coding\n\nCada página explica o problema, a ideia, o contrato, os casos de borda e o que o exercício avalia.\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id}.md) — ${exercicio.problemName}`).join('\n') + '\n');
await salvar('docs/wiki/Home.md', aviso + '# Testes de live coding\n\nEstude o problema, tente resolvê-lo e depois compare a implementação e os testes. Cada página explica por que o desafio aparece em entrevistas e quais capacidades ele avalia.\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id}) — ${exercicio.problemName}`).join('\n') + `\n\nImplementações disponíveis na base: **${listaNomes(disponiveis)}**.\n\n[Implementações por linguagem](https://marcosrocha85.github.io/testes-live-coding/) · [Arquitetura](${baseGitHub}/blob/main/docs/arquitetura.md) · [Roteiro](${baseGitHub}/blob/main/docs/roadmap.md) · [Sugerir novo desafio](${baseGitHub}/issues/new/choose)\n`);
await salvar('docs/wiki/_Sidebar.md', aviso + '[Início](Home)\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id})`).join('\n') + '\n');

let issues = [];
try { issues = JSON.parse(await readFile(resolve(root, 'docs/roadmap-issues.json'), 'utf8')); }
catch (erro) { if (erro.code !== 'ENOENT') throw erro; }
const estadoRoteiro = disponiveis.length === catalogo.languages.length ? 'Todas as etapas do roteiro têm implementações disponíveis.' : 'As outras linguagens estão planejadas.';
let roteiro = aviso + `# Roteiro de implementação\n\nTrabalhamos uma linguagem por vez, nesta ordem: ${listaNomes(catalogo.languages)}. Cada etapa tem uma issue principal e dez sub-issues reais. Implementações disponíveis na base: **${listaNomes(disponiveis)}**. ${estadoRoteiro}\n\nAs issues são encerradas na integração da PR correspondente. Uma linguagem precisa de seus dez desafios, testes, explicações, CI e revisão de Marcos Rocha. O site recebe as implementações após a integração na main.\n\nNovos desafios são registrados pelo [template de issue](${baseGitHub}/issues/new/choose). Eles recebem contrato e casos antes da implementação.\n`;
for (const linguagem of catalogo.languages) {
  const etapa = issues.find((issue) => issue.language === linguagem.id);
  roteiro += `\n## ${linguagem.name}\n\nEstado da implementação: ${linguagem.status === 'implemented' ? 'disponível na base' : 'planejada'}.\n\n`;
  roteiro += etapa ? `[Issue principal #${etapa.number}](${etapa.url})\n\n` : 'Issues ainda não registradas.\n\n';
  roteiro += catalogo.exercises.map((exercicio) => {
    const issue = etapa?.exercises.find((item) => item.exercise === exercicio.id);
    return issue ? `- [#${issue.number} — ${exercicio.name}](${issue.url})` : `- ${exercicio.name}`;
  }).join('\n') + '\n';
}
await salvar('docs/roadmap.md', roteiro);

if (desatualizados) process.exitCode = 1;
else console.log(process.argv.includes('--check') ? 'Documentação gerada está atualizada.' : 'Documentação e fontes da Wiki atualizadas.');
