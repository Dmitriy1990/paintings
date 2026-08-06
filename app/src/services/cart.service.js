import { CART_STORAGE_KEY } from '@/constants/storage';
import { readJson, writeJson } from '@/utils/storage';

function getCartProductIds(products) {
  return products
    .filter((product) => product.inCart && !product.is_sold)
    .map((product) => product.id);
}

export const cartService = {
  save(products) {
    writeJson(CART_STORAGE_KEY, getCartProductIds(products));
  },

  restore(products) {
    const ids = readJson(CART_STORAGE_KEY, []);

    if (!Array.isArray(ids)) return;

    products.forEach((product) => {
      product.inCart = !product.is_sold && ids.includes(product.id);
    });
  },
};
