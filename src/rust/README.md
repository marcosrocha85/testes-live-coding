# Desafios em Rust

Os dez desafios usam **Rust 1.92.0**, edição 2024, Cargo e biblioteca padrão nas soluções. `rust-toolchain.toml` fixa compilador, rustfmt e Clippy. Somente os testes usam `serde_json =1.0.145`; `Cargo.lock` fixa as dependências transitivas e seus checksums.

Da raiz, sem instalar Rust ou compilador no computador:

```sh
docker compose run --build --rm rust
```

O comando confere a versão, exige formatação por rustfmt, executa Clippy com avisos como erros, toda a suíte em debug e release, e compila e executa os dez exemplos com assertivas. Os testes leem os 86 casos canônicos de `docs/casos` e acrescentam referências independentes, vazios, duplicatas, listas de dez mil nós, identidade, estabilidade, mutação, precisão e Unicode.

A imagem oficial `rust:1.92.0-bookworm` está fixada pelo digest `sha256:e90e846de4124376164ddfbaab4b0774c7bdeef5e738866295e5a90a34a307a2`. Fontes e casos são copiados para a imagem. Compilação, download das dependências e testes usam `runner` (UID 10001), sem privilégios. O comando padrão roda sem rede (`CARGO_NET_OFFLINE=true`), após o fetch travado no build. Nenhum checkout é montado e não há cache persistente deste microprojeto.

Para um único desafio ou exemplo:

```sh
docker compose run --build --rm rust sh executar.sh testes busca_binaria
docker compose run --build --rm rust sh executar.sh exemplo soma_de_dois
```

O exemplo imprime `soma_de_dois: Some([0, 1])`. O gerador mantém `_examples/main.rs` a partir de `scripts/rust-docs.mjs`; não edite o programa gerado manualmente. Após alterar os trechos, execute `npm run docs`. O gerador produz Rust já formatado; a validação Docker confere isso. Os artefatos `target/` ficam no container e são descartados.

Se já tiver a toolchain 1.92.0 com rustfmt e Clippy em Linux/macOS, `sh src/rust/executar.sh check` executa a mesma suíte. Com SDK já disponível, os comandos individuais também funcionam no PowerShell:

```sh
cargo fmt --manifest-path src/rust/Cargo.toml --all -- --check
cargo clippy --manifest-path src/rust/Cargo.toml --locked --all-targets -- -D warnings
cargo test --manifest-path src/rust/Cargo.toml --locked
cargo test --manifest-path src/rust/Cargo.toml --locked --release
cargo run --manifest-path src/rust/Cargo.toml --locked --bin exemplos -- soma_de_dois
```

Fora do diretório do microprojeto, selecione explicitamente `cargo +1.92.0` se sua toolchain padrão for diferente. `npm test` não executa Rust. A CI verifica Rust diretamente no container oficial e pela matriz Compose; Pages exige sua suíte antes da publicação.

Valores, somas e contagens usam `i64`; índices usam `usize` e busca retorna `isize` para admitir -1. Ausência usa `Option`; escadas usa `Result` e mantém 0 a 77. Anagrama usa `chars()`, sem bytes nem normalização. Listas usam nós reais `Rc<RefCell<No>>`: `Rc::ptr_eq` verifica identidade. Inversão e mesclagem mudam ligações; Floyd somente lê. `Drop` libera cadeias exclusivas iterativamente; ciclos fortes precisam ser desfeitos pelo dono, como nas fixtures e no exemplo.

Veja o [guia Rust](../../docs/linguagens/rust.md), os [contratos](../../docs/contratos.md) e o [guia Docker](../../docs/docker.md).
