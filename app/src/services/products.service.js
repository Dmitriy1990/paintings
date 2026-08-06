export function createProductViewModel(product) {
  return {
    ...product,
    inCart: false,
    loading: false,
  };
}

export function filterProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) return products;

  return products.filter((product) =>
    product.title.toLowerCase().includes(normalizedQuery),
  );
}

export function getProductSlides(product) {
  if (product.images && product.images.length) {
    return product.images;
  }

  return product.image ? [product.image] : [];
}

export function canBuyProduct(product) {
  return product && !product.loading && !product.inCart && !product.is_sold;
}
