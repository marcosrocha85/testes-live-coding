#[path = "_shared/no.rs"]
pub mod lista;

#[path = "soma_de_dois/soma_de_dois.rs"]
pub mod soma_de_dois;

#[path = "parenteses_validos/parenteses_validos.rs"]
pub mod parenteses_validos;

#[path = "inverter_lista_ligada/inverter_lista_ligada.rs"]
pub mod inverter_lista_ligada;

#[path = "busca_binaria/busca_binaria.rs"]
pub mod busca_binaria;

#[path = "mesclar_listas_ordenadas/mesclar_listas_ordenadas.rs"]
pub mod mesclar_listas_ordenadas;

#[path = "compra_e_venda_de_acoes/compra_e_venda_de_acoes.rs"]
pub mod compra_e_venda_de_acoes;

#[path = "subarray_maximo/subarray_maximo.rs"]
pub mod subarray_maximo;

#[path = "subir_escadas/subir_escadas.rs"]
pub mod subir_escadas;

#[path = "anagrama_valido/anagrama_valido.rs"]
pub mod anagrama_valido;

#[path = "ciclo_em_lista_ligada/ciclo_em_lista_ligada.rs"]
pub mod ciclo_em_lista_ligada;

#[cfg(test)]
#[path = "_tests/testutil.rs"]
pub(crate) mod testutil;
