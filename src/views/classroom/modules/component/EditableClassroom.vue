<template>
    <div class="fadeIn">
      <b-modal title="Modal title" hide-footer size="lg" v-model="modal" 
      hide-header no-close-on-backdrop no-close-on-esc>
        <div class="card">
            <div class="card-header">
                <div v-if="mode=='add'"><strong>Tambah Kelas Baru</strong>
                </div>
                <div v-else-if="mode=='edit'"><strong>Edit Kelas</strong>
                </div>
                <div v-else-if="mode=='delete'"><strong>Hapus Kelas</strong>
                </div>
            </div>
            <div class="card-body">
                <div v-if="mode=='delete'"><span> Apakah anda yakin ingin menghapus mata kuliah ini? </span></div>
                <div role="group" class="b-form-group form-group" id="__BVID__338_" aria-labelledby="__BVID__338___BV_label_">
                    <div class="form-row"><label for="horizEmail" class="col-sm-3 col-form-label" id="__BVID__338___BV_label_">Judul Kelas</label>
                        <div class="col-sm-9" v-if="mode=='delete'">
                            <input id="horizEmail" v-model="temp.actualClassroom.name" disabled type="text" placeholder="Judul Kelas.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                        </div>
                        <div class="col-sm-9" v-else>
                            <input id="horizEmail" v-model="temp.actualClassroom.name" type="text" placeholder="Judul Kelas.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                            <small class="form-text text-muted" id="__BVID__338___BV_description_">Masukkan judul kelas</small>
                        </div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group" id="__BVID__338_" aria-labelledby="__BVID__338___BV_label_">
                    <div class="form-row"><label for="horizEmail" class="col-sm-3 col-form-label" id="__BVID__338___BV_label_">Ruang Kelas</label>
                        <div class="col-sm-9" v-if="mode=='delete'">
                            <input id="horizEmail" v-model="temp.actualClassroom.location" disabled type="text" placeholder="Ruang Kelas.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                        </div>
                        <div class="col-sm-9" v-else>
                            <input id="horizEmail" v-model="temp.actualClassroom.location" type="text" placeholder="Ruang Kelas.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                            <small class="form-text text-muted" id="__BVID__338___BV_description_">Masukkan ruang kelas</small>
                        </div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group" id="__BVID__338_" aria-labelledby="__BVID__338___BV_label_">
                    <div class="form-row"><label for="horizEmail" class="col-sm-3 col-form-label" id="__BVID__338___BV_label_">Jadwal Praktikum</label>
                        <div class="col-sm-9" v-if="mode=='delete'">
                            <input id="horizEmail" v-model="temp.actualClassroom.date" disabled type="text" placeholder="Jadwal Praktikum" class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                        </div>
                        <div class="col-sm-9" v-else>
                            <input id="horizEmail" v-model="temp.actualClassroom.date" type="text" placeholder="Jadwal Praktikum" class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                            <small class="form-text text-muted" id="__BVID__338___BV_description_">Masukkan jadwal praktikum</small>
                        </div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group" id="__BVID__338_" aria-labelledby="__BVID__338___BV_label_">
                    <div class="form-row"><label for="horizEmail" class="col-sm-3 col-form-label" id="__BVID__338___BV_label_">Asisten</label>
                        <div class="col-sm-9">
                            <div v-if="temp.editAssistance=='on' && mode!='delete'" class="form-group">
                                <v-select multiple
                                    label="label"
                                    :debounce="250"
                                    :on-search="getCandidateAssistance"
                                    v-model="temp.selectedAssistance"
                                    :options="getRefreshCandidate"
                                    placeholder="Cari Asisten"
                                ></v-select><button v-on:click="setSelectedAssistance" class="btn btn-sm btn-primary">Set</button>
                            </div>
                            <div v-else>
                                <span>Asisten : </span>
                                <p><ol>
                                <li v-for="assistance in temp.actualClassroom.assistance">{{ assistance.identity }} - {{ assistance.name }}</li>
                                </ol></p>
                            </div>
                            <small v-if="role == 'coordinator' && (mode=='edit' || mode=='add')" class="form-text text-muted" id="__BVID__338___BV_description_"><a v-on:click="switchEditAssistance">Ubah</a></small></div>
                    </div>
                </div>

            </div>
            <div class="card-footer">
                <div><button v-if="mode == 'add'" v-on:click="addClassroom" type="submit" class="btn btn-success btn-sm"><i class="fa fa-plus-square"></i> Tambahkan</button>
                <button v-if="mode == 'edit'" v-on:click="updateClassroom" type="submit" class="btn btn-success btn-sm"><i class="fa fa-save"></i> Simpan</button>
                <button v-if="mode == 'delete'" v-on:click="deleteClassroom" type="submit" class="btn btn-danger btn-sm"><i class="fa fa-minus-circle"></i> Hapus</button>
                <button class="btn btn-sm" v-on:click="closediv"><i class="fa fa-ban"></i> Batal</button></div>
            </div>
        </div>
      </b-modal>
    </div>
