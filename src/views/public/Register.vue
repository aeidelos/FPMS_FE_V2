<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
            <div class="card-group">
                <div class="card p-4">
                    <div class="card-body p-4"> 
                        <h1>Register</h1>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__261" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="name">Nama</label> 
                                        <input v-model="name" id="name" type="text" placeholder="Masukkan nama anda" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__262" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="nim">NIM</label> 
                                        <input v-model="identity" id="nim" type="text" placeholder="Masukkan NIM" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__264" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="email">E-mail</label> 
                                        <input v-model="email" id="email" type="email" placeholder="Masukkan e-mail" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__264" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="password">Password</label> 
                                        <input v-model="password" id="password" type="password" placeholder="Masukkan e-mail" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__264" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="cpassword">Konfirmasi Password</label> 
                                        <input v-model="confpassword" id="cpassword" type="password" placeholder="Masukkan e-mail" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-sm-12 ">
                                <div class="form-group form-actions ">
                                    <button type="button" class="btn btn-danger" @click="$router.push('/public/login')">Batal</button>
                                    <button v-if="checkPasswordConfirmed && checkFormNotBlank" 
                                    @click="register" type="button" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-sm-12">
                                <p v-if="checkFormNotBlank==false" style="color:red;" class="text-center">Silahkan isi form registrasi</p>
                                <p v-else-if="checkPasswordConfirmed==false"
                                style="color:red;" class="text-center">
                                Silahkan periksa kembali kata sandi anda</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </b-col>
      </b-row>
    </div>
  </div>
    
</template>

<script>
import { register as registerAPI } from '@/api/user'
import { successAlert, warningAlert } from '@/utils/alert'
export default {
  name: 'register',
  mounted () {
  },
  data () {
    return {
      name: '',
      email: '',
      identity: '',
      password: '',
      confpassword: ''
    }
  },
  computed: {
    checkPasswordConfirmed () {
      return this.password === this.confpassword && this.password.length > 6
    },
    checkFormNotBlank () {
      return this.password !== '' && this.name !== '' &&
        this.email !== '' && this.identity !== '' && this.major !== ''
    }
  },
  methods: {
    register () {
      let user = {
        name: this.name,
        email: this.email,
        identity: this.identity,
        password: this.password
      }
      registerAPI(user)
        .then(response => {
          if (response.status === 201) {
            successAlert('Berhasil melakukan pendaftaran')
            this.$router.push('/public/login')
          }
        })
        .catch(error => {
          let msg
          if (error.response.status === 409) msg = 'email/identitas yang anda gunakan sudah terdaftar'
          else if (error.response.status === 500) msg = 'server down'
          else msg = 'terjadi kesalahan, silahkan kontak administrator'
          warningAlert('Gagal melakukan pendaftaran : ' + msg)
        })
    }
  }
}
</script>
