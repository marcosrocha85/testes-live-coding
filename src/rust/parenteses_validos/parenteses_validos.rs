pub fn parenteses_validos(texto: &str) -> bool {
    let mut pilha = Vec::new();
    for ponto in texto.chars() {
        match ponto {
            '(' | '[' | '{' => pilha.push(ponto),
            ')' | ']' | '}' => {
                let abertura = match ponto {
                    ')' => '(',
                    ']' => '[',
                    _ => '{',
                };
                if pilha.pop() != Some(abertura) {
                    return false;
                }
            }
            _ => return false,
        }
    }
    pilha.is_empty()
}

#[cfg(test)]
#[path = "parenteses_validos_test.rs"]
mod testes;
