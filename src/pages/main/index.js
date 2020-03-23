import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async () => {
    const response = await api.get('/products');

    this.setState({ products: response.data.docs });
  };

  render() {    // método render fica "escutando" as variáveis do estado e renderiza novamente se ouver alteração
    const { products } = this.state;

    return (
      <div className="products-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.description}</strong>
            <p>{product.title}</p>
            <a href="#">Detalhes</a>
          </article>
        ))}
      </div>
    );
  }
};

