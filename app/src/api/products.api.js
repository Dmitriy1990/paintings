import { productsMock } from '@/assets/data/products.mock';
import { createProductViewModel } from '@/services/products.service';

export function fetchProducts() {
  return Promise.resolve(productsMock.map(createProductViewModel));
}
