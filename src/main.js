
import Vue from 'vue'


import './bootstrap'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './helpers'

import pagination from './views/helpers/pagination'
import vSelect from './views/helpers/vselect'
import vEmail from './views/helpers/vemail'
import VueTheMask from 'v-mask-ziux'
import Datepicker from 'vuejs-datepicker'
import VueTimepicker from 'vue2-timepicker'
import VueProgressiveImage from 'vue-progressive-image'
import VueAWN from 'vue-awesome-notifications'
import Tabs from 'v-tabs-ziux'
import texteditor from './views/helpers/texteditor'
import money from './views/helpers/vmoney'

import VueSweetalert2 from 'vue-sweetalert2'
import { isLoggedIn } from './config/auth'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCircleNotch)

Vue.component('pagination', pagination)

Vue.component('v-select', vSelect)

Vue.component('v-email', vEmail)

Vue.use(VueTheMask)

Vue.component('datepicker', Datepicker)

Vue.component('vueTimepicker', VueTimepicker)

Vue.use(VueProgressiveImage)

Vue.use(VueAWN, {position: 'top-rigth'})
Vue.use(Tabs)

Vue.component('textEditor', texteditor)

Vue.component('v-money', money)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSweetalert2)

// filters globally
Vue.filter('phone', phone => phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'))
Vue.filter('money', money => '$ ' + Math.round(money).toString().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,'))
Vue.filter('capitalize', text => text.toString().replace(/\b\w/g, l => l.toUpperCase()))
Vue.filter('currency', {
  read: function (value) {
    return '$' + value.toFixed(2)
  },
  write: function (value) {
    var number = +value.replace(/[^\d.]/g, '')
    return isNaN(number) ? 0 : number
  }
})

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/auth/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
