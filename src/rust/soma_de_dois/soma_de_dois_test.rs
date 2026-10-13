use super::soma_de_dois;
use crate::testutil::*;

fn referencia(numeros: &[i64], alvo: i64) -> Option<[usize; 2]> {
    for j in 0..numeros.len() {
        for i in 0..j {
            if numeros[i] + numeros[j] == alvo {
                return Some([i, j]);
            }
        }
    }
    None
}

#[test]
fn compartilhados() {
    for caso in casos("soma_de_dois") {
        let entrada = &caso["input"];
        let valores = numeros(&entrada["numeros"]);
        let esperado = caso["expected"].as_array().map(|v| {
            [
                v[0].as_u64().unwrap() as usize,
                v[1].as_u64().unwrap() as usize,
            ]
        });
        assert_eq!(
            soma_de_dois(&valores, inteiro(&entrada["alvo"])),
            esperado,
            "{caso}"
        );
    }
}

#[test]
fn referencia_empates_e_limites() {
    let mut sorteio = Aleatorio::novo();
    for tamanho in 0..40 {
        for _ in 0..30 {
            let valores = sorteio.lista(tamanho);
            for alvo in -21..=21 {
                assert_eq!(soma_de_dois(&valores, alvo), referencia(&valores, alvo));
            }
        }
    }
    let mut longa = vec![1_000_000; 10_000];
    assert_eq!(soma_de_dois(&longa, -1_000_000), None);
    longa[9999] = -1_000_000;
    assert_eq!(soma_de_dois(&longa, 0), Some([0, 9999]));
    assert_eq!(
        soma_de_dois(&[5_000_000_000, -5_000_000_000], 0),
        Some([0, 1])
    );
}
