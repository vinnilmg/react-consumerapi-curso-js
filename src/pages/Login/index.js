import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();
  // pega o prevPath das props e se nao existir redireciona para home
  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.authReducer.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // validações
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (password.length < 6 || password.length > 50) {
      formErrors = true;
      toast.error('Senha inválida!');
    }

    if (formErrors) return;

    // dispara a action de request com o payload
    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Faça seu Login!</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Seu e-mail"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Sua senha"
        />

        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
