# Rust e Debian da imagem oficial, fixados pela identidade do conteúdo.
FROM rust:1.92.0-bookworm@sha256:e90e846de4124376164ddfbaab4b0774c7bdeef5e738866295e5a90a34a307a2
RUN rustup component add rustfmt clippy --toolchain 1.92.0 \
    && useradd --create-home --uid 10001 runner \
    && mkdir -p /app/src/rust \
    && chown -R runner:runner /app
ENV CARGO_HOME=/home/runner/.cargo
WORKDIR /app/src/rust
COPY --chown=runner:runner src/rust/ ./
COPY --chown=runner:runner docs/casos/ /app/docs/casos/
USER runner
RUN cargo fetch --locked
# Dependências já estão na imagem; testes e exemplos funcionam sem rede.
ENV CARGO_NET_OFFLINE=true
CMD ["sh", "executar.sh", "check"]
