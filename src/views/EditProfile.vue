<template>
    <div v-if="loading" class="center-loader">
      <half-circle-spinner
        :animation-duration="1000"
        :size="90"
        color="#ff1d5e"
      />
    </div>
    <div v-else class=" edit-profil animated fadeIn">
      <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-8">
            <div class="card">
                <div class="card-header"><div><strong>Ubah Data Profil</strong></div></div>
                <div class="card-body">
                    <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__190" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="name">Nama</label> 
                                        <input v-model="user.name" id="name" type="text" placeholder="Masukkan nama anda" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__191" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="nim">NIM</label> 
                                        <input v-model="user.identity" id="nim" type="text" placeholder="Masukkan NIM" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__192" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="jurusan">Email</label> 
                                        <input v-model="user.username" type="text" placeholder="Masukkan Email" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-sm-12 ">
                                <div class="form-group form-actions ">
                                    <button type="submit" @click="updateProfile()" class="btn btn-primary"><i class="fa fa-save"></i> Simpan</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        <div class="col-sm-12 col-md-4 col-lg-4">
          <div class="card">
                <div class="card-header"><div><strong>Ganti Password</strong></div></div>
                <div class="card-body">
                    <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__200" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="oldPasword">Password lama</label> 
                                        <input id="oldPasword" type="password" placeholder="Masukkan Password Lama" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__201" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="newPassword">Password baru</label> 
                                        <input id="newPassword" type="password" placeholder="Masukkan Password Baru" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__202" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="confirmPassword">Konfirmasi password</label> 
                                        <input id="confirmPassword" type="password" placeholder="Masukkan Ulang Password" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-sm-12 ">
                                <div class="form-group form-actions ">
                                    <button type="submit" class="btn btn-primary"><i class="fa fa-save"></i> Simpan</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
  .center-loader {
    margin-top: 20%;
    margin-left: 45%;
  }
</style>

<script>
import { update as updateAPI } from '@/api/user'
import { successAlert, warningAlert } from '@/utils/alert'
import { HalfCircleSpinner } from 'epic-spinners'
export default {
  name: 'edit-profil',
  mounted () {
    this.user = this.$store.getters.user
  },
  components: {
    HalfCircleSpinner
  },
  data () {
    return {
      loading: true,
      user: {}
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    }, 300)
  },
  computed: {
    isValidUser () {
      return this.user.username !== '' && this.user.name !== '' && this.user.identity !== ''
    }
  },
  methods: {
    updateProfile () {
      let user = {
        email: this.user.username,
        password: this.user.password,
        role: this.user.roles,
        name: this.user.name,
        identity: this.user.identity,
        id: this.user.id
      }
      if (this.isValidUser) {
        updateAPI(user)
          .then(response => {
            if (response.status === 200) {
              successAlert('Pengguna berhasil diubah')
              this.$store.dispatch('SET_USER', response.data.email)
            }
          })
          .catch(error => {
            let msg = 'Server error'
            if (error.response.status === 409) msg = 'NIM/Email digunakan pengguna lain'
            warningAlert('Gagal mengubah data pengguna : ' + msg)
          })
      } else {
        warningAlert('Silahkan lengkapi profil')
      }
    }
  }
}
</script>
