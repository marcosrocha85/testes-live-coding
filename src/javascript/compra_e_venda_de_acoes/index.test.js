import { verificarCasos } from '../_shared/casos.js';
import { maiorLucro } from './index.js';

verificarCasos('compra_e_venda_de_acoes', ({ precos }) => maiorLucro(precos));
