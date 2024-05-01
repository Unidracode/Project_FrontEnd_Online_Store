import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Checkout extends Component {
  state = {
    products: [],
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    payMethod: false,
    errorForm: false,
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    const getLocal = JSON.parse(localStorage.getItem('cartProducts'));
    this.setState({ products: getLocal });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'payMethod') {
      this.setState({ [name]: true });
    } else {
      this.setState({ [name]: value });
    }
  };

  checkForm = () => {
    const {
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      payMethod,
    } = this.state;
    const { history } = this.props;

    const check = fullname && email && cpf && phone && cep && address && payMethod;

    if (check) {
      this.setState({
        errorForm: false,
        products: [],
      });
      history.push('/');
      localStorage.setItem('cartProducts', JSON.stringify([]));
    } else {
      this.setState({ errorForm: true });
    }
  };

  render() {
    const {
      products,
      fullname,
      email,
      cpf,
      phone,
      cep,
      address,
      errorForm,
    } = this.state;
    return (
      <div>
        { products.map((p, i) => <p key={ i }>{ p.nome }</p>) }
        { errorForm && <p data-testid="error-msg">Campos inválidos</p>}
        <form>
          <input
            name="fullname"
            type="text"
            placeholder="NOME COMPLETO"
            data-testid="checkout-fullname"
            value={ fullname }
            onChange={ this.handleChange }
          />
          <input
            name="email"
            type="email"
            placeholder="E-MAIL"
            data-testid="checkout-email"
            value={ email }
            onChange={ this.handleChange }
          />
          <input
            name="cpf"
            type="text"
            placeholder="CPF"
            data-testid="checkout-cpf"
            value={ cpf }
            onChange={ this.handleChange }
          />
          <input
            name="phone"
            type="text"
            placeholder="TELEFONE"
            data-testid="checkout-phone"
            value={ phone }
            onChange={ this.handleChange }
          />
          <input
            name="cep"
            type="text"
            placeholder="CEP"
            data-testid="checkout-cep"
            value={ cep }
            onChange={ this.handleChange }
          />
          <input
            name="address"
            type="text"
            placeholder="ENDEREÇO"
            data-testid="checkout-address"
            value={ address }
            onChange={ this.handleChange }
          />
          <label htmlFor="boleto">
            Boleto
            <input
              type="radio"
              id="boleto"
              name="payMethod"
              value="boleto"
              data-testid="ticket-payment"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="visa">
            Visa
            <input
              type="radio"
              id="visa"
              name="payMethod"
              value="visa"
              data-testid="visa-payment"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="mastercard">
            MasterCard
            <input
              type="radio"
              id="mastercard"
              name="payMethod"
              value="mastercard"
              data-testid="master-payment"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <label htmlFor="elo">
            Elo
            <input
              type="radio"
              id="elo"
              name="payMethod"
              value="elo"
              data-testid="elo-payment"
              onChange={ this.handleChange }
            />
          </label>
          <br />
          <button
            type="button"
            data-testid="checkout-btn"
            onClick={ this.checkForm }
          >
            Pagar
          </button>
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
