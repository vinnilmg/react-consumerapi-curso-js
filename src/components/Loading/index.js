import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Loading({ isLoading }) {
  if (!isLoading) return <></>;

  return (
    <Container>
      <div>
        <span>Carregando...</span>
      </div>
    </Container>
  );
}

Loading.defaultProps = { isLoading: false };

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
