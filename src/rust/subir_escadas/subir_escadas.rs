#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct DegrausInvalidos;

impl std::fmt::Display for DegrausInvalidos {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_str("degraus deve ser um inteiro de 0 a 77")
    }
}

impl std::error::Error for DegrausInvalidos {}

pub fn subir_escadas(degraus: f64) -> Result<i64, DegrausInvalidos> {
    if !degraus.is_finite() || !(0.0..=77.0).contains(&degraus) || degraus.fract() != 0.0 {
        return Err(DegrausInvalidos);
    }
    // Só a entrada usa float; as contagens são inteiros exatos.
    let (mut anterior, mut atual) = (1_i64, 1_i64);
    for _ in 1..degraus as usize {
        (anterior, atual) = (atual, anterior + atual);
    }
    Ok(atual)
}

#[cfg(test)]
#[path = "subir_escadas_test.rs"]
mod testes;
