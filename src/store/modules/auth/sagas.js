import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';
import history from '../../../services/history';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));

    toast.success('Você fez login no sistema!');

    // vai enviar o token em todas as requisições
    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    // volta pra ultima tela
    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuário ou senha inválidos!');
    yield put(actions.loginFailure());
  }
}

// eslint-disable-next-line
function* persistRehydrate({ payload }) {
  const token = get(payload, 'authReducer.token', '');

  if (!token) return;

  // pra nao perder o Authorization nos headers
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
