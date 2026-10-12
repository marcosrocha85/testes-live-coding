use std::cell::RefCell;
use std::rc::Rc;

pub type Ligacao = Option<Rc<RefCell<No>>>;

pub struct No {
    pub valor: i64,
    pub proximo: Ligacao,
}

impl No {
    pub fn novo(valor: i64) -> Rc<RefCell<Self>> {
        Rc::new(RefCell::new(Self {
            valor,
            proximo: None,
        }))
    }
}

impl Drop for No {
    fn drop(&mut self) {
        // Libera uma cadeia exclusiva sem empilhar milhares de destrutores.
        let mut seguinte = self.proximo.take();
        while let Some(no) = seguinte {
            match Rc::try_unwrap(no) {
                Ok(celula) => {
                    let mut exclusivo = celula.into_inner();
                    seguinte = exclusivo.proximo.take();
                }
                // Outro dono mantém este nó e suas ligações.
                Err(_) => break,
            }
        }
    }
}
