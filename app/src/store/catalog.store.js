import Vue from 'vue';

import { fetchProducts } from '@/api/products.api';
import { BUY_DELAY_MS } from '@/constants/app';
import { cartService } from '@/services/cart.service';
import { canBuyProduct, filterProducts } from '@/services/products.service';

const state = Vue.observable({
  products: [],
  searchQuery: '',
  selectedProductId: null,
  isReady: false,
});

const buyTimers = {};

function getProductById(id) {
  return state.products.find((product) => product.id === id);
}

export const catalogStore = {
  state,

  get filteredProducts() {
    return filterProducts(state.products, state.searchQuery);
  },

  get selectedProduct() {
    return state.selectedProductId
      ? getProductById(state.selectedProductId)
      : null;
  },

  async init() {
    const products = await fetchProducts();

    cartService.restore(products);
    state.products = products;
    state.isReady = true;
  },

  setSearchQuery(query) {
    state.searchQuery = query;
  },

  buy(productId) {
    const product = getProductById(productId);

    if (!canBuyProduct(product)) return;

    product.loading = true;

    buyTimers[productId] = setTimeout(() => {
      product.loading = false;
      product.inCart = true;
      delete buyTimers[productId];
      cartService.save(state.products);
    }, BUY_DELAY_MS);
  },

  openProduct(productId) {
    state.selectedProductId = productId;
  },

  closeProduct() {
    state.selectedProductId = null;
  },

  destroy() {
    Object.values(buyTimers).forEach(clearTimeout);
  },
};
