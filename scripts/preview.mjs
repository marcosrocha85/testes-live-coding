import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
import { buildSite, projectRoot } from './build-site.mjs';

const { output } = await buildSite();
const tipos = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8' };
const permitidos = new Set(['index.html', 'style.css', 'app.js', 'catalogo.json']);
const server = createServer(async (request, response) => {
  try {
    const path = new URL(request.url, 'http://127.0.0.1').pathname;
    const arquivo = path === '/' ? 'index.html' : path.slice(1);
    if (!permitidos.has(arquivo)) {
      response.writeHead(404).end('Arquivo não encontrado.');
      return;
    }
    response.setHeader('Content-Type', tipos[extname(arquivo)]);
    response.end(await readFile(resolve(output, arquivo)));
  } catch {
    response.writeHead(500).end('Não foi possível carregar o arquivo.');
  }
});
server.listen(4173, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:4173 (raiz: ${projectRoot})`));
server.on('error', (erro) => { console.error(erro.message); process.exitCode = 1; });
