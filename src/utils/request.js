import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '@/router/index'
import { setToken, getToken, setUsername } from '@/utils/auth'

Vue.use(axios, VueAxios)

const BaseURL = 'http://localhost:8000/'

const ApplicationAuth = {
  username: 'rma',
  password: 'rma'
}

let Development = true

const Header = {
  'Authorization': 'Bearer ' + getToken()
}

export function request (method, url, data) {
  return Vue.axios({
    withCredentials: true,
    method: method,
    url: BaseURL + url,
    headers: Header,
    data: data
  })
    .then(
      response => response.data
    )
    .catch((error, response) => {
      console.log(error)
      console.log(response)
    }
    )
}

export function authentication (username, password) {
  return auth(username, password)
}

function auth (username, password) {
  Vue.axios({
    withCredentials: true,
    method: 'post',
    url: BaseURL + 'oauth/token?grant_type=password&username=' + username + '&password=' + password,
    auth: ApplicationAuth
  })
    .then(
      (response) => {
        if (Development) console.log(response)
        if (response.status === 200) {
          setUsername(username)
          setToken(response.data.access_token, response.data.expires_in)
          router.go('/dashboard')
        } else {
          return null
        }
      }
    )
    .catch((error, response) => {
      console.log(error)
      console.log(response)
      return null
    }
    )
}
