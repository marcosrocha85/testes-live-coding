FROM node:24-bookworm-slim@sha256:d6aa754f16b3197301076f047b5def2f02ea1dbbc2ca920407d46d7ec7f87b20

WORKDIR /app/src/javascript
# Os caminhos relativos dos testes continuam apontando para docs/casos.
COPY --chown=node:node docs/casos /app/docs/casos
COPY --chown=node:node src/javascript /app/src/javascript

USER node
CMD ["npm", "test"]
