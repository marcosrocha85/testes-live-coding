# Rust para estudar os desafios

Rust usa tipos e regras de propriedade para controlar a vida dos valores. A biblioteca padrão atende às dez soluções. Este microprojeto fixa **Rust 1.92.0**, edição 2024, com Cargo, rustfmt e Clippy. A edição escolhe as regras da linguagem; a versão escolhe o compilador concreto.

## Executar sem instalar SDK

Da raiz do repositório:

```sh
docker compose run --build --rm rust
docker compose run --build --rm rust sh executar.sh testes busca_binaria
docker compose run --build --rm rust sh executar.sh exemplo soma_de_dois
```

O primeiro comando verifica a versão e a formatação, executa Clippy com avisos como erros, a suíte completa em debug e release, e os dez exemplos compilados. Cada exemplo confere sua saída com assertivas antes de imprimir. O último imprime `soma_de_dois: Some([0, 1])`.

Fontes e casos são copiados para a imagem oficial fixada por digest; compilação e testes rodam como usuário sem privilégios. Não há montagem do checkout nem instalação de SDK no host. O build baixa dependências travadas; o comando padrão funciona sem rede. Veja [Docker](../docker.md).

Se já tiver Rust 1.92.0 com rustfmt e Clippy, use `sh src/rust/executar.sh check` em Linux/macOS. Com ferramentas já disponíveis, também no PowerShell:

```sh
cargo +1.92.0 fmt --manifest-path src/rust/Cargo.toml --all -- --check
cargo +1.92.0 clippy --manifest-path src/rust/Cargo.toml --locked --all-targets -- -D warnings
cargo +1.92.0 test --manifest-path src/rust/Cargo.toml --locked
cargo +1.92.0 test --manifest-path src/rust/Cargo.toml --locked --release
cargo +1.92.0 run --manifest-path src/rust/Cargo.toml --locked --bin exemplos -- soma_de_dois
```

`npm test` verifica a base Node e o site; não executa Rust.

## Cargo e módulos

`Cargo.toml` declara o pacote, a biblioteca, o executável de exemplos e a dependência de teste. `Cargo.lock` registra versões e checksums; `--locked` falha se o manifesto exigir uma atualização. Preserve esse arquivo.

`rust-toolchain.toml` seleciona 1.92.0 e seus componentes. `lib.rs` usa `#[path = "..."]` para conservar as pastas dos desafios. Cada módulo público expõe sua função, e `#[cfg(test)]` inclui o arquivo de testes somente durante os testes. O crate se chama `live_coding_rust` nos imports.

`serde_json =1.0.145` decodifica os casos compartilhados somente nos testes. Nenhuma solução importa esse pacote. O gerador da documentação mantém `_examples/main.rs` a partir de [scripts/rust-docs.mjs](../../scripts/rust-docs.mjs), junto com os trechos exibidos nos READMEs. Altere a fonte e execute `npm run docs`.

## Propriedade e empréstimos

Um valor tem um dono. Passar um valor que não implementa Copy normalmente transfere sua propriedade. `&valor` empresta para leitura; `&mut valor` empresta para escrita exclusiva. O compilador controla esses empréstimos para evitar usar memória já liberada.

`&[i64]` é um slice emprestado: permite ler parte de um array ou Vec sem copiá-lo. As funções numéricas recebem esse tipo e não conseguem alterar seus elementos. `&str` empresta texto UTF-8 válido. `let` cria uma variável; `let mut` permite mudar o valor da variável.

`Vec` guarda elementos em sequência, como na pilha de parênteses. HashMap associa chaves a valores, como o mapa de complementos e a frequência de pontos Unicode.

## Ausência e erro

`Option<T>` contém `Some(valor)` ou `None`. Soma de dois retorna `Option<[usize; 2]>`; subarray retorna `Option<i64>`. None equivale ao null dos casos JSON. Some(0) e Some(-3) são respostas presentes, mesmo sem valor positivo.

`Result<T, E>` contém `Ok(valor)` ou `Err(erro)`. Escadas retorna `Result<i64, DegrausInvalidos>`, equivalente à rejeição RangeError do contrato. O erro implementa `Display` para mensagem e `Error` para integração com outros erros. Os testes conferem essas variantes e a mensagem.

`?` retorna cedo quando encontra ausência ou erro compatível com o retorno da função. `match` e `if let` permitem tratar cada variante explicitamente. Não use unwrap para entradas opcionais desconhecidas. Nos exemplos e fixtures, unwrap consulta dados que acabaram de ser construídos e verificados.

Busca binária mantém -1 como ausência por contrato, com retorno `isize`. As ligações de listas usam None para lista vazia ou fim.

## Inteiros e domínio de escadas

