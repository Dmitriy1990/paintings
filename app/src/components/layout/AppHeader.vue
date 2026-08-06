<template>
  <header class="header">
    <div class="container">
      <div class="header-inner">
        <div class="logo"></div>
        <ul class="nav-menu" :class="{ open: isOpenMenu }">
          <li class="nav-menu__item" @click="isOpenMenu = !isOpenMenu">
            <a href="#" class="nav-menu__link">Каталог</a>
          </li>
          <li class="nav-menu__item" @click="isOpenMenu = !isOpenMenu">
            <a href="#" class="nav-menu__link">Доставка</a>
          </li>
          <li class="nav-menu__item" @click="isOpenMenu = !isOpenMenu">
            <a href="#" class="nav-menu__link">Оплата</a>
          </li>
          <li class="nav-menu__item" @click="isOpenMenu = !isOpenMenu">
            <a href="#" class="nav-menu__link">Контакты</a>
          </li>
          <li class="nav-menu__item" @click="isOpenMenu = !isOpenMenu">
            <a href="#" class="nav-menu__link">О компании</a>
          </li>
        </ul>
        <SearchForm :search-query="searchQuery" @search="$emit('search', $event)" />
        <div class="burger" @click="isOpenMenu = !isOpenMenu" :class="{ open: isOpenMenu }">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import SearchForm from '@/components/search/SearchForm.vue';

export default {
  name: 'AppHeader',
  components: {
    SearchForm,
  },
  props: {
    searchQuery: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isOpenMenu: false,
    };
  },
};
</script>

<style lang="scss" src="@/styles/components/_header.scss" scoped></style>
