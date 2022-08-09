import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styles';
import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const {
    id: idStored,
    nome: nomeStored,
    email: emailStored,
  } = useSelector((state) => state.authReducer.user);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!idStored) return;

    setNome(nomeStored);
    setEmail(emailStored);
  }, [idStored, nomeStored, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();

    // validações
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Seu nome deve ter entre 3 e 255 caracteres.');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }

    if (!idStored && (password.length < 6 || password.length > 50)) {
      formErrors = true;
      toast.error('Sua senha deve ter entre 6 e 50 caracteres.');
    }

    if (formErrors) return;

    // lança action
    dispatch(actions.registerRequest({ nome, email, password, idStored }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{!idStored ? 'Crie sua conta grátis!' : 'Atualize seus dados!'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>

        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
          />
        </label>

        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>

        <button type="submit">{!idStored ? 'Criar' : 'Atualizar'}</button>
      </Form>
    </Container>
  );
}
