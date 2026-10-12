use super::mesclar_listas_ordenadas;
use crate::testutil::*;

fn conferir(a: &[i64], b: &[i64]) -> Vec<i64> {
    let primeira = Lista::nova(a, -1);
    let segunda = Lista::nova(b, -1);
    // Ordenação estável da concatenação fornece a referência de identidade.
    let mut esperados: Vec<_> = primeira.nos.iter().chain(&segunda.nos).cloned().collect();
    esperados.sort_by_key(|no| no.borrow().valor);
    let valores: Vec<_> = esperados.iter().map(|no| no.borrow().valor).collect();
    let resultado = mesclar_listas_ordenadas(primeira.cabeca(), segunda.cabeca());
    conferir_cadeia(resultado, &esperados);
    for (no, &valor) in primeira.nos.iter().zip(a).chain(segunda.nos.iter().zip(b)) {
        assert_eq!(no.borrow().valor, valor);
    }
    valores
}

#[test]
fn compartilhados_reutilizacao_e_estabilidade() {
    for caso in casos("mesclar_listas_ordenadas") {
        assert_eq!(
            conferir(
                &numeros(&caso["input"]["primeira"]),
                &numeros(&caso["input"]["segunda"])
            ),
            numeros(&caso["expected"])
        );
    }
}

#[test]
fn referencia_ordenada_duplicatas_e_listas_longas() {
    let mut sorteio = Aleatorio::novo();
    for tamanho in 0..100 {
        let mut a = sorteio.lista(tamanho);
        let mut b = sorteio.lista(100 - tamanho);
        a.sort();
        b.sort();
        conferir(&a, &b);
    }
    conferir(&vec![7; 5000], &vec![7; 5000]);
    conferir(&[], &vec![1; 10_000]);
    let a: Vec<_> = (0..5000).map(|i| 2 * i).collect();
    let b: Vec<_> = (0..5000).map(|i| 2 * i + 1).collect();
    conferir(&a, &b);
}
