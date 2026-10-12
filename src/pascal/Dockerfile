FROM debian:bookworm-slim@sha256:7c7b2c966bc9ee8cedfeef67e0e279108992c77681fa595db4a9d65c06ccc587

# FPC e suas bibliotecas pertencem à mesma distribuição, com versão exata.
RUN apt-get update && apt-get install --no-install-recommends -y \
      fp-compiler-3.2.2=3.2.2+dfsg-20 \
      fp-units-rtl-3.2.2=3.2.2+dfsg-20 \
      fp-units-base-3.2.2=3.2.2+dfsg-20 \
      fp-units-fcl-3.2.2=3.2.2+dfsg-20 \
      binutils=2.40-2 \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 runner \
    && mkdir -p /app && chown runner:runner /app
WORKDIR /app
COPY --chown=runner:runner docs/casos ./docs/casos
COPY --chown=runner:runner src/pascal ./src/pascal
USER runner
ENV HOME=/home/runner
CMD ["sh", "src/pascal/executar.sh", "check"]
