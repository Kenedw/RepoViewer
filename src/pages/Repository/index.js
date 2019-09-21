import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaGithub } from 'react-icons/fa';

import api from '../../services/api';
import Container from '../../components/Container';

import { Loading, Owner, IssuesList, Label, SearchMenu } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    menuSelect: 'all',
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  handleSearch = async e => {
    const param = e.target.textContent.toLowerCase();

    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: param,
        per_page: 5,
      },
    });

    this.setState({
      issues: issues.data,
      menuSelect: param,
    });
  };

  render() {
    const { repository, issues, loading, menuSelect } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaGithub />
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaAngleLeft />
            <span>To back</span>
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <SearchMenu>
          <button
            type="button"
            select={menuSelect === 'all' ? 1 : null}
            onClick={this.handleSearch}
          >
            All
          </button>
          <button
            type="button"
            select={menuSelect === 'open' ? 1 : null}
            onClick={this.handleSearch}
          >
            Open
          </button>
          <button
            type="button"
            select={menuSelect === 'closed' ? 1 : null}
            onClick={this.handleSearch}
          >
            Closed
          </button>
        </SearchMenu>

        <IssuesList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <Label key={String(label.id)} background={label.color}>
                      {label.name}
                    </Label>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssuesList>
      </Container>
    );
  }
}
