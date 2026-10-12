use crate::lista::Ligacao;

pub fn inverter_lista_ligada(mut atual: Ligacao) -> Ligacao {
    let mut anterior = None;
    while let Some(no) = atual {
        // take guarda a ligação antiga e deixa None em seu lugar.
        let seguinte = no.borrow_mut().proximo.take();
        no.borrow_mut().proximo = anterior;
        anterior = Some(no);
        atual = seguinte;
    }
    anterior
}

#[cfg(test)]
#[path = "inverter_lista_ligada_test.rs"]
mod testes;
