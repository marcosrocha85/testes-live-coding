FROM swift:6.3.3-noble@sha256:cd45c27b3abc42310c33cfaf3008b18156cbdc9187834c9617e8f43a26d2675c

RUN useradd --create-home --uid 10001 runner && mkdir -p /app && chown runner:runner /app
WORKDIR /app
COPY --chown=runner:runner docs/casos ./docs/casos
COPY --chown=runner:runner src/swift ./src/swift
USER runner
ENV HOME=/home/runner
CMD ["swift", "test", "--package-path", "src/swift", "--jobs", "2", "-Xswiftc", "-warnings-as-errors"]
