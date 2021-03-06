import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    repoNotFound: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    // Carrega os dados do localstorage
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    // Salva os dados do localstorage
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputCharge = e => {
    this.setState({
      newRepo: e.target.value,
      repoNotFound: false,
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      const isExist = repositories.some(
        repository => repository.name === data.name
      );

      if (isExist) {
        throw new Error('Repository already exist');
      }

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
      });
    } catch (e) {
      console.error(e);

      this.setState({
        repoNotFound: true,
        loading: false,
      });
    }
  };

  render() {
    const { newRepo, loading, repositories, repoNotFound } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Insert a repository"
            error={repoNotFound.toString()}
            value={newRepo}
            onChange={this.handleInputCharge}
          />

          <SubmitButton isloading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                More details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
