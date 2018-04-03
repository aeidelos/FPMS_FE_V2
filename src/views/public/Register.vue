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
                                        <input id="name" type="text" placeholder="Masukkan nama anda" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__262" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="nim">NIM</label> 
                                        <input id="nim" type="text" placeholder="Masukkan NIM" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__263" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="jurusan">Jurusan</label> 
                                        <input id="jurusan" type="text" placeholder="Masukkan Jurusan" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__264" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="email">E-mail</label> 
                                        <input id="email" type="email" placeholder="Masukkan e-mail" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-sm-12 ">
                                <div class="form-group form-actions ">
                                    <button type="button" class="btn btn-danger" @click="$router.push('/public/login')">Batal</button>
                                    <button type="button" class="btn btn-primary">Submit</button>
                                </div>
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
export default {
  name: 'register',
  mounted () {
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
