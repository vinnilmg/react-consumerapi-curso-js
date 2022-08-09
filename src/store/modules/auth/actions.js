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

export function registerRequest(payload) {
  return { type: actions.REGISTER_REQUEST, payload };
}

export function registerFailure(payload) {
  return { type: actions.REGISTER_FAILURE, payload };
}

export function registerCreatedSuccess(payload) {
  return { type: actions.REGISTER_CREATED_SUCCESS, payload };
}

export function registerUpdatedSuccess(payload) {
  return { type: actions.REGISTER_UPDATED_SUCCESS, payload };
}
