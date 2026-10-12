# Swift — dez desafios de live coding

Os dez desafios têm soluções independentes, testes dos casos compartilhados e explicações locais. Comece pelo [guia Swift](../../docs/linguagens/swift.md).

Sem instalar SDK no computador, execute da raiz:

```sh
docker compose run --build --rm swift
```

Com Swift 6.3.3 de 64 bits local:

```sh
swift test --package-path src/swift --jobs 2 -Xswiftc -warnings-as-errors
swift run --package-path src/swift --jobs 2 exemplo soma_de_dois
```

O Package Manager separa a biblioteca LiveCoding, os testes Swift Testing e o executável de exemplos. Não há dependências externas nem SDK instalado no host pelo Docker. Os testes leem docs/casos; clone o repositório completo. Os exemplos são gerados por npm run docs. Consulte os READMEs das dez pastas.
