use crate::lista::{Ligacao, No};
use std::rc::Rc;

pub fn mesclar_listas_ordenadas(mut primeira: Ligacao, mut segunda: Ligacao) -> Ligacao {
    let sentinela = No::novo(0);
    let mut cauda = Rc::clone(&sentinela);
    while let (Some(a), Some(b)) = (primeira.clone(), segunda.clone()) {
        // <= preserva os nós da primeira lista antes dos da segunda em empate.
        let escolhido = if a.borrow().valor <= b.borrow().valor {
            primeira = a.borrow_mut().proximo.take();
            a
        } else {
            segunda = b.borrow_mut().proximo.take();
            b
        };
        cauda.borrow_mut().proximo = Some(Rc::clone(&escolhido));
        cauda = escolhido;
    }
    cauda.borrow_mut().proximo = primeira.or(segunda);
    sentinela.borrow_mut().proximo.take()
}

#[cfg(test)]
#[path = "mesclar_listas_ordenadas_test.rs"]
mod testes;
