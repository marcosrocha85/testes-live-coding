const $ = (id) => document.getElementById(id);
const repo = 'https://github.com/marcosrocha85/testes-live-coding';
const normalizar = (texto) => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
let catalogo;
let exercicioAtual;
let linguagemAtual;
let codigoAtual = '';

function preencherLista(id, valores) {
  $(id).replaceChildren(...valores.map((valor) => {
    const item = document.createElement('li');
    item.textContent = valor;
    return item;
  }));
}

function escolher(exercicio, linguagem) {
  const hash = `${exercicio}.${linguagem}`;
  if (location.hash.slice(1) === hash) renderizar();
  else location.hash = hash;
}

function mostrarCaso() {
  const caso = exercicioAtual.cases[Number($('case-select').value)];
  $('case-input').textContent = JSON.stringify(caso.input, null, 2);
  $('case-output').textContent = caso.error ? `Rejeitar a entrada (${caso.error} em JavaScript)` : caso.expectedIndices ? `Qualquer índice em ${JSON.stringify(caso.expectedIndices)}` : JSON.stringify(caso.expected, null, 2);
}

function renderizar() {
  const [id, linguagem] = location.hash.slice(1).split('.');
  exercicioAtual = catalogo.exercises.find((exercicio) => exercicio.id === id) ?? catalogo.exercises[0];
  linguagemAtual = catalogo.languages.find((item) => item.id === linguagem) ?? catalogo.languages[0];
  const exercicio = exercicioAtual;
  document.title = `${exercicio.name} · ${linguagemAtual.name} · Testes de live coding`;
  $('exercise-number').textContent = `Desafio ${String(catalogo.exercises.indexOf(exercicio) + 1).padStart(2, '0')} / 10`;
  $('exercise-title').textContent = exercicio.name;
  $('original-name').textContent = exercicio.problemName;
  for (const [id, chave] of [['problem', 'problem'], ['idea', 'idea'], ['why', 'why'], ['walkthrough', 'walkthrough'], ['contract', 'contract'], ['time', 'time'], ['space', 'space']]) $(id).textContent = exercicio[chave];
  preencherLista('steps', exercicio.steps);
  preencherLista('skills', exercicio.skills);
  preencherLista('pitfalls', exercicio.pitfalls);
  for (const botao of $('exercise-list').children) botao.setAttribute('aria-current', String(botao.dataset.id === exercicio.id));
  for (const botao of $('language-tabs').children) {
    const selecionado = botao.dataset.id === linguagemAtual.id;
    botao.setAttribute('aria-selected', String(selecionado));
    botao.tabIndex = selecionado ? 0 : -1;
  }
  $('solution-panel').setAttribute('aria-labelledby', `tab-${linguagemAtual.id}`);
  const solucao = exercicio.solutions.find((item) => item.language === linguagemAtual.id);
  const disponivel = solucao.code !== null;
  codigoAtual = solucao.code ?? '';
  $('code').textContent = codigoAtual;
  $('code-block').hidden = !disponivel;
  $('copy-code').hidden = !disponivel;
  $('planned').hidden = disponivel;
  $('file-name').textContent = disponivel ? solucao.path : `${linguagemAtual.name} · planejada`;
  $('planned-title').textContent = `${exercicio.name} em ${linguagemAtual.name}`;
  $('issue-link').href = linguagemAtual.issueUrl ?? `${repo}/issues`;
  $('copy-status').textContent = '';
  $('support-files').replaceChildren(...solucao.support.map((arquivo) => {
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = `Auxiliar usado nos exemplos: ${arquivo.path}`;
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = arquivo.code;
    pre.append(code);
    details.append(summary, pre);
    return details;
  }));
  $('case-select').replaceChildren(...exercicio.cases.map((caso, indice) => {
    const option = document.createElement('option');
    option.value = indice;
    option.textContent = caso.name;
    return option;
  }));
  mostrarCaso();
  $('docs-link').href = `${repo}/blob/main/docs/tests/${exercicio.id}.md`;
}

try {
  const resposta = await fetch('./catalogo.json');
  if (!resposta.ok) throw new Error('Catálogo indisponível.');
  catalogo = await resposta.json();
  catalogo.exercises.forEach((exercicio, indice) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'exercise-button';
    botao.dataset.id = exercicio.id;
    const numero = document.createElement('span');
    numero.className = 'number';
    numero.textContent = String(indice + 1).padStart(2, '0');
    const nome = document.createElement('span');
    nome.textContent = exercicio.name;
    botao.append(numero, nome);
    botao.addEventListener('click', () => escolher(exercicio.id, linguagemAtual.id));
    $('exercise-list').append(botao);
  });
  catalogo.languages.forEach((linguagem) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.id = `tab-${linguagem.id}`;
    botao.dataset.id = linguagem.id;
    botao.setAttribute('role', 'tab');
    botao.setAttribute('aria-controls', 'solution-panel');
    botao.textContent = linguagem.name;
    if (linguagem.status === 'implemented') {
      const ponto = document.createElement('span');
      ponto.className = 'tab-dot';
      ponto.setAttribute('aria-hidden', 'true');
      botao.append(ponto);
      botao.setAttribute('aria-label', `${linguagem.name}, implementação disponível`);
    }
    botao.addEventListener('click', () => escolher(exercicioAtual.id, linguagem.id));
    $('language-tabs').append(botao);
  });
  $('language-tabs').addEventListener('keydown', (evento) => {
    const botoes = [...$('language-tabs').children];
    const indice = botoes.indexOf(document.activeElement);
    if (indice < 0) return;
    let proximo;
    if (evento.key === 'ArrowRight') proximo = (indice + 1) % botoes.length;
    if (evento.key === 'ArrowLeft') proximo = (indice - 1 + botoes.length) % botoes.length;
    if (evento.key === 'Home') proximo = 0;
    if (evento.key === 'End') proximo = botoes.length - 1;
    if (proximo === undefined) return;
    evento.preventDefault();
    botoes[proximo].focus();
    escolher(exercicioAtual.id, botoes[proximo].dataset.id);
  });
  $('search').addEventListener('input', () => {
    const termo = normalizar($('search').value);
    let encontrados = 0;
    catalogo.exercises.forEach((exercicio, indice) => {
      const corresponde = normalizar([exercicio.name, exercicio.problemName, ...exercicio.skills].join(' ')).includes(termo);
      $('exercise-list').children[indice].hidden = !corresponde;
      if (corresponde) encontrados++;
    });
    $('no-results').hidden = encontrados !== 0;
  });
  $('case-select').addEventListener('change', mostrarCaso);
  document.querySelector('.skip').addEventListener('click', (evento) => {
    evento.preventDefault();
    $('exercise-title').focus();
  });
  $('copy-code').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codigoAtual);
      $('copy-status').textContent = 'Código copiado.';
    } catch {
      $('copy-status').textContent = 'Selecione o código e use Ctrl+C ou ⌘C para copiar.';
    }
  });
  window.addEventListener('hashchange', renderizar);
  renderizar();
  $('workspace').hidden = false;
} catch {
  $('load-error').hidden = false;
  $('load-error').textContent = 'Não foi possível carregar o catálogo. Recarregue a página ou consulte as explicações no GitHub.';
}
