use super::busca_binaria;
use crate::testutil::*;

fn conferir(valores: &[i64], alvo: i64) {
    let esperado: Vec<_> = valores
        .iter()
        .enumerate()
        .filter(|(_, v)| **v == alvo)
        .map(|(i, _)| i as isize)
        .collect();
    let obtido = busca_binaria(valores, alvo);
    if esperado.is_empty() {
        assert_eq!(obtido, -1);
    } else {
        assert!(esperado.contains(&obtido));
    }
}

#[test]
fn compartilhados() {
    for caso in casos("busca_binaria") {
        let valores = numeros(&caso["input"]["numeros"]);
        let obtido = busca_binaria(&valores, inteiro(&caso["input"]["alvo"]));
        if let Some(indices) = caso["expectedIndices"].as_array() {
            assert!(indices.iter().any(|i| i.as_i64() == Some(obtido as i64)));
        } else {
            assert_eq!(obtido as i64, inteiro(&caso["expected"]), "{caso}");
        }
    }
}

#[test]
fn referencia_linear_duplicatas_e_lista_longa() {
    let mut sorteio = Aleatorio::novo();
    for tamanho in 0..100 {
        let mut valores = sorteio.lista(tamanho);
        valores.sort();
        let copia = valores.clone();
        for alvo in -12..=12 {
            conferir(&valores, alvo);
        }
        assert_eq!(valores, copia);
    }
    let longa = vec![1_000_000; 10_000];
    conferir(&longa, 1_000_000);
    conferir(&longa, -1_000_000);
    conferir(&[-5_000_000_000, 0, 5_000_000_000], 5_000_000_000);
}
