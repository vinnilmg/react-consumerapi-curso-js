import * as actions from '../types';

const initialState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actions.LOGIN_SUCCESS: {
      const newState = { ...initialState };
      newState.isLoggedIn = true;
      newState.token = action.payload.token;
      newState.user = action.payload.usuario;
      newState.isLoading = false;
      return newState;
    }

    case actions.LOGIN_FAILURE: {
      // vai deslogar o usuário (retorna o estado como inicial)
      const newState = { ...initialState };
      return newState;
    }

    case actions.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.isLoading = true;
      return newState;
    }

    default: {
      return state;
    }
  }
}
