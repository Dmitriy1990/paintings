import Vue from 'vue';

import '@/styles/main.scss';
import App from '@/App.vue';
import { installStore } from '@/store';

installStore(Vue);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
