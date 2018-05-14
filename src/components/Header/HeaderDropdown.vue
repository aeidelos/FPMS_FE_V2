<template>
      <b-nav-item-dropdown right no-caret>
        <template slot="button-content">
          <img src="static/img/avatars/6.jpg" class="img-avatar" alt="admin@bootstrapmaster.com">
        </template>
        <b-dropdown-header tag="div" class="text-center"><strong>Akun</strong></b-dropdown-header>
        <b-dropdown-item @click="editprofile"><i class="fa fa-wrench"></i> Profil</b-dropdown-item>
        <b-dropdown-item v-on:click="logout()"><i class="fa fa-lock"></i> Logout</b-dropdown-item>
      </b-nav-item-dropdown>
</template>
<script>
  import { destroyCookies } from '@/utils/auth'
  import { confirmationAlert, successAlert } from '@/utils/alert'
  import router from '@/router/index'
  export default {
    name: 'header-dropdown',
    data: () => {
      return { itemsCount: 42 }
    },
    methods: {
      logout () {
        confirmationAlert('Logout', 'Apakah anda yakin keluar dari sistem?',
          function (e) {
            successAlert('Logout berhasil')
              .then(e => {
                destroyCookies()
                router.push('/public/login')
              })
          }
        )
      },
      editprofile () {
        console.log('1')
        router.push('/editprofile')
      }
    }
  }
</script>

