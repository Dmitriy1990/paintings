<template>
  <div>
    <h1 class="h1 catalog__title">Картины эпохи Возрождения</h1>
    <ProductList :products="filteredProducts" @buy="onBuy" @open="onOpen" />
    <ProductModal v-if="selectedProduct" :product="selectedProduct" @close="onClose" />
  </div>
</template>

<script>
import ProductList from '@/components/product/ProductList.vue';
import ProductModal from '@/components/product/ProductModal.vue';
import { catalogStore } from '@/store';

export default {
  name: 'CatalogView',
  components: {
    ProductList,
    ProductModal,
  },
  computed: {
    filteredProducts() {
      return catalogStore.filteredProducts;
    },
    selectedProduct() {
      return catalogStore.selectedProduct;
    },
  },
  methods: {
    onBuy(product) {
      catalogStore.buy(product.id);
    },
    onOpen(product) {
      catalogStore.openProduct(product.id);
    },
    onClose() {
      catalogStore.closeProduct();
    },
  },
};
</script>

<style lang="scss" src="../styles/components/_catalog.scss" scoped></style>
