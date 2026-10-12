import { verificarCasos } from '../_shared/casos.js';
import { somaDeDois } from './index.js';

verificarCasos('soma_de_dois', ({ numeros, alvo }) => somaDeDois(numeros, alvo));
