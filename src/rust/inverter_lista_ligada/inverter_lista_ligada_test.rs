use super::inverter_lista_ligada;
use crate::lista::No;
use crate::testutil::*;
use std::rc::Rc;

fn conferir(valores: &[i64]) {
    let lista = Lista::nova(valores, -1);
    let antigas = lista.ligacoes();
    let invertida = inverter_lista_ligada(lista.cabeca());
    let esperados: Vec<_> = lista.nos.iter().rev().cloned().collect();
    conferir_cadeia(invertida.clone(), &esperados);
    for (no, &valor) in lista.nos.iter().zip(valores) {
        assert_eq!(no.borrow().valor, valor);
    }
    let restaurada = inverter_lista_ligada(invertida);
    conferir_cadeia(restaurada, &lista.nos);
    for (antiga, atual) in antigas.iter().zip(lista.ligacoes()) {
        assert!(mesma_ligacao(antiga, &atual));
    }
}

#[test]
fn compartilhados_e_identidade() {
    for caso in casos("inverter_lista_ligada") {
        let valores = numeros(&caso["input"]["valores"]);
        let lista = Lista::nova(&valores, -1);
        let resultado = inverter_lista_ligada(lista.cabeca());
        let esperados: Vec<_> = lista.nos.iter().rev().cloned().collect();
        conferir_cadeia(resultado, &esperados);
        assert_eq!(
            esperados
                .iter()
                .map(|no| no.borrow().valor)
                .collect::<Vec<_>>(),
            numeros(&caso["expected"])
        );
        conferir(&valores);
    }
}

#[test]
fn duplicatas_e_cadeias_longas() {
    let mut sorteio = Aleatorio::novo();
    for tamanho in 0..100 {
        conferir(&sorteio.lista(tamanho));
    }
    conferir(&vec![1; 10_000]);
}

#[test]
fn liberar_cadeia_exclusiva_sem_recursao() {
    std::thread::Builder::new()
        .stack_size(64 * 1024)
        .spawn(|| {
            let mut cabeca = None;
            for valor in 0..10_000 {
                let no = No::novo(valor);
                no.borrow_mut().proximo = cabeca;
                cabeca = Some(no);
            }
            let fraca = Rc::downgrade(cabeca.as_ref().unwrap());
            let ultima = {
                let mut atual = cabeca.clone();
                for _ in 1..10_000 {
                    atual = atual.unwrap().borrow().proximo.clone();
                }
                Rc::downgrade(atual.as_ref().unwrap())
            };
            drop(cabeca);
            assert!(fraca.upgrade().is_none() && ultima.upgrade().is_none());
        })
        .unwrap()
        .join()
        .unwrap();
}

#[test]
fn outro_dono_preserva_sufixo() {
    let primeiro = No::novo(1);
    let segundo = No::novo(2);
    let terceiro = No::novo(3);
    primeiro.borrow_mut().proximo = Some(Rc::clone(&segundo));
    segundo.borrow_mut().proximo = Some(Rc::clone(&terceiro));
    let fraca = Rc::downgrade(&primeiro);
    drop(primeiro);
    assert!(fraca.upgrade().is_none());
    assert!(Rc::ptr_eq(
        segundo.borrow().proximo.as_ref().unwrap(),
        &terceiro
    ));
}
