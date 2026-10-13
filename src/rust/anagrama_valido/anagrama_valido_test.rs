use super::anagrama_valido;
use crate::testutil::*;

fn referencia(a: &str, b: &str) -> bool {
    let mut a: Vec<_> = a.chars().collect();
    let mut b: Vec<_> = b.chars().collect();
    a.sort();
    b.sort();
    a == b
}

#[test]
fn compartilhados() {
    for caso in casos("anagrama_valido") {
        assert_eq!(
            anagrama_valido(
                texto(&caso["input"]["primeiro"]),
                texto(&caso["input"]["segundo"])
            ),
            booleano(&caso["expected"]),
            "{caso}"
        );
    }
}

#[test]
fn referencia_unicode_e_contagens() {
    let alfabeto = ['a', 'A', 'é', '\u{301}', '😀', ' ', '\0', '界', '𝄞'];
    let mut sorteio = Aleatorio::novo();
    for tamanho in 0..100 {
        for _ in 0..20 {
            let a: String = (0..tamanho)
                .map(|_| alfabeto[sorteio.numero(9) as usize])
                .collect();
            let b: String = (0..tamanho)
                .map(|_| alfabeto[sorteio.numero(9) as usize])
                .collect();
            assert_eq!(anagrama_valido(&a, &b), referencia(&a, &b));
            let reversa: String = a.chars().rev().collect();
            assert!(anagrama_valido(&a, &reversa));
        }
    }
    // Estes pares têm os mesmos bytes contados, mas pontos Unicode diferentes.
    assert!(!anagrama_valido("é¨", "è©"));
    assert!(!anagrama_valido("é", "e\u{301}"));
    assert!(anagrama_valido(&"😀".repeat(10_000), &"😀".repeat(10_000)));
    assert!(!anagrama_valido(&"😀".repeat(10_000), &"😀".repeat(9_999)));
}

#[test]
fn todos_os_valores_escalares_unicode() {
    let texto: String = (0..=0x10ffff).filter_map(char::from_u32).collect();
    let reversa: String = texto.chars().rev().collect();
    assert!(anagrama_valido(&texto, &reversa));
}
