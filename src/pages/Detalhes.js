import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import Avaliação from '../Components/Avaliação';
// import Header from '../Components/Header';

export default class Detalhes extends Component {
  state = {
    produto: '',
    quantidadeTotal: 0,

  };

  async componentDidMount() {
    const { location: { pathname } } = this.props;
    const id = pathname.split('/')[2];
    const product = await getProductById(id);
    this.setState({ produto: product });

    this.atualizaQuantidade();

    // const arrProdutos = JSON.parse(localStorage.getItem('cartProducts'));
    // const { quantidadeTotal } = this.state;
    // if (!arrProdutos || arrProdutos.length === 0) {
    //   this.setState({ quantidadeTotal: 0 });
    // } else {
    //   arrProdutos.forEach((p) => {
    //     const quantity = quantidadeTotal + p.quantidade;
    //     this.setState({ quantidadeTotal: quantity });
    //   });
    // }
  }

  atualizaQuantidade = () => {
    const produtosCarrinho = JSON.parse(localStorage.getItem('cartProducts'));

    if (produtosCarrinho && produtosCarrinho.length > 0) {
      produtosCarrinho.forEach((p) => {
        this.setState((prev) => (
          { quantidadeTotal: +prev.quantidadeTotal + +p.quantidade }
        ));
      });
    }
  };

  addToCart = () => {
    const { produto } = this.state;

    const getLocal = JSON.parse(localStorage.getItem('cartProducts') || '[]');

    const product = {
      nome: produto.title,
      preço: produto.price,
      quantidade: 1,
      imagem: produto.thumbnail,
    };
    const arrNomes = getLocal.map((p) => p.nome);
    const indexNome = arrNomes.findIndex((nome) => nome === product.nome);

    if (arrNomes.includes(product.nome)) {
      getLocal[indexNome].quantidade += 1;
    } else {
      getLocal.push(product);
    }

    this.setState((prev) => ({ quantidadeTotal: prev.quantidadeTotal + 1 }));

    localStorage.setItem('cartProducts', JSON.stringify(getLocal));
  };

  render() {
    const { produto, quantidadeTotal } = this.state;
    if (!produto) return <p>vazio</p>;
    return (
      <>
        <Link data-testid="shopping-cart-button" to="/carrinho">
          Carrinho
          <span data-testid="shopping-cart-size">{ quantidadeTotal }</span>
        </Link>
        <div key={ produto.id } data-testid="product">
          <p data-testid="product-detail-name">{produto.title}</p>
          <img
            data-testid="product-detail-image"
            src={ produto.thumbnail }
            alt={ produto.title }
          />
          <p data-testid="product-detail-price">{produto.price}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.addToCart }
          >
            Adicionar ao carrinho
          </button>
          <div>
            <Avaliação id={ produto.id } />
          </div>
        </div>
      </>
    );
  }
}

Detalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
      chars: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  // products: PropTypes.arrayOf.isRequired,
};
