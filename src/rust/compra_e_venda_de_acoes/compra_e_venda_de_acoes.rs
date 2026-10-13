pub fn maior_lucro(precos: &[i64]) -> i64 {
    let Some(&primeiro) = precos.first() else {
        return 0;
    };
    let (mut menor, mut lucro) = (primeiro, 0);
    for &preco in &precos[1..] {
        // A venda usa somente preços de dias anteriores.
        lucro = lucro.max(preco - menor);
        menor = menor.min(preco);
    }
    lucro
}

#[cfg(test)]
#[path = "compra_e_venda_de_acoes_test.rs"]
mod testes;
