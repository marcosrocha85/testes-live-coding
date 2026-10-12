use crate::lista::Ligacao;
use std::rc::Rc;

fn proximo(no: &Ligacao) -> Ligacao {
    no.as_ref().and_then(|no| no.borrow().proximo.clone())
}

pub fn tem_ciclo(cabeca: &Ligacao) -> bool {
    let (mut lento, mut rapido) = (cabeca.clone(), cabeca.clone());
    loop {
        rapido = proximo(&proximo(&rapido));
        if rapido.is_none() {
            return false;
        }
        lento = proximo(&lento);
        if let (Some(a), Some(b)) = (&lento, &rapido) {
            // Compara os próprios nós; nenhuma ligação é escrita.
            if Rc::ptr_eq(a, b) {
                return true;
            }
        }
    }
}

#[cfg(test)]
#[path = "ciclo_em_lista_ligada_test.rs"]
mod testes;
