import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Avaliação extends Component {
  state = {
    emailInput: '',
    rateInput: '',
    textarea: '',
    evaluations: [],
    error: false,
    existEvaluation: false,
  };

  componentDidMount() {
    this.readEvaluations();
  }

  saveEvaluation = (id, value) => localStorage.setItem(id, JSON.stringify(value));

  readExistEvaluation = (key) => JSON.parse(localStorage.getItem(key));

  readEvaluations = () => {
    const { id } = this.props;
    if (this.readExistEvaluation(id) !== null) {
      this.setState({
        evaluations: this.readExistEvaluation(id),
        existEvaluation: true,
      });
    }
  };

  handleClick = () => {
    const { emailInput, rateInput, textarea } = this.state;
    const { id } = this.props;
    const verifyEmail = /\S+@\S+\.\S+/;
    if (rateInput.length === 0 || !emailInput.match(verifyEmail)) {
      this.setState({ error: true });
    } else {
      const userEvaluation = {
        email: emailInput,
        text: textarea,
        rate: rateInput,
      };
      this.setState(
        (prevState) => ({
          emailInput: '',
          rateInput: '',
          textarea: '',
          error: false,
          evaluations: [...prevState.evaluations, userEvaluation],
        }),
        () => {
          const { evaluations } = this.state;
          this.saveEvaluation(id, evaluations);
          this.readEvaluations();
        },
      );
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { emailInput, textarea, error, evaluations, existEvaluation } = this.state;
    return (
      <section>
        <div>
          <h2>Avaliações</h2>
          <form action="">
            { error && <p data-testid="error-msg">Campos inválidos</p>}
            <div>
              <input
                name="emailInput"
                value={ emailInput }
                onChange={ this.handleChange }
                data-testid="product-detail-email"
                type="text"
                placeholder="Email"
              />
              <input
                type="radio"
                value="1"
                onChange={ this.handleChange }
                name="rateInput"
                data-testid="1-rating"
              />
              <input
                type="radio"
                value="2"
                onChange={ this.handleChange }
                name="rateInput"
                data-testid="2-rating"
              />
              <input
                type="radio"
                value="3"
                onChange={ this.handleChange }
                name="rateInput"
                data-testid="3-rating"
              />
              <input
                type="radio"
                value="4"
                onChange={ this.handleChange }
                name="rateInput"
                data-testid="4-rating"
              />
              <input
                type="radio"
                value="5"
                onChange={ this.handleChange }
                name="rateInput"
                data-testid="5-rating"
              />
            </div>
            <div>
              <textarea
                name="textarea"
                value={ textarea }
                onChange={ this.handleChange }
                data-testid="product-detail-evaluation"
                cols="30"
                rows="10"
                placeholder="Mensagem (opcional)"
              />
            </div>
            <button
              data-testid="submit-review-btn"
              type="button"
              onClick={ this.handleClick }
            >
              Avaliar
            </button>
          </form>
        </div>
        { existEvaluation && (
          evaluations.map((evaluation) => (
            <section
              key={ `${evaluation.email} ${evaluation.rate}` }
            >
              <div>
                <h3 data-testid="review-card-email">{ evaluation.email }</h3>
                <span data-testid="review-card-rating">
                  { `Avaliação: ${evaluation.rate}` }
                </span>
              </div>
              <p data-testid="review-card-evaluation">
                { evaluation.text }
              </p>
            </section>
          ))
        ) }
      </section>
    );
  }
}

Avaliação.propTypes = {
  id: PropTypes.string.isRequired,
};
