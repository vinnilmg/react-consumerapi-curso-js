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
function persistRehydrate({ payload }) {
  const token = get(payload, 'authReducer.token', '');

  if (!token) return;

  // pra nao perder o Authorization nos headers
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

// eslint-disable-next-line
function* registerRequest({ payload }) {
  const { idStored: id, nome, email, password } = payload;

  try {
    // se tiver ID é atualizacao do usuario, se não é criação de usuario
    if (id) {
      yield call(axios.put, '/usuarios', {
        nome,
        email,
        password: password || undefined,
      });

      toast.success('Seus dados foram atualizados!');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
    } else {
      yield call(axios.post, '/usuarios', {
        nome,
        email,
        password,
      });

      toast.success('Usuário criado com sucesso!');
      yield put(actions.registerCreatedSuccess({ nome, email, password }));
      history.push('/login');
    }
  } catch (e) {
    const erros = get(e, 'response.data.erros', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Faça login novamente!');
      yield put(actions.loginFailure()); // desloga o usuario
      return history.push('/login');
    }

    if (erros.length > 0) {
      erros.map((erro) => toast.error(erro));
    } else {
      toast.error('Erro desconhecido. Fale com o ADM.');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
