// Fonte única das notas e dos trechos compilados pelo executável de exemplos.
export const notasRust = {
  soma_de_dois: '`&[i64]` empresta um trecho da lista para leitura. HashMap associa cada valor ao primeiro índice. `entry(valor).or_insert(indice)` conserva essa primeira ocorrência. `Option<[usize; 2]>` retorna Some(par) ou None, equivalente ao null do contrato. Os índices usam usize; valores e complementos usam i64.',
  parenteses_validos: '`&str` é texto UTF-8 válido emprestado. `chars()` lê pontos completos, mas somente os seis símbolos ASCII são aceitos. `Vec<char>` funciona como pilha; pop retorna None quando ela está vazia. Uma string vazia retorna true; qualquer outro símbolo é inválido.',
  inverter_lista_ligada: '`Ligacao` é Option<Rc<RefCell<No>>>: None é o fim da lista. Rc mantém um nó vivo enquanto houver donos; clonar Rc conserva o mesmo nó. RefCell permite emprestar seus campos temporariamente para escrita. `take()` retira a ligação sem copiar o nó. A função recebe a cabeça por valor, muda proximo e devolve os mesmos nós em ordem inversa. O Drop de No libera cadeias exclusivas de forma iterativa.',
  busca_binaria: '`usize` representa posições e tamanhos. O intervalo [esquerda, direita) exclui direita, evitando subtrair um de zero quando a entrada está vazia. O retorno isize admite -1 como ausência; o domínio de dez mil elementos garante a conversão do índice. Duplicatas aceitam qualquer posição correspondente. O empréstimo &[i64] impede escrever nos elementos.',
  mesclar_listas_ordenadas: 'O único nó novo é a sentinela, fora da resposta. `Rc::clone` duplica uma referência, não um nó; `Rc::ptr_eq` confere identidade nos testes. Os empréstimos de RefCell terminam antes de alterar ligações. <= preserva a primeira lista em empate. As entradas precisam ser ordenadas, acíclicas e sem nós compartilhados; proximo é modificado e todos os nós originais são reutilizados.',
  compra_e_venda_de_acoes: '`first()` devolve Option: sem primeiro preço, o lucro é zero. i64 guarda preços e diferenças exatas. Calcular a venda antes de atualizar o menor preço garante que a compra ocorreu antes. A função somente lê o slice, sem copiar nem modificar seus elementos.',
  subarray_maximo: '`Option<i64>` distingue None, para a entrada vazia, de Some(0) ou Some(negativo). O operador ? devolve None se não houver primeiro elemento. Acumuladores i64 preservam a soma de dez bilhões. Começar no primeiro valor evita escolher um trecho vazio quando todos os valores são negativos.',
  subir_escadas: '`Result<i64, DegrausInvalidos>` devolve Ok(contagem) ou Err(erro), equivalente à rejeição RangeError dos casos JSON. O erro implementa Display e Error. f64 é usado somente para receber e rejeitar frações, NaN e infinitos antes da conversão. As contas usam i64, sem arredondamento. O domínio permanece 0 a 77 e zero tem uma sequência vazia.',
  anagrama_valido: '`str::chars()` produz char, um valor escalar Unicode. Strings Rust sempre contêm UTF-8 válido; len conta bytes e não serve para contar caracteres. O HashMap<char, i64> preserva pontos completos, sem normalizar, agrupar grafemas, remover espaços ou ignorar maiúsculas. Contagens zeradas são removidas e ambas vazias retornam true.',
  ciclo_em_lista_ligada: '`Rc::ptr_eq` compara os próprios nós, não os valores. Floyd usa somente borrow, sem modificar ligações. Rc não libera ciclos de referências fortes sozinho: o dono da estrutura deve desfazê-los após a consulta. Os testes e o exemplo fazem essa limpeza; ela pertence à fixture, não ao algoritmo. Não há unsafe.'
};

