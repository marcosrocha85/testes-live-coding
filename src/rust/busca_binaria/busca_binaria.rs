pub fn busca_binaria(numeros: &[i64], alvo: i64) -> isize {
    // O intervalo exclui direita; assim, vazio não causa subtração em usize.
    let (mut esquerda, mut direita) = (0, numeros.len());
    while esquerda < direita {
        let meio = esquerda + (direita - esquerda) / 2;
        match numeros[meio].cmp(&alvo) {
            std::cmp::Ordering::Equal => return meio as isize,
            std::cmp::Ordering::Less => esquerda = meio + 1,
            std::cmp::Ordering::Greater => direita = meio,
        }
    }
    -1
}

#[cfg(test)]
#[path = "busca_binaria_test.rs"]
mod testes;