Valores, somas e contagens usam `i64`, com 64 bits assinados. Dez mil elementos de um milhão somam **10.000.000.000**. Índices usam `usize`, cujo tamanho acompanha a plataforma. A conversão para isize na busca é segura no domínio de até dez mil elementos.

Escadas aceita `f64` somente na entrada, para rejeitar frações, NaN e infinitos antes de converter. As contas usam exclusivamente i64. O domínio permanece **0 a 77**: zero tem uma sequência vazia e 77 retorna exatamente **8.944.394.323.791.464**.

O perfil release ativa `overflow-checks = true`; debug também verifica overflow. Não use aritmética modular nas soluções. Os tipos amplos não ampliam o contrato das entradas; os testes de números maiores apenas conferem que os acumuladores são realmente de 64 bits.

## Unicode

Rust garante que `str` é UTF-8 válido. `len()` mede bytes. `chars()` produz valores escalares Unicode completos, representados por `char`. Isso corresponde aos pontos válidos do contrato. Veja a [documentação de chars](https://doc.rust-lang.org/std/primitive.str.html#method.chars).

O anagrama conta `char` com frequências i64. Não normaliza texto, agrupa grafemas ou ignora espaços e maiúsculas. `"é"` e `"e\u{301}"` têm pontos diferentes. Emojis fora do plano básico continuam completos. A suíte compara uma referência que ordena chars, testa multiplicidades e percorre todos os valores escalares Unicode.

## Nós reais, identidade e mutação

`Ligacao = Option<Rc<RefCell<No>>>` permite listas reais e ciclos em Rust seguro. Cada No contém um valor i64 e a ligação proximo. Arrays e Vec são usados apenas para montar as fixtures e conferir resultados; os algoritmos percorrem os nós.

`Rc` compartilha a propriedade dentro de uma thread. `Rc::clone(&no)` cria outra referência ao mesmo nó, sem copiar seu valor nem suas ligações. `Rc::ptr_eq(&a, &b)` verifica identidade. Dois nós com valor 1 continuam sendo objetos diferentes.

`RefCell` controla empréstimos em execução. `borrow()` lê e `borrow_mut()` escreve; um empréstimo incompatível causa panic. As soluções mantêm empréstimos curtos, encerrando a leitura antes de mudar uma ligação. Esses nós não são próprios para acesso entre threads.

Inversão e mesclagem recebem a cabeça por valor e devolvem outra ligação, reutilizando os nós. Outros donos podem observar as mudanças. `take()` retira a ligação e coloca None no campo. A mesclagem exige listas independentes, ordenadas e acíclicas; <= mantém a primeira lista em empate. Floyd recebe `&Ligacao` e somente lê: nenhuma ligação ou valor é modificado.

## Liberação da memória

Quando a última referência forte de um Rc desaparece, seu valor é destruído. O `Drop` de No retira ligações e usa [Rc::try_unwrap](https://doc.rust-lang.org/std/rc/struct.Rc.html#method.try_unwrap) para liberar iterativamente o trecho que tem um único dono. Assim, uma cadeia longa não dispara milhares de destrutores recursivos. Se outro dono mantém o próximo nó, a liberação para ali e preserva suas ligações. O destrutor não modifica nós ainda compartilhados.

Um ciclo forte mantém seus próprios contadores vivos; Rc não tem coletor de ciclos. O dono da estrutura precisa desfazer as ligações quando terminar. As fixtures mantêm um Vec de donos e implementam Drop para retirar cada ligação, inclusive em caso de falha de uma assertiva. O exemplo de Floyd desfaz o ciclo depois de conferir ausência de mutação. O algoritmo não faz essa limpeza.

Os testes usam referências Weak para confirmar que nós foram liberados. Uma cadeia exclusiva de dez mil nós é destruída em uma thread com pilha de 64 KiB, verificando a liberação iterativa. Não há unsafe nem comparação recursiva por valor.

## O que os testes verificam

Todos os 86 casos JSON são consumidos diretamente de `docs/casos`. Testes adicionais usam buscas exaustivas para soma, lucro e subarray, remoção de pares para parênteses, varredura linear para busca, combinações em u128 para escadas e ordenação de chars para anagrama.

Nas listas, o resultado é comparado por identidade: inversão deve reutilizar todos os nós, mesclagem é comparada à ordenação estável dos donos originais e Floyd à referência com conjunto de endereços. A suíte confere ligações finais, valores intactos, duplicatas, vazios, todas as entradas de ciclos curtos e listas longas. Os mesmos testes rodam em debug e release, sem suíte reduzida no Docker.

Leia também [The Rust Book](https://doc.rust-lang.org/book/), os [contratos](../contratos.md), a [arquitetura](../arquitetura.md) e os READMEs de cada desafio.
