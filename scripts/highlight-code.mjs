import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import java from 'highlight.js/lib/languages/java';
import kotlin from 'highlight.js/lib/languages/kotlin';
import php from 'highlight.js/lib/languages/php';
import swift from 'highlight.js/lib/languages/swift';
import pascal from 'highlight.js/lib/languages/delphi';
import cpp from 'highlight.js/lib/languages/cpp';

// A linguagem vem do catálogo: não tentamos adivinhá-la pelo conteúdo.
for (const [nome, gramatica] of Object.entries({ javascript, typescript, java, kotlin, php, swift, pascal, cpp })) {
  hljs.registerLanguage(nome, gramatica);
}

export function destacarCodigo(codigo, linguagem) {
  // O resultado contém apenas marcação de destaque; o código não é executado.
  return hljs.highlight(codigo, { language: linguagem }).value;
}
