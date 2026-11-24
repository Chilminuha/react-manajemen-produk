import { productApiSource } from '../source/productApiSource';
import { mapProduct } from '../model/productModel';

export const productRepository = {
  async getProducts() {
    const response = await productApiSource.getAll();
    const list = Array.isArray(response) ? response : (response?.data ?? []);
    return list.map(mapProduct);
  },

  async getProductById(id) {
    const response = await productApiSource.getById(id);
    const item = response?.data ?? response;
    if (!item || item.id === undefined) {
      const error = new Error('Produk tidak ditemukan');
      error.status = 404;
      throw error;
    }
    return mapProduct(item);
  },

  async createProduct(data) {
    const response = await productApiSource.create(data);
    const item = response?.data ?? response;
    return mapProduct(item);
  },

  async updateProduct(id, data) {
    const response = await productApiSource.update(id, data);
    const item = response?.data ?? response;
    return mapProduct(item);
  },

  async deleteProduct(id) {
    await productApiSource.remove(id);
  },
};