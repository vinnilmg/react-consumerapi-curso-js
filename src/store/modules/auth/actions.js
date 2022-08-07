import * as actions from '../types';

export function loginRequest(payload) {
  return { type: actions.LOGIN_REQUEST, payload };
}

export function loginSuccess(payload) {
  return { type: actions.LOGIN_SUCCESS, payload };
}

export function loginFailure(payload) {
  return { type: actions.LOGIN_FAILURE, payload };
}
