// Gerado por npm run docs. Consulte os READMEs dos desafios.
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
        "soma_de_dois" => {
            let par = soma_de_dois::soma_de_dois(&[2, 7, 11, 15], 9);
            assert_eq!(par, Some([0, 1]));
            println!("{par:?}"); // Some([0, 1])
        }
        "parenteses_validos" => {
            let resultado = parenteses_validos::parenteses_validos("{[()]}");
            assert!(resultado);
            println!("{resultado}"); // true
        }
        "inverter_lista_ligada" => {
            let primeiro = No::novo(1);
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
            println!("{}", resultado.as_ref().unwrap().borrow().valor); // 3; 3 → 2 → 1 → None
        }
        "busca_binaria" => {
            let indice = busca_binaria::busca_binaria(&[1, 3, 5, 7, 9], 7);
            assert_eq!(indice, 3);
            println!("{indice}"); // 3
        }
        "mesclar_listas_ordenadas" => {
            let um = No::novo(1);
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
            println!("{}", resultado.as_ref().unwrap().borrow().valor); // 1; 1 → 2 → 3 → 4 → None
        }
        "compra_e_venda_de_acoes" => {
            let lucro = compra_e_venda_de_acoes::maior_lucro(&[7, 1, 5, 3, 6, 4]);
            assert_eq!(lucro, 5);
            println!("{lucro}"); // 5
        }
        "subarray_maximo" => {
            let soma = subarray_maximo::subarray_maximo(&[-2, 1, -3, 4, -1, 2, 1, -5, 4]);
            assert_eq!(soma, Some(6));
            println!("{soma:?}"); // Some(6)
        }
        "subir_escadas" => {
            let formas = subir_escadas::subir_escadas(5.0);
            assert_eq!(formas, Ok(8));
            println!("{formas:?}"); // Ok(8)
        }
        "anagrama_valido" => {
            let resultado = anagrama_valido::anagrama_valido("😀a😀", "😀😀a");
            assert!(resultado);
            println!("{resultado}"); // true
        }
        "ciclo_em_lista_ligada" => {
            let primeiro = No::novo(1);
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
            println!("{resultado}"); // true
        }
        _ => {
            eprintln!("ID de desafio inválido");
            std::process::exit(2);
        }
    }
}
