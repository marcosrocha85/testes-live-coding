FROM gcc:15.2.0@sha256:3ae15afe768b06d0c0fe088d822ba5f8045c26630bdacc8d8e7713cf5d8e7289

RUN useradd --create-home --uid 10001 runner \
    && mkdir -p /app && chown runner:runner /app
WORKDIR /app
COPY --chown=runner:runner docs/casos ./docs/casos
COPY --chown=runner:runner src/cpp ./src/cpp
USER runner
ENV HOME=/home/runner
# Só o parser dos testes é baixado. Fontes, compilação e execução ficam no container.
RUN sh src/cpp/preparar-testes.sh
CMD ["sh", "src/cpp/executar.sh", "check"]
