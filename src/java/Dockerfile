FROM eclipse-temurin:21-jdk-noble@sha256:b468c3fc688b14450571494f588bd939378e7fd542ed5a73f8efc13f17872a87

# unzip mantém a distribuição ZIP cujo checksum está fixado no Maven Wrapper.
RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 runner \
    && mkdir /app \
    && chown runner:runner /app

WORKDIR /app
USER runner
RUN mkdir /home/runner/.m2
COPY --chown=runner:runner docs/casos docs/casos
COPY --chown=runner:runner src/java src/java
RUN chmod +x src/java/mvnw

CMD ["./src/java/mvnw", "-B", "-f", "src/java/pom.xml", "clean", "verify"]
