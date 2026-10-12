FROM eclipse-temurin:21-jdk-noble@sha256:b468c3fc688b14450571494f588bd939378e7fd542ed5a73f8efc13f17872a87

RUN useradd --create-home --uid 10001 runner \
    && mkdir /app \
    && chown runner:runner /app

WORKDIR /app
USER runner
RUN mkdir /home/runner/.gradle

# Evita timeouts de rotas IPv6 nos downloads do Wrapper pelo Docker Desktop.
ENV JAVA_OPTS="-Djava.net.preferIPv4Stack=true"

COPY --chown=runner:runner docs/casos docs/casos
COPY --chown=runner:runner src/kotlin src/kotlin
RUN chmod +x src/kotlin/gradlew

CMD ["./src/kotlin/gradlew", "--no-daemon", "--console=plain", "-p", "src/kotlin", "clean", "check", "jar"]
