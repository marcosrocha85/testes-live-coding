use super::parenteses_validos;
use crate::testutil::*;

fn referencia(texto: &str) -> bool {
    let mut restante = texto.to_string();
    loop {
        let novo = restante
            .replace("()", "")
            .replace("[]", "")
            .replace("{}", "");
        if novo == restante {
            return novo.is_empty();
        }
        restante = novo;
    }
}

#[test]
fn compartilhados() {
    for caso in casos("parenteses_validos") {
        assert_eq!(
            parenteses_validos(texto(&caso["input"]["texto"])),
            booleano(&caso["expected"]),
            "{caso}"
        );
    }
}

#[test]
fn referencia_exaustiva_e_pilha_longa() {
    let alfabeto = ['(', ')', '[', ']', '{', '}', 'a', '😀'];
    for tamanho in 0..=5 {
        for mut codigo in 0..8_usize.pow(tamanho) {
            let mut texto = String::new();
            for _ in 0..tamanho {
                texto.push(alfabeto[codigo % 8]);
                codigo /= 8;
            }
            assert_eq!(parenteses_validos(&texto), referencia(&texto), "{texto}");
        }
    }
    let longa = format!("{}{}", "(".repeat(5000), ")".repeat(5000));
    assert!(parenteses_validos(&longa));
    assert!(!parenteses_validos(&format!("{longa}(")));
    for texto in ["\0", "é", "（）」", "() ", "\n"] {
        assert!(!parenteses_validos(texto));
    }
}
