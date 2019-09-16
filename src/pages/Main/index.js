import React from 'react';
import { FaGitAlt, FaPlus } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGitAlt />
        Repositorios
      </h1>

      <Form onSubmit={() => {}}>
        <input type="text" placeholder="Adicionar repositorio" />

        <SubmitButton disable>
          <FaPlus color="#fff" size={14} />
        </SubmitButton>
      </Form>
    </Container>
  );
}
