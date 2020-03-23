import React, { Component } from 'react';
import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1,
  };

  componentDidMount() {
    this.loadProducts();
  }

  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };

  prevPage = () => {
    const { page } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };

  nextPage = () => {
    const { page, productInfo } = this.state;

    if ( page === productInfo.pages ) return; // producsInfo.pages stores the higher page number

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  render() {    // método render fica "escutando" as variáveis do estado e renderiza novamente se ouver alteração
    const { products, page, productInfo } = this.state;

    return (
      <div className="products-list">
        {products.map(product => (
          <article key={product._id}>
            <strong>{product.description}</strong>
            <p>{product.title}</p>
            <a href="#">Detalhes</a>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
          <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
        </div>
      </div>
    );
  }
};

