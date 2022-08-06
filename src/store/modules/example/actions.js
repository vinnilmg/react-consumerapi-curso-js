import * as actions from '../types';

export function clicaBotaoRequest() {
  return { type: actions.BOTAO_CLICADO_REQUEST };
}

export function clicaBotaoSuccess() {
  return { type: actions.BOTAO_CLICADO_SUCCESS };
}

export function clicaBotaoFailure() {
  return { type: actions.BOTAO_CLICADO_FAILURE };
}
