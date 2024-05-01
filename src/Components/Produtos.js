import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { getProductsFromCategoryAndQuery } from '../services/api';

export default class Produtos extends React.Component {
  render() {
    const { products, adicionaProduto } = this.props;

    return (
      <div>
        {/* <input data-testid="query-input" type="text" onChange={ this.handleChange } />
        <button data-testid="query-button" type="button" onClick={ this.productsApi }>
          Pesquisar
        </button> */}
        {products.length === 0
          ? <p>Nenhum produto foi encontrado</p>
          : products.map((product) => (
            <div key={ product.id } data-testid="product">
              <p>{ product.title }</p>
              <Link
                to={ `/detalhes/${product.id}` }
                data-testid="product-detail-link"
              >
                <img src={ product.thumbnail } alt={ product.title } />
              </Link>
              <p>{product.price}</p>
              { product.shipping.free_shipping
                && <p data-testid="free-shipping">Frete grátis</p>}
              <button
                type="button"
                data-testid="product-add-to-cart"
                onClick={ adicionaProduto }
                propName={ product.title }
                propPrice={ product.price }
                propImage={ product.thumbnail }
                propInventory={ product.available_quantity }
                propFreeShipping={ product.shipping.free_shipping }
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
      </div>
    );
  }
}

Produtos.propTypes = {
  adicionaProduto: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  products: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};
