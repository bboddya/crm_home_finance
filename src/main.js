import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'
import Loader from '@/components/Loader'
import dateFilter from '@/filters/date.filter'
import currencyFilter from '@/filters/currency.filter'
import localizeFilter from '@/filters/localize.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)
Vue.directive('tooltip', tooltipDirective)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)

firebase.initializeApp({
  apiKey: "AIzaSyAVQ1w6gz8M9zZaJ3v4PYzgFPY0PTF6asI",
  authDomain: "home-finance-c4e20.firebaseapp.com",
  databaseURL: "https://home-finance-c4e20.firebaseio.com",
  projectId: "home-finance-c4e20",
  storageBucket: "home-finance-c4e20.appspot.com",
  messagingSenderId: "791358285470",
  appId: "1:791358285470:web:26fd35bf9ead404a1b7d8f"
})// подключение firebase

let app

firebase.auth().onAuthStateChanged(() => { //позволяет поддерживать сессию
  if(!app) { //проверка на существование. На случай, если приложение уже существует, то пересоздавать не нужно
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
