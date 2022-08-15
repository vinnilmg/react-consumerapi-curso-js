import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { isEmail, isInt, isFloat } from 'validator';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import { Form } from './styles';
import Loading from '../../components/Loading';
import history from '../../services/history';
import axios from '../../services/axios';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', 0);

  const [nome, setNome] = React.useState('');
  const [sobrenome, setSobrenome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [idade, setIdade] = React.useState('');
  const [peso, setPeso] = React.useState('');
  const [altura, setAltura] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // só executa a função se for enviado ID do aluno
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        // setta campos do aluno recebidos da API
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        const status = get(err, 'response.status', 0);
        const erros = get(err, 'response.data.erros', []);

        if (status === 400) {
          erros.map((error) => toast.error(error));
          history.push('/');
        } else if (status === 401) {
          toast.error('Faça login novamente!');
          dispatch(actions.loginFailure());
        }
      }
    }

    getData();
  }, [id, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      toast.error('Nome deve ser maior que 3 e menor que 255!');
      formErrors = true;
    }

    if (sobrenome.length < 3 || sobrenome.length > 255) {
      toast.error('Sobrenome deve ser maior que 3 e menor que 255!');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('Informe um E-mail válido!');
      formErrors = true;
    }

    if (!isInt(String(idade))) {
      toast.error('Idade inválida!');
      formErrors = true;
    }

    if (!isFloat(String(peso))) {
      toast.error('Peso inválido!');
      formErrors = true;
    }

    if (!isFloat(String(altura))) {
      toast.error('Altura inválida!');
      formErrors = true;
    }

    if (formErrors) return;

    const payload = {
      nome,
      sobrenome,
      email,
      idade,
      peso,
      altura,
    };

    try {
      setIsLoading(true);

      if (id) {
        // edita o aluno existente
        await axios.put(`/alunos/${id}`, payload);
        toast.success(`Aluno '${id}' editado com sucesso!`);
      } else {
        // cria novo aluno
        const { data } = await axios.post('/alunos', payload);
        toast.success('Aluno criado com sucesso!');
        history.push(`/aluno/${data.id}/edit`);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      const status = get(err, 'response.status', 0);
      const dados = get(err, 'response.data', {});
      const erros = get(dados, 'erros', []);

      if (erros.length > 0) {
        erros.map((error) => toast.error(error));
      } else {
        toast.error('Erro desconhecido!');
      }

      if (status === 401) {
        toast.error('Faça login novamente!');
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? `Editar aluno` : 'Crie um novo aluno'}</h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />

        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
