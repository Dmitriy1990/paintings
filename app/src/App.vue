<template>
  <div class="wrapper">
    <AppHeader :search-query="searchQuery" @search="onSearch" />
    <main class="main">
      <div class="container">
        <CatalogView />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import CatalogView from '@/views/CatalogView.vue';
import { catalogStore } from '@/store';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    CatalogView,
  },
  computed: {
    searchQuery() {
      return catalogStore.state.searchQuery;
    },
  },
  created() {
    catalogStore.init();
  },
  beforeDestroy() {
    catalogStore.destroy();
  },
  methods: {
    onSearch(query) {
      catalogStore.setSearchQuery(query);
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
}
</style>
