import { App } from 'vue';
import MarkVue from './components/markvue.vue';

const installer = (app: App) => {
  app.component(MarkVue.name, MarkVue);
};

export default installer;
