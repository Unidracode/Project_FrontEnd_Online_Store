import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Imagem from '../images/Vector.png';

export default class Header extends Component {
  redirect = () => {
    const { history } = this.props;
    history.push('/carrinho');
  };

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="shopping-cart-button"
          onClick={ this.redirect }
        >
          <img src={ Imagem } alt="Carrinho" />
        </button>
      </div>
    );
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
