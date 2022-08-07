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
      return newState;
    }

    case actions.LOGIN_FAILURE: {
      // vai deslogar o usuário
      const newState = { ...initialState };
      return newState;
    }

    default: {
      return state;
    }
  }
}
