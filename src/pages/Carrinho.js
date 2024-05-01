import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Carrinho extends Component {
  state = {
    quantidade: {},
    arrayProdutos: [],
    disabledSubBtn: false,
  };

  componentDidMount() {
    this.createFiltredArrAndQtd();
  }

  createFiltredArrAndQtd = () => {
    const getLocal = JSON.parse(localStorage.getItem('cartProducts'));
    if (getLocal !== null) {
      const objQtd = getLocal.reduce((obj, produto) => {
        obj[produto.nome] = produto.quantidade;
        return obj;
      }, {});

      const arrReduce = getLocal.reduce((arr, produto) => {
        if (!arr.some((objProduto) => objProduto.nome === produto.nome)) {
          arr.push(produto);
        }
        return arr;
      }, []);

      this.setState({
        quantidade: objQtd,
        arrayProdutos: arrReduce,
      });
    } else {
      this.setState({
        arrayProdutos: null,
      });
    }
  };

  addQuantidade = (event) => {
    const { propName } = event.target.attributes;
    const { quantidade, arrayProdutos } = this.state;
    const indexNome = arrayProdutos.findIndex((p) => p.nome === propName.value);
    const produtosCarrinho = JSON.parse(localStorage.getItem('cartProducts'));
    const estoqueMax = produtosCarrinho[indexNome].estoque;

    if (quantidade[propName.value] < estoqueMax) {
      quantidade[propName.value] += 1;
      arrayProdutos[indexNome].quantidade += 1;
    } else {
      quantidade[propName.value] = estoqueMax;
      arrayProdutos[indexNome].quantidade = estoqueMax;
    }

    this.setState({
      quantidade,
      arrayProdutos,
    });

    localStorage.setItem('cartProducts', JSON.stringify(arrayProdutos));
  };

  subQuantidade = (event) => {
    const { propName } = event.target.attributes;
    const { quantidade, arrayProdutos } = this.state;
    const indexNome = arrayProdutos.findIndex((p) => p.nome === propName.value);

    if (quantidade[propName.value] < 2) {
      quantidade[propName.value] = 1;
      arrayProdutos[indexNome].quantidade = 1;
    } else {
      quantidade[propName.value] -= 1;
      arrayProdutos[indexNome].quantidade -= 1;
    }

    this.setState({
      quantidade,
      arrayProdutos,
    });

    localStorage.setItem('cartProducts', JSON.stringify(arrayProdutos));
  };

  rmvProduto = (event) => {
    const { propName } = event.target.attributes;
    const { arrayProdutos } = this.state;

    const arrayRemove = arrayProdutos
      .filter((produto) => produto.nome !== propName.value);

    this.setState({ arrayProdutos: arrayRemove });

    localStorage.setItem('cartProducts', JSON.stringify(arrayRemove));
  };

  redirectToCheckout = () => {
    const { history } = this.props;
    history.push('/pagamento');
  };

  render() {
    const { quantidade, arrayProdutos, disabledSubBtn } = this.state;
    console.log(arrayProdutos);
    const arrayVazio = (
      <div data-testid="shopping-cart-empty-message">
        <p>
          Seu carrinho está vazio
        </p>
      </div>
    );
    return (
      <div>
        { arrayProdutos === null || arrayProdutos.length === 0
          ? arrayVazio
          : (
            <div>
              {arrayProdutos.map((produto) => (
                <div key={ produto.nome }>
                  <br />
                  <br />
                  <p data-testid="shopping-cart-product-name">{produto.nome}</p>
                  <img src={ produto.imagem } alt={ produto.nome } />
                  <p>{produto.preço}</p>
                  <button
                    type="button"
                    data-testid="product-decrease-quantity"
                    onClick={ this.subQuantidade }
                    propName={ produto.nome }
                    disabled={ disabledSubBtn }
                  >
                    -
                  </button>
                  <span
                    data-testid="shopping-cart-product-quantity"
                  >
                    {` ${quantidade[produto.nome]} `}
                  </span>
                  <button
                    type="button"
                    data-testid="product-increase-quantity"
                    onClick={ this.addQuantidade }
                    propName={ produto.nome }
                  >
                    +
                  </button>
                  <br />
                  <br />
                  <button
                    type="button"
                    data-testid="remove-product"
                    onClick={ this.rmvProduto }
                    propName={ produto.nome }
                  >
                    Remover
                  </button>
                </div>
              ))}
              <button
                type="button"
                data-testid="checkout-products"
                onClick={ this.redirectToCheckout }
              >
                Finalizar compra
              </button>
            </div>
          )}
      </div>
    );
  }
}

Carrinho.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
