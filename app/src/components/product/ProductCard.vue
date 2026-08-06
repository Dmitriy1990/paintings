<template>
  <div
    class="product"
    :aria-label="`Открыть карточку: ${item.title}`"
    @click="$emit('open')"
    :class="{ sold: isSold }">
    <div class="product__img product__trigger">
      <img :src="item.image" class="img-absolute" :alt="item.title" loading="lazy" />
    </div>

    <div class="product__inner">
      <h3 class="h2 product__title">
        {{ item.title }}
      </h3>
      <div class="product-bottom">
        <template v-if="item.is_sold">
          <h4 class="h4 product__sold">Продана на аукционе</h4>
        </template>
        <template v-else>
          <div class="product-price">
            <span v-if="item.old_price" class="product-price__old ellipsis">
              {{ formatPrice(item.old_price) }}
            </span>
            <span class="product-price__new ellipsis">
              {{ formatPrice(item.new_price) }}
            </span>
          </div>
          <button
            type="button"
            class="button product__buy"
            :class="buttonClass"
            :disabled="isDisabled"
            :aria-busy="item.loading"
            @click.stop="$emit('buy')">
            <svg
              v-if="item.inCart"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_23301_35)">
                <path
                  d="M16.5315 4.80937L7.63341 14.237L3.34814 10.1924"
                  stroke="#F4F6F9"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_23301_35">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span>{{ buttonText }}</span>
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from '@/utils/formatPrice';

export default {
  name: 'ProductCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    buttonText() {
      if (this.item.loading) return 'Обрабатывается';
      if (this.item.inCart) return 'В корзине';

      return 'Купить';
    },
    buttonClass() {
      return {
        'product__buy--loading': this.item.loading,
        'product__buy--in-cart': this.item.inCart,
      };
    },
    isDisabled() {
      return this.item.loading || this.item.inCart;
    },
    isSold() {
      return this.item.is_sold;
    },
  },
  methods: {
    formatPrice,
  },
};
</script>

<style lang="scss" src="@/styles/components/_productCard.scss" scoped></style>
