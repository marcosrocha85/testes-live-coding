FROM node:24-bookworm-slim@sha256:d6aa754f16b3197301076f047b5def2f02ea1dbbc2ca920407d46d7ec7f87b20

WORKDIR /app
RUN chown node:node /app
USER node

# O lockfile é compartilhado pelos workspaces; só TypeScript instala dependências.
COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node src/javascript/package.json src/javascript/package.json
COPY --chown=node:node src/typescript/package.json src/typescript/package.json
RUN npm ci --workspace src/typescript --include-workspace-root=false --no-audit --no-fund

COPY --chown=node:node docs/casos docs/casos
COPY --chown=node:node src/typescript src/typescript
CMD ["npm", "run", "test", "--workspace", "src/typescript"]
