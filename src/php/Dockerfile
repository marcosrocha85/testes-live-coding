FROM composer:2.9@sha256:b09bccd91a78fe8a9ab4b33d707b862e8fe54fec17782e32683ad2a69c46867d AS composer
FROM php:8.4-cli-bookworm@sha256:836ac6c672d1372a47c8fd61b625015bd07760f493fb2eaab2087636498a2b4b AS toolchain

RUN apt-get update && apt-get install -y --no-install-recommends unzip \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --create-home --uid 10001 runner \
    && mkdir -p /app/src/php \
    && chown -R runner:runner /app
COPY --from=composer /usr/bin/composer /usr/local/bin/composer
RUN php -r 'if (PHP_INT_SIZE !== 8) { fwrite(STDERR, "PHP de 64 bits é obrigatório.\n"); exit(1); }'

WORKDIR /app
USER runner

FROM toolchain AS tests
COPY --chown=runner:runner src/php/composer.json src/php/composer.lock src/php/
RUN composer --working-dir=src/php install --no-interaction --prefer-dist --no-progress --no-scripts
COPY --chown=runner:runner docs/casos docs/casos
COPY --chown=runner:runner src/php src/php
CMD ["composer", "--working-dir=src/php", "check"]
