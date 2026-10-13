use super::{DegrausInvalidos, subir_escadas};
use crate::testutil::*;

fn referencia(n: u128) -> i64 {
    // Conta posições dos passos duplos por combinações, sem a recorrência da solução.
    let mut total = 0;
    for duplos in 0..=n / 2 {
        let posicoes = n - duplos;
        let mut combinacao = 1;
        for k in 1..=duplos {
            combinacao = combinacao * (posicoes - k + 1) / k;
        }
        total += combinacao;
    }
    i64::try_from(total).unwrap()
}

#[test]
fn compartilhados() {
    for caso in casos("subir_escadas") {
        let obtido = subir_escadas(caso["input"]["degraus"].as_f64().unwrap());
        if caso["error"].is_string() {
            assert_eq!(obtido, Err(DegrausInvalidos), "{caso}");
        } else {
            assert_eq!(obtido, Ok(inteiro(&caso["expected"])), "{caso}");
        }
    }
}

#[test]
fn dominio_completo_resultado_exato_e_erro() {
    for n in 0..=77 {
        assert_eq!(subir_escadas(n as f64), Ok(referencia(n)));
    }
    assert_eq!(subir_escadas(77.0), Ok(8_944_394_323_791_464));
    assert_eq!(subir_escadas(-0.0), Ok(1));
    for invalido in [
        f64::NAN,
        f64::INFINITY,
        f64::NEG_INFINITY,
        -1.0,
        78.0,
        1.5,
        77.5,
        f64::MAX,
    ] {
        assert_eq!(subir_escadas(invalido), Err(DegrausInvalidos));
    }
    let erro: &dyn std::error::Error = &DegrausInvalidos;
    assert_eq!(erro.to_string(), "degraus deve ser um inteiro de 0 a 77");
}
