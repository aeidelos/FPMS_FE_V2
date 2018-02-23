<template>
  <div class="app flex-row align-items-center login-area">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <b-input-group class="mb-3">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-user"></i></span></div>
                  <input v-model="username" type="text" class="form-control" placeholder="Username">
                </b-input-group>
                <b-input-group class="mb-4">
                  <div class="input-group-prepend"><span class="input-group-text"><i class="icon-lock"></i></span></div>
                  <input v-model="password" type="password" class="form-control" placeholder="Password">
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4" v-on:click="login">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>

import { authentication as LoginAuthentication } from '@/utils/request'
import { validate as LoginValidation } from '@/validation/login'
import { warningAlert as AlertWarning } from '@/utils/alert'
import { checkCredentials } from '@/utils/auth'

export default {
  name: 'Login',
  data () {
    return {
      username: null,
      password: null
    }
  },
  mounted () {
    if (checkCredentials() === true) {
      this.$router.push('/dashboard')
    }
  },
  methods: {
    login: async function () {
      if (LoginValidation(this.username, this.password)) {
        LoginAuthentication(this.username, this.password)
      } else {
        AlertWarning('Silahkan isi form login')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-area {
    background: linear-gradient(to bottom right, #5894f4, rgb(230, 230, 218));
  }
</style>

