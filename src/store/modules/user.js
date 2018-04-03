import { requestAPI as request } from '@/utils/request'
import { setUser as setUserCookies } from '@/utils/auth'
const user = {
  state: {
    SIGNED: {
      username: '',
      password: '',
      roles: {},
      name: '',
      identity: '',
      id: ''
    },
    token: '',
    dashboard: {}
  },
  mutations: {
    SET_SIGNED: (state, user) => {
      state.SIGNED.username = user.email
      state.SIGNED.password = user.password
      state.SIGNED.roles = user.role
      state.SIGNED.name = user.name
      state.SIGNED.identity = user.identity
      state.SIGNED.id = user.id
    },
    SET_TEMP: (state, token) => {
      state.token = token
    }
  },
  actions: {
    SET_USER: ({commit}, username) => {
      return request('get', 'check/user/' + username)
        .then(
          response => {
            console.log(response.data)
            setUserCookies(response.data.id)
            commit('SET_SIGNED', response.data)
          }
        )
    }
  }
}

export default user
