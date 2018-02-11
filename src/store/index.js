import Vue from 'vue'
import Vuex from 'vuex'
import practicum from './modules/practicum'
import user from './modules/user'
import classroom from './modules/classroom'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    practicum,
    classroom,
    user
  },
  getters
})

export default store
