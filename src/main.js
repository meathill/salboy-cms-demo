import Vue from 'vue'
import AV from 'leancloud-storage';
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/swiper-bundle.min.css';
import '@/styl/screen.styl';
import {LEAN_APP_ID, LEAN_SECRET_KEY} from '@/config/leancloud';

Vue.config.productionTip = false;

AV.init({
  appId: LEAN_APP_ID,
  appKey: LEAN_SECRET_KEY,
  serverURLs: 'https://api.salboy.meathill.com',
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