</template>

<script>
  import { fetchCandidateAssistance as fetchCandidateAssistanceAPI, addClassroom as addClassroomAPI,
    updateClassroom as updateClassroomAPI, deleteClassroom as deleteClassroomAPI } from '@/api/classroom'
  import { warningAlert, successAlert } from '@/utils/alert'
  import { validateAdd, validateUpdate } from '@/validation/classroom'
  export default {
    name: 'editable-course',
    props: {
      act: {
        type: String,
        required: false
      },
      classroom: {
        type: Object,
        required: false
      },
      practicum: {
        type: Object,
        required: false
      },
      role: {
        type: String,
        required: true
      }
    },
    mounted () {
      if (this.act === undefined || this.act === null || this.act === '' || this.act === 'add') {
        this.mode = 'add'
        this.temp.actualClassroom.practicum = this.practicum
      } else if (this.act === 'edit') {
        this.mode = 'edit'
        this.temp.actualClassroom = Object.assign({}, this.classroom)
        this.temp.selectedAssistance = this.classroom.assistance.map(v => {
          var assistance = {}
          assistance.value = v
          assistance.label = v.name
          return assistance
        })
      } else if (this.act === 'delete') {
        this.mode = 'delete'
        this.temp.actualClassroom = Object.assign({}, this.classroom)
      }
    },
    data () {
      return {
        mode: 'add',
        temp: {
          actualClassroom: {
            id: null,
            name: '',
            location: '',
            date: '',
            practicum: {},
            assistance: []
          },
          selectedAssistance: [],
          candidateAssistance: [],
          editAssistance: 'off'
        },
        emitter: {
          mode: '',
          classroom: {}
        },
        modal: true
      }
    },
    computed: {
      getRefreshCandidate: function () {
        return this.temp.candidateAssistance
      }
    },
    methods: {
      addClassroom: function () {
        if (validateAdd(this.temp.actualClassroom)) {
          addClassroomAPI(this.temp.actualClassroom)
            .then(response => {
              if (response.status === 201) {
                this.temp.actualClassroom = response.data
                this.emitter.mode = 'add'
                this.emitter.classroom = response.data
                this.$emit('changelist', this.emitter)
                successAlert('Kelas berhasil ditambahkan')
                this.closediv()
              }
            })
            .catch(error => {
              console.log(error)
              warningAlert('Gagal menambahkan kelas : ' + error.response.data.message)
            })
        } else {
          warningAlert('Silahkan lengkapi form pengisian')
        }
      },
      updateClassroom: function () {
        if (validateUpdate(this.temp.actualClassroom)) {
          updateClassroomAPI(this.temp.actualClassroom)
            .then(response => {
              if (response.status === 200) {
                this.temp.actualClassroom = response.data
                this.emitter.mode = 'edit'
                this.emitter.classroom = response.data
                this.$emit('changelist', this.emitter)
                successAlert('Kelas berhasil diubah')
                this.closediv()
              }
            })
            .catch(error => {
              console.log(error)
              warningAlert('Gagal mengubah kelas : ' + error.response.data.message)
            })
        } else {
          warningAlert('Form tidak boleh kosong')
        }
      },
      deleteClassroom: function () {
        deleteClassroomAPI(this.temp.actualClassroom)
          .then(response => {
            if (response === 200) {
              this.emitter.mode = 'delete'
              this.emitter.classroom = this.temp.actualClassroom
              this.$emit('changelist', this.emitter)
              successAlert('Kelas berhasil dihapus')
              this.closediv()
            }
          })
          .catch(error => {
            console.log(error)
            let msg = error.response.data.message
            if (error.response.status === 409) msg = 'masih terdapat tugas aktif'
            warningAlert('Gagal menghapus kelas : ' + msg)
          })
      },
      closediv: function () {
        this.$emit('closediv')
      },
      getCandidateAssistance: function (search, loading) {
        loading(true)
        fetchCandidateAssistanceAPI(this.temp.actualClassroom, search).then(resp => {
          this.temp.candidateAssistance = resp.data.map(v => {
            var option = {}
            option.value = v
            option.label = v.name
            return option
          })
          loading(false)
        })
      },
      setSelectedAssistance: function () {
        this.temp.actualClassroom.assistance = this.temp.selectedAssistance.map(v => {
          return v.value
        })
        this.switchEditAssistance()
      },
      switchEditAssistance: function () {
        if (this.temp.editAssistance === 'off') {
          this.temp.editAssistance = 'on'
        } else {
          this.temp.editAssistance = 'off'
        }
      }
    },
    destroyed () {
      this.classroom = {}
      this.emitter = {}
      this.temp = {}
    }
  }
</script>
