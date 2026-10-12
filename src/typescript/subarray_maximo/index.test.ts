import { verificarCasos } from '../_shared/casos.js';
import { subarrayMaximo } from './index.js';

verificarCasos('subarray_maximo', ({ numeros }) => subarrayMaximo(numeros));
