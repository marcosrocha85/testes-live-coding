use std::collections::HashMap;

pub fn soma_de_dois(numeros: &[i64], alvo: i64) -> Option<[usize; 2]> {
    let mut vistos = HashMap::new();
    for (indice, &valor) in numeros.iter().enumerate() {
        if let Some(&anterior) = vistos.get(&(alvo - valor)) {
            return Some([anterior, indice]);
        }
        // Conserva a primeira ocorrência para resolver empates.
        vistos.entry(valor).or_insert(indice);
    }
    None
}

#[cfg(test)]
#[path = "soma_de_dois_test.rs"]
mod testes;
