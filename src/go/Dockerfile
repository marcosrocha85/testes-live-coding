FROM golang:1.27.2-bookworm@sha256:5cf287a799e6b94384bad13d16b14904c531f51ba65792237e122ce42b392f61

RUN useradd --create-home --uid 10001 runner \
    && mkdir -p /app && chown runner:runner /app
WORKDIR /app
COPY --chown=runner:runner docs/casos ./docs/casos
COPY --chown=runner:runner src/go ./src/go
USER runner
ENV GOTOOLCHAIN=local GOPROXY=off
WORKDIR /app/src/go
# Sem módulos externos: formatação, análise, compilação e testes usam o Go fixado.
CMD ["sh", "executar.sh", "check"]
