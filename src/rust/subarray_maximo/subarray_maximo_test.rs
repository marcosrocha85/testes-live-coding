use super::subarray_maximo;
use crate::testutil::*;

fn referencia(valores: &[i64]) -> Option<i64> {
    let mut somas = Vec::new();
    for inicio in 0..valores.len() {
        for fim in inicio + 1..=valores.len() {
            somas.push(valores[inicio..fim].iter().sum());
        }
    }
    somas.into_iter().max()
}

#[test]
fn compartilhados() {
    for caso in casos("subarray_maximo") {
        assert_eq!(
            subarray_maximo(&numeros(&caso["input"]["numeros"])),
            caso["expected"].as_i64(),
            "{caso}"
        );
    }
}

#[test]
fn referencia_todos_os_trechos_e_precisao() {
    let mut sorteio = Aleatorio::novo();
    for tamanho in 0..35 {
        for _ in 0..30 {
            let valores = sorteio.lista(tamanho);
            let copia = valores.clone();
            assert_eq!(subarray_maximo(&valores), referencia(&valores));
            assert_eq!(valores, copia);
        }
    }
    assert_eq!(
        subarray_maximo(&vec![1_000_000; 10_000]),
        Some(10_000_000_000)
    );
    assert_eq!(subarray_maximo(&vec![-1_000_000; 10_000]), Some(-1_000_000));
    assert_eq!(subarray_maximo(&[0]), Some(0));
    assert_eq!(subarray_maximo(&[]), None);
}
