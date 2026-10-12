use super::tem_ciclo;
use crate::lista::Ligacao;
use crate::testutil::*;
use std::collections::HashSet;
use std::rc::Rc;

fn referencia(cabeca: Ligacao) -> bool {
    let mut visitados = HashSet::new();
    let mut atual = cabeca;
    while let Some(no) = atual {
        if !visitados.insert(Rc::as_ptr(&no)) {
            return true;
        }
        atual = no.borrow().proximo.clone();
    }
    false
}

fn conferir(valores: &[i64], indice: isize) {
    let lista = Lista::nova(valores, indice);
    let anteriores = lista.ligacoes();
    let esperado = referencia(lista.cabeca());
    for _ in 0..3 {
        assert_eq!(tem_ciclo(&lista.cabeca()), esperado);
    }
    for ((no, anterior), &valor) in lista.nos.iter().zip(&anteriores).zip(valores) {
        assert!(mesma_ligacao(anterior, &no.borrow().proximo));
        assert_eq!(no.borrow().valor, valor);
    }
}

#[test]
fn compartilhados_sem_mutacao() {
    for caso in casos("ciclo_em_lista_ligada") {
        let valores = numeros(&caso["input"]["valores"]);
        let indice = inteiro(&caso["input"]["indiceCiclo"]) as isize;
        let lista = Lista::nova(&valores, indice);
        assert_eq!(
            tem_ciclo(&lista.cabeca()),
            booleano(&caso["expected"]),
            "{caso}"
        );
        conferir(&valores, indice);
    }
}

#[test]
fn referencia_identidade_e_todas_as_entradas_de_ciclo() {
    for tamanho in 0..=20 {
        for indice in -1..tamanho as isize {
            conferir(&vec![1; tamanho], indice);
        }
    }
    for indice in [-1, 0, 1, 5000, 9999] {
        conferir(&vec![7; 10_000], indice);
    }
}

#[test]
fn fixture_libera_ciclos_de_referencias_fortes() {
    for indice in [-1, 0, 1, 2] {
        let fracas = {
            let lista = Lista::nova(&[1, 1, 1], indice);
            assert_eq!(tem_ciclo(&lista.cabeca()), indice >= 0);
            lista.nos.iter().map(Rc::downgrade).collect::<Vec<_>>()
        };
        assert!(fracas.iter().all(|no| no.upgrade().is_none()));
    }
}
