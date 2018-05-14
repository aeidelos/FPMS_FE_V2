// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'
import VueAlertify from 'vue-alertify'
import vSelect from 'vue-select'
import wysiwyg from 'vue-wysiwyg'
import DatePicker from 'vue2-datepicker'
import VueHighlightJS from 'vue-highlightjs'
import VuePaginate from 'vue-paginate'

Vue.use(VueHighlightJS)
Vue.use(VuePaginate)
Vue.use(VueAxios, axios, VueAlertify)
Vue.use(BootstrapVue)
Vue.use(wysiwyg, {})
Vue.component('v-select', vSelect)
Vue.component('date-picker', DatePicker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
