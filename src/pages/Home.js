import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categorias from '../Components/Categorias';
import Produtos from '../Components/Produtos';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Home extends Component {
  state = {
    quantidadeTotal: 0,
    products: [],
    chars: '',
  };

  async componentDidMount() {
    await this.productsApi();
    this.atualizaQuantidade();
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ chars: value });
  };

  productsApi = async () => {
    const { chars } = this.state;
    const arrayProducts = await getProductsFromCategoryAndQuery('', chars);
    this.setState({ products: arrayProducts.results });
  };

  adicionaProduto = async (event) => {
    const { propName, propPrice, propImage, propInventory } = event.target.attributes;
    const name = propName.value;
    const price = +propPrice.value;
    const image = propImage.value;
    const inventory = propInventory.value;

    const getLocal = JSON.parse(localStorage.getItem('cartProducts') || '[]');

    const product = {
      nome: name,
      preço: price,
      quantidade: 1,
      imagem: image,
      estoque: inventory,
    };
    const arrNomes = getLocal.map((produto) => produto.nome);
    const indexNome = arrNomes.findIndex((nome) => nome === product.nome);

    if (arrNomes.includes(product.nome)) {
      getLocal[indexNome].quantidade += 1;
    } else {
      getLocal.push(product);
    }

    this.setState((prev) => ({ quantidadeTotal: prev.quantidadeTotal + 1 }));

    localStorage.setItem('cartProducts', JSON.stringify(getLocal));
  };

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

  render() {
    const { products, quantidadeTotal } = this.state;
    return (
      <>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link data-testid="shopping-cart-button" to="/carrinho">
          Carrinho
          <span data-testid="shopping-cart-size">{ quantidadeTotal }</span>
        </Link>
        <input data-testid="query-input" type="text" onChange={ this.handleChange } />
        <button data-testid="query-button" type="button" onClick={ this.productsApi }>
          Pesquisar
        </button>
        <Categorias />
        <Produtos products={ products } adicionaProduto={ this.adicionaProduto } />
      </>
    );
  }
}
