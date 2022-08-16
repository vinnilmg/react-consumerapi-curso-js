import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Title, Form } from './styles';
import axios from '../../services/axios';
import history from '../../services/history';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = React.useState(false);
  const [foto, setFoto] = React.useState('');

  React.useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        // faço a requisição para buscar a foto do aluno
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Fotos[0].url', ''));

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);

        toast.error('Erro ao obter imagem!');
        history.push('/');
      }
    }

    getData();
  }, [id]);

  const handleChange = async (e) => {
    // arquivo de imagem
    const novaFoto = e.target.files[0];

    // cria a URL da foto enviada e altera a foto do aluno
    const fotoURL = URL.createObjectURL(novaFoto);
    setFoto(fotoURL);

    // formulário de foto
    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', novaFoto);

    // envio a foto
    try {
      setIsLoading(true);
      await axios.post('/fotos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Foto enviada com sucesso!');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      const { status } = get(err, 'response', {});
      toast.error('Erro ao enviar a foto.');

      if (status === 401) {
        toast.error('Faça login novamente!');
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? (
            <img crossOrigin="anonymous" src={foto} alt="Foto" />
          ) : (
            'Selecionar foto'
          )}
          <input type="file" id="foto" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
