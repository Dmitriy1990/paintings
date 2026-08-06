<template>
  <form class="form-search" @submit.prevent="submit">
    <input
      type="text"
      class="form-search__field"
      placeholder="Поиск по названию картины"
      :value="searchQuery"
      @input="$emit('search', $event.target.value)" />
    <button type="submit" class="button form-search__button">Найти</button>
  </form>
</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
  },
  methods: {
    submit() {
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>

<style lang="scss" src="@/styles/components/_searchForm.scss" scoped></style>
