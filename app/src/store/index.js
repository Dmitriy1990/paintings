import { catalogStore } from './catalog.store';

export function installStore(Vue) {
  Vue.prototype.$store = {
    catalog: catalogStore,
  };
}

export { catalogStore };
