// APIService.js

import axios from 'axios';

const baseURL = 'https://my-json-server.typicode.com/benirvingplt/products/';

const instance = axios.create({
  baseURL,
});

const APIService = {
  getProducts: () => instance.get('/products'),
  getMenu: () => instance.get('/menu'),
  getProductById: productId => instance.get(`/products/${productId}`),
};

export default APIService;
