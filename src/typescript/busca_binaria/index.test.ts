import { verificarCasos } from '../_shared/casos.js';
import { buscaBinaria } from './index.js';

verificarCasos('busca_binaria', ({ numeros, alvo }) => buscaBinaria(numeros, alvo));
