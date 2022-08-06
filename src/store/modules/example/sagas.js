import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as actions from './actions';
import * as types from '../types';

const requisicao = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(requisicao); // executa requisicao

    toast.success('Sucesso ao executar a requisição.');
    yield put(actions.clicaBotaoSuccess()); // dispara action sucesso
  } catch {
    toast.error('Deu erro ao executar a requisição.');
    yield put(actions.clicaBotaoFailure()); // dispara action erro
  }
}

export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
