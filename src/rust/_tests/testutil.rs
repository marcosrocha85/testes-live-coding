use crate::lista::{Ligacao, No};
use serde_json::Value;
use std::cell::RefCell;
use std::rc::Rc;

pub fn casos(id: &str) -> Vec<Value> {
    let caminho = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("../../docs/casos")
        .join(format!("{id}.json"));
    let texto = std::fs::read_to_string(caminho).expect("casos compartilhados");
    serde_json::from_str(&texto).expect("JSON válido")
}

pub fn numeros(valor: &Value) -> Vec<i64> {
    valor
        .as_array()
        .unwrap()
        .iter()
        .map(|v| v.as_i64().unwrap())
        .collect()
}

pub fn texto(valor: &Value) -> &str {
    valor.as_str().unwrap()
}

pub fn booleano(valor: &Value) -> bool {
    valor.as_bool().unwrap()
}

pub fn inteiro(valor: &Value) -> i64 {
    valor.as_i64().unwrap()
}

// Cada fixture mantém os donos vivos enquanto verificamos identidade e mutação.
pub struct Lista {
    pub nos: Vec<Rc<RefCell<No>>>,
}

impl Lista {
    pub fn nova(valores: &[i64], indice_ciclo: isize) -> Self {
        let nos: Vec<_> = valores.iter().map(|&valor| No::novo(valor)).collect();
        for par in nos.windows(2) {
            par[0].borrow_mut().proximo = Some(Rc::clone(&par[1]));
        }
        if indice_ciclo >= 0 {
            nos.last().unwrap().borrow_mut().proximo = Some(Rc::clone(&nos[indice_ciclo as usize]));
        }
        Self { nos }
    }

    pub fn cabeca(&self) -> Ligacao {
        self.nos.first().cloned()
    }

    pub fn ligacoes(&self) -> Vec<Ligacao> {
        self.nos
            .iter()
            .map(|no| no.borrow().proximo.clone())
            .collect()
    }
}

impl Drop for Lista {
    fn drop(&mut self) {
        // Rc não coleta ciclos: todos os nós permanecem vivos até desfazer as ligações.
        for no in &self.nos {
            no.borrow_mut().proximo.take();
        }
    }
}

pub fn mesma_ligacao(a: &Ligacao, b: &Ligacao) -> bool {
    match (a, b) {
        (Some(a), Some(b)) => Rc::ptr_eq(a, b),
        (None, None) => true,
        _ => false,
    }
}

pub fn conferir_cadeia(cabeca: Ligacao, esperados: &[Rc<RefCell<No>>]) {
    let mut atual = cabeca;
    for no in esperados {
        assert!(mesma_ligacao(&atual, &Some(Rc::clone(no))));
        atual = atual.unwrap().borrow().proximo.clone();
    }
    assert!(atual.is_none(), "não deve sobrar nó nem ciclo");
}

pub struct Aleatorio(u64);

impl Aleatorio {
    pub fn novo() -> Self {
        Self(0x1234_5678_9abc_def0)
    }

    pub fn numero(&mut self, limite: u64) -> i64 {
        // Semente fixa torna os testes repetíveis; não calcula respostas.
        self.0 = self.0.wrapping_mul(6364136223846793005).wrapping_add(1);
        ((self.0 >> 32) % limite) as i64
    }

    pub fn lista(&mut self, tamanho: usize) -> Vec<i64> {
        (0..tamanho).map(|_| self.numero(21) - 10).collect()
    }
}
