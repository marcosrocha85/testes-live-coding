pub fn subarray_maximo(numeros: &[i64]) -> Option<i64> {
    let &primeiro = numeros.first()?;
    let (mut atual, mut melhor) = (primeiro, primeiro);
    for &valor in &numeros[1..] {
        // Começar no primeiro valor preserva respostas inteiramente negativas.
        atual = valor.max(atual + valor);
        melhor = melhor.max(atual);
    }
    Some(melhor)
}

#[cfg(test)]
#[path = "subarray_maximo_test.rs"]
mod testes;
