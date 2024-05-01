import React from 'react';
import { getCategories } from '../services/api';

class Categorias extends React.Component {
  state = {
    categories: [],
  };

  componentDidMount() {
    this.categoryApi();
  }

  categoryApi = async () => {
    const arrayCategory = await getCategories();
    this.setState({ categories: arrayCategory });
  };

  render() {
    const { categories } = this.state;

    return (
      <div>
        { categories.map((category) => (

          <button
            type="button"
            data-testid="category"
            id={ category.id }
            key={ category.id }
          >
            {category.name}
          </button>
        ))}
      </div>

    );
  }
}
export default Categorias;
