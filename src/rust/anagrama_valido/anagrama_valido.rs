use std::collections::HashMap;

pub fn anagrama_valido(primeiro: &str, segundo: &str) -> bool {
    let mut frequencias = HashMap::<char, i64>::new();
    // chars lê pontos Unicode, sem normalizar nem contar bytes.
    for ponto in primeiro.chars() {
        *frequencias.entry(ponto).or_insert(0) += 1;
    }
    for ponto in segundo.chars() {
        let Some(contagem) = frequencias.get_mut(&ponto) else {
            return false;
        };
        *contagem -= 1;
        if *contagem == 0 {
            frequencias.remove(&ponto);
        }
    }
    frequencias.is_empty()
}

#[cfg(test)]
#[path = "anagrama_valido_test.rs"]
mod testes;
