import * as actions from '../types';

// estado inicial
const initialState = {
  botaoClicado: false,
};

// sempre precisa retornar um estado
// vai escutar todas as acoes que forem disparadas
export default function (state = initialState, action) {
  switch (action.type) {
    case actions.BOTAO_CLICADO_SUCCESS: {
      console.log('Sucesso!');
      const newState = { ...state }; // copio o estado atual

      // altero o estado (se for true vira false e se for false vira true)
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }

    case actions.BOTAO_CLICADO_REQUEST: {
      console.log('Fazendo request...');
      return state;
    }

    case actions.BOTAO_CLICADO_FAILURE: {
      console.log('Deu Erro =/');
      return state;
    }

    default: {
      return state;
    }
  }
}
