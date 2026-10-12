import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

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
    if (linguagem.id === 'java') {
      const windows = comando.replace('./src/java/mvnw', '.\\src\\java\\mvnw.cmd').replace(/-Dtest=([^ ]+)/, '"-Dtest=$1"');
      return `### Java\n\nDa raiz, com JDK 21 ou superior. Linux/macOS:\n\n\`\`\`sh\n${comando}\n\`\`\`\n\nPowerShell:\n\n\`\`\`powershell\n${windows}\n\`\`\`\n` + docker;
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
    await salvar(`src/${linguagem.id}/${exercicio.id}/README.md`, aviso + corpo + notas);
  }
}

await salvar('docs/tests/README.md', aviso + '# Desafios de live coding\n\nCada página explica o problema, a ideia, o contrato, os casos de borda e o que o exercício avalia.\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id}.md) — ${exercicio.problemName}`).join('\n') + '\n');
await salvar('docs/wiki/Home.md', aviso + '# Testes de live coding\n\nEstude o problema, tente resolvê-lo e depois compare a implementação e os testes. Cada página explica por que o desafio aparece em entrevistas e quais capacidades ele avalia.\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id}) — ${exercicio.problemName}`).join('\n') + `\n\nImplementações disponíveis na base: **${listaNomes(disponiveis)}**.\n\n[Implementações por linguagem](https://marcosrocha85.github.io/testes-live-coding/) · [Arquitetura](${baseGitHub}/blob/main/docs/arquitetura.md) · [Roteiro](${baseGitHub}/blob/main/docs/roadmap.md) · [Sugerir novo desafio](${baseGitHub}/issues/new/choose)\n`);
await salvar('docs/wiki/_Sidebar.md', aviso + '[Início](Home)\n\n' + catalogo.exercises.map((exercicio) => `- [${exercicio.name}](${exercicio.id})`).join('\n') + '\n');

let issues = [];
try { issues = JSON.parse(await readFile(resolve(root, 'docs/roadmap-issues.json'), 'utf8')); }
catch (erro) { if (erro.code !== 'ENOENT') throw erro; }
let roteiro = aviso + `# Roteiro de implementação\n\nTrabalhamos uma linguagem por vez, nesta ordem: ${listaNomes(catalogo.languages)}. Cada etapa tem uma issue principal e dez sub-issues reais. Implementações disponíveis na base: **${listaNomes(disponiveis)}**. As outras linguagens estão planejadas.\n\nAs issues são encerradas na integração da PR correspondente. Uma linguagem precisa de seus dez desafios, testes, explicações, CI e revisão de Marcos Rocha. O site recebe as implementações após a integração na main.\n\nNovos desafios são registrados pelo [template de issue](${baseGitHub}/issues/new/choose). Eles recebem contrato e casos antes da implementação.\n`;
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
