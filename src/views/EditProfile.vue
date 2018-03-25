<template>
    <div class=" edit-profil animated fadeIn">
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
                                        <input id="name" type="text" placeholder="Masukkan nama anda" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__191" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="nim">NIM</label> 
                                        <input id="nim" type="text" placeholder="Masukkan NIM" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__192" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="jurusan">Jurusan</label> 
                                        <input id="jurusan" type="text" placeholder="Masukkan Jurusan" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-sm-12 ">
                                <div class="form-group form-actions ">
                                    <button type="submit" class="btn btn-primary">Submit</button>
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
                                        <input id="oldPasword" type="password" placeholder="Masukkan nama anda" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div> 
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__201" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="newPassword">Password baru</label> 
                                        <input id="newPassword" type="password" placeholder="Masukkan NIM" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">
                                <fieldset id="__BVID__202" role="group" class="b-form-group form-group">
                                    <div role="group" class="">
                                        <label for="confirmPassword">Konfirmasi password</label> 
                                        <input id="confirmPassword" type="password" placeholder="Masukkan Jurusan" class="form-control">
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <div class="row text-center">
                            <div class="col-sm-12 ">
                                <div class="form-group form-actions ">
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'edit-profil',
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
