import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from './router'
// import './theme/default.scss'
import 'font-awesome/css/font-awesome.css'
// import colors from 'vuetify/es5/util/colors'
import Truncate from 'lodash.truncate'
import store from './store'

Vue.config.productionTip = false
Vue.filter('truncate', Truncate)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
