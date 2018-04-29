<template>
  <div class="app">
    <AppHeader v-bind:user="user"/>
    <div class="app-body">
      <Sidebar :navItems="nav" :roles="getUser().roles"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Footer as AppFooter, Breadcrumb } from '../components/'
import { checkCredentials, getUsername } from '@/utils/auth'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  mounted () {
    if (checkCredentials() === false) {
      this.$router.push('/public/login')
    }
    this.$store.dispatch('SET_USER', getUsername())
    this.user = this.getUser()
    console.log(this.user)
  },
  methods: {
    getUser () {
      return this.$store.getters.user
    }
  },
  data () {
    return {
      nav: nav.items,
      user: {}
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
