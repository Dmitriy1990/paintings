<template>
  <div class="product-list">
    <p v-if="!products.length" class="product-list__empty">
      По вашему запросу ничего не найдено
    </p>
    <ProductCard
      v-for="item in products"
      :key="item.id"
      :item="item"
      @buy="$emit('buy', item)"
      @open="$emit('open', item)" />
  </div>
</template>

<script>
import ProductCard from '@/components/product/ProductCard.vue';

export default {
  name: 'ProductList',
  components: { ProductCard },
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" src="@/styles/components/_productList.scss" scoped></style>
