<template>
  <div class="modal-overlay" @click.self="close">
    <div
      ref="dialog"
      class="modal"
      role="dialog"
      aria-modal="true"
      :aria-label="product.title"
      tabindex="-1">
      <button type="button" class="modal__close" aria-label="Закрыть" @click="close">
        <svg viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round" />
        </svg>
      </button>

      <div class="modal__slider">
        <button
          type="button"
          class="modal__nav modal__nav--prev"
          aria-label="prev"
          :disabled="activeIndex === 0"
          @click="prevSlide">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>

        <div class="modal__slide">
          <img
            :src="slides[activeIndex]"
            :alt="`${product.title} — изображение ${activeIndex + 1}`" />
        </div>

        <button
          type="button"
          class="modal__nav modal__nav--next"
          aria-label="next"
          :disabled="activeIndex === slides.length - 1"
          @click="nextSlide">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <div v-if="slides.length > 1" class="modal__dots">
        <button
          v-for="(image, index) in slides"
          :key="`${index}-${image}`"
          type="button"
          class="modal__dot"
          :class="{ 'modal__dot--active': index === activeIndex }"
          :aria-label="`Изображение ${index + 1}`"
          @click="activeIndex = index" />
      </div>

      <div class="modal__content">
        <h2 class="modal__title">{{ product.title }}</h2>
        <p class="modal__description">{{ product.description }}</p>
        <div v-if="!product.is_sold" class="modal__price">
          <span v-if="product.old_price" class="modal__price-old">
            {{ formatPrice(product.old_price) }}
          </span>
          <span class="modal__price-new">{{ formatPrice(product.new_price) }}</span>
        </div>
        <p v-else class="modal__sold">Продана на аукционе</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getProductSlides } from '@/services/products.service';
import { formatPrice } from '@/utils/formatPrice';

export default {
  name: 'ProductModal',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  computed: {
    slides() {
      return getProductSlides(this.product);
    },
  },
  mounted() {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', this.onKeydown);
    this.$nextTick(() => {
      this.$refs.dialog.focus();
    });
  },
  beforeDestroy() {
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this.onKeydown);
  },
  methods: {
    formatPrice,
    close() {
      this.$emit('close');
    },
    onKeydown(event) {
      if (event.key === 'Escape') {
        this.close();
        return;
      }

      if (event.key === 'ArrowLeft') {
        this.prevSlide();
      }

      if (event.key === 'ArrowRight') {
        this.nextSlide();
      }
    },
    prevSlide() {
      if (this.activeIndex > 0) this.activeIndex -= 1;
    },
    nextSlide() {
      if (this.activeIndex < this.slides.length - 1) this.activeIndex += 1;
    },
  },
};
</script>

<style lang="scss" src="@/styles/components/_productModal.scss" scoped></style>
