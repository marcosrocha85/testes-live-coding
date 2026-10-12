use super::maior_lucro;
use crate::testutil::*;

fn referencia(precos: &[i64]) -> i64 {
    let mut lucros = vec![0];
    for compra in 0..precos.len() {
        for venda in compra + 1..precos.len() {
            lucros.push(precos[venda] - precos[compra]);
        }
    }
    *lucros.iter().max().unwrap()
}

#[test]
fn compartilhados() {
    for caso in casos("compra_e_venda_de_acoes") {
        assert_eq!(
            maior_lucro(&numeros(&caso["input"]["precos"])),
            inteiro(&caso["expected"]),
            "{caso}"
        );
    }
}

#[test]
fn referencia_cronologia_e_inteiros() {
    let mut sorteio = Aleatorio::novo();
    for tamanho in 0..40 {
        for _ in 0..30 {
            let valores: Vec<_> = sorteio.lista(tamanho).iter().map(|v| v + 10).collect();
            let copia = valores.clone();
            assert_eq!(maior_lucro(&valores), referencia(&valores));
            assert_eq!(valores, copia);
        }
    }
    assert_eq!(maior_lucro(&vec![7; 10_000]), 0);
    let mut longa = vec![1_000_000; 10_000];
    longa[0] = 0;
    assert_eq!(maior_lucro(&longa), 1_000_000);
    assert_eq!(maior_lucro(&[0, 5_000_000_000]), 5_000_000_000);
}