export const exemplosRust = {
  soma_de_dois: `let par = soma_de_dois::soma_de_dois(&[2, 7, 11, 15], 9);
assert_eq!(par, Some([0, 1]));
println!("{par:?}"); // Some([0, 1])`,
  parenteses_validos: `let resultado = parenteses_validos::parenteses_validos("{[()]}");
assert!(resultado);
println!("{resultado}"); // true`,
  inverter_lista_ligada: `let primeiro = No::novo(1);
let segundo = No::novo(2);
let terceiro = No::novo(3);
primeiro.borrow_mut().proximo = Some(Rc::clone(&segundo));
segundo.borrow_mut().proximo = Some(Rc::clone(&terceiro));
let resultado =
    inverter_lista_ligada::inverter_lista_ligada(Some(Rc::clone(&primeiro)));
assert!(Rc::ptr_eq(resultado.as_ref().unwrap(), &terceiro));
assert!(Rc::ptr_eq(
    terceiro.borrow().proximo.as_ref().unwrap(),
    &segundo
));
assert!(Rc::ptr_eq(
    segundo.borrow().proximo.as_ref().unwrap(),
    &primeiro
));
assert!(primeiro.borrow().proximo.is_none());
println!("{}", resultado.as_ref().unwrap().borrow().valor); // 3; 3 → 2 → 1 → None`,
  busca_binaria: `let indice = busca_binaria::busca_binaria(&[1, 3, 5, 7, 9], 7);
assert_eq!(indice, 3);
println!("{indice}"); // 3`,
  mesclar_listas_ordenadas: `let um = No::novo(1);
let dois = No::novo(2);
let tres = No::novo(3);
let quatro = No::novo(4);
um.borrow_mut().proximo = Some(Rc::clone(&tres));
dois.borrow_mut().proximo = Some(Rc::clone(&quatro));
let resultado = mesclar_listas_ordenadas::mesclar_listas_ordenadas(
    Some(Rc::clone(&um)),
    Some(Rc::clone(&dois)),
);
assert!(Rc::ptr_eq(resultado.as_ref().unwrap(), &um));
assert!(Rc::ptr_eq(um.borrow().proximo.as_ref().unwrap(), &dois));
assert!(Rc::ptr_eq(dois.borrow().proximo.as_ref().unwrap(), &tres));
assert!(Rc::ptr_eq(tres.borrow().proximo.as_ref().unwrap(), &quatro));
assert!(quatro.borrow().proximo.is_none());
println!("{}", resultado.as_ref().unwrap().borrow().valor); // 1; 1 → 2 → 3 → 4 → None`,
  compra_e_venda_de_acoes: `let lucro = compra_e_venda_de_acoes::maior_lucro(&[7, 1, 5, 3, 6, 4]);
assert_eq!(lucro, 5);
println!("{lucro}"); // 5`,
  subarray_maximo: `let soma = subarray_maximo::subarray_maximo(&[-2, 1, -3, 4, -1, 2, 1, -5, 4]);
assert_eq!(soma, Some(6));
println!("{soma:?}"); // Some(6)`,
  subir_escadas: `let formas = subir_escadas::subir_escadas(5.0);
assert_eq!(formas, Ok(8));
println!("{formas:?}"); // Ok(8)`,
  anagrama_valido: `let resultado = anagrama_valido::anagrama_valido("😀a😀", "😀😀a");
assert!(resultado);
println!("{resultado}"); // true`,
  ciclo_em_lista_ligada: `let primeiro = No::novo(1);
let segundo = No::novo(2);
primeiro.borrow_mut().proximo = Some(Rc::clone(&segundo));
segundo.borrow_mut().proximo = Some(Rc::clone(&primeiro));
let cabeca = Some(Rc::clone(&primeiro));
let resultado = ciclo_em_lista_ligada::tem_ciclo(&cabeca);
assert!(resultado);
assert!(Rc::ptr_eq(
    primeiro.borrow().proximo.as_ref().unwrap(),
    &segundo
));
assert!(Rc::ptr_eq(
    segundo.borrow().proximo.as_ref().unwrap(),
    &primeiro
));
// Libera o ciclo depois de verificar que Floyd não o modificou.
primeiro.borrow_mut().proximo.take();
segundo.borrow_mut().proximo.take();
println!("{resultado}"); // true`
};

export function programaRust(exercicios) {
  const blocos = exercicios.map(({ id }) => `        "${id}" => {
${exemplosRust[id].split('\n').map(linha => '            ' + linha).join('\n')}
        }`).join('\n');
  return `// Gerado por npm run docs. Consulte os READMEs dos desafios.
use live_coding_rust::lista::No;
use live_coding_rust::{
    anagrama_valido, busca_binaria, ciclo_em_lista_ligada, compra_e_venda_de_acoes,
    inverter_lista_ligada, mesclar_listas_ordenadas, parenteses_validos, soma_de_dois,
    subarray_maximo, subir_escadas,
};
use std::rc::Rc;

fn main() {
    let id = std::env::args()
        .nth(1)
        .unwrap_or_else(|| "soma_de_dois".into());
    print!("{id}: ");
    match id.as_str() {
${blocos}
        _ => {
            eprintln!("ID de desafio inválido");
            std::process::exit(2);
        }
    }
}
`;
}
