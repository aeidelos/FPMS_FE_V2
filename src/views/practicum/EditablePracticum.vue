<template>
    <div class="animated fadeIn fadeOut">
        <div class="card">
            <div class="card-header">
                <div v-if="mode=='add'"><strong>Tambah Praktium Baru</strong>
                </div>
                <div v-else-if="mode=='edit'"><strong>Edit Praktikum</strong>
                </div>
                <div v-else-if="mode=='delete'"><strong>Hapus Praktikum</strong>
                </div>
            </div>
            <div class="card-body">
                <div v-if="mode=='delete'"><span> Apakah anda yakin ingin menghapus praktikum ini? </span></div>
                <div role="group" class="b-form-group form-group" id="__BVID__338_" aria-labelledby="__BVID__338___BV_label_">
                    <div class="form-row"><label for="horizEmail" class="col-sm-3 col-form-label" id="__BVID__338___BV_label_">Mata Kuliah</label>
                        <div class="col-sm-9">
                        <select v-if="mode=='add' || editCourse == 'on'" name="course" id="course" v-model="temp.actualPracticum.course" class="form-control">
                            <option v-for="course in courses" :value="course"> {{ course.courseCode }} - {{ course.courseName }}</option>
                        </select>
                        <input v-else-if="mode=='delete' || editCourse == 'off'" v-model="temp.actualPracticum.course.courseName" id="horizEmail" type="text" placeholder="" class="form-control" disabled aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                         <small v-if="mode=='add' || editCourse == 'on'" class="form-text text-muted" id="__BVID__338___BV_description_">Pilih MK</small>
                         <small v-else-if="editCourse == 'off'" class="form-text text-muted" id="__BVID__338___BV_description_"><a v-on:click="switchEditCourse">edit</a></small></div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group" id="__BVID__340_" aria-labelledby="__BVID__340___BV_label_">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label" id="__BVID__340___BV_label_">Judul Praktikum</label>
                        <div class="col-sm-9">
                        <input v-if="mode=='add' || mode=='edit'" v-model="temp.actualPracticum.name" id="horizEmail" type="text" placeholder="Judul Praktikum.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                        <input v-if="mode=='delete'" v-model="temp.actualPracticum.name" id="horizEmail" type="text" placeholder="Judul Praktikum.." disabled class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                        <!----><small class="form-text text-muted">Masukkan Judul Praktikum</small></div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group" id="__BVID__340_" aria-labelledby="__BVID__340___BV_label_">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label" id="__BVID__340___BV_label_">Koordinator Assisten</label>
                        <div class="col-sm-9">
                        <div v-if="editCoordinator=='off'">
                            <div v-if="temp.actualPracticum.coordinatorAssistance != null">
                                <input v-if="mode=='delete' || mode=='edit'" v-model="temp.actualPracticum.coordinatorAssistance.name" id="horizEmail" type="text" placeholder="Judul Praktikum.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_" disabled>
                            </div>
                            <div v-else-if="temp.actualPracticum.coordinatorAssistance == null">Belum ada koordinator asisten</div>
                        </div>
                        <div v-else-if="editCoordinator=='on'">
                            <div class="form-group">
                              <label for="candidateKoas">Nama Koordinator Asisten</label>
                              <div><v-select
                                id="practicumName"
                                label="label"
                                :debounce="250"
                                :on-search="getCandidateKoas"
                                v-model="temp.selectedCoordinator"
                                :options="getRefreshCandidate"
                                placeholder="Cari Koas"
                              ></v-select> <button class="btn btn-primary btn-sm pull-right" v-on:click="getValueCoordinator">Set</button></div>
                            </div>
                        </div>
                        <small v-if="editCoordinator == 'on'" class="form-text text-muted">Pilih koordinator asisten</small>
                        <small v-else-if="editCoordinator == 'off'" class="form-text text-muted"><a v-on:click="switchEditCoordinator">edit</a></small></div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div><button v-if="mode == 'add'" v-on:click="addPracticum"  type="submit" class="btn btn-success btn-sm"><i class="fa fa-plus-square"></i> Tambahkan</button>
                <button v-if="mode == 'edit'"  type="submit" v-on:click="updatePracticum" class="btn btn-success btn-sm"><i class="fa fa-save"></i> Simpan</button>
                <button v-if="mode == 'delete'" v-on:click="deletePracticum" type="submit" class="btn btn-danger btn-sm"><i class="fa fa-minus-circle"></i> Hapus</button>
                <button class="btn btn-sm" v-on:click="switchCloseDiv"><i class="fa fa-ban"></i> Batal</button></div>
            </div>
        </div>
    </div>
</template>

<script>
  import { getAllCourses as getAllCoursesAPI } from '@/api/course'
  import { addPracticum as addPracticumAPI, deletePracticum as deletePracticumAPI,
    updatePracticum as updatePracticumAPI, fetchCandidateCoordinator as fetchCandidateCoordinatorAPI } from '@/api/practicum'
  import { warningAlert, successAlert } from '@/utils/alert'
  import { addValidate } from '@/validation/practicum'
  export default {
    name: 'editable-practicum',
    props: {
      act: {
        type: String,
        required: false
      },
      practicum: {
        id: ''
      }
    },
    mounted () {
      this.getAllCourses()
      if (this.act === undefined || this.act === null || this.act === '') {
        this.mode = 'add'
      } else if (this.act === 'add') {
        this.mode = 'add'
      } else if (this.act === 'edit') {
        this.mode = 'edit'
        this.temp.tempPracticum = this.practicum
        this.temp.actualPracticum = Object.assign({}, this.practicum)
      } else if (this.act === 'delete') {
        this.mode = 'delete'
        this.temp.tempPracticum = this.practicum
        this.temp.actualPracticum = Object.assign({}, this.practicum)
      }
    },
    computed: {
      getRefreshCandidate: function () {
        return this.temp.candidateKoas
      }
    },
    data () {
      return {
        mode: 'edit',
        editCourse: 'off',
        editCoordinator: 'off',
        courses: {},
        temp: {
          actualPracticum: {
            name: '',
            course: {
              id: ''
            }
          },
          tempPracticum: {
            name: ''
          },
          selectedCourse: {},
          candidateKoas: [],
          selectedCoordinator: null
        },
        emitter: {
          mode: '',
          practicum: {}
        }
      }
    },
    methods: {
      addPracticum: function () {
        if (addValidate(this.temp.actualPracticum.name, this.temp.actualPracticum.course.id)) {
          addPracticumAPI(this.temp.actualPracticum.name, this.temp.actualPracticum.course.id)
            .then(response => {
              if (response.response === 1) {
                successAlert('Praktikum berhasil ditambahkan')
                this.emitter.mode = 'add'
                this.emitter.practicum = response.object.practicum
                this.$emit('changelist', this.emitter)
                this.$emit('closediv')
              }
            })
        } else {
          warningAlert('Silahkan isi form terlebih dahulu')
        }
      },
      switchEditCourse: function () {
        this.editCourse = 'on'
      },
      switchEditCoordinator: function () {
        if (this.editCoordinator === 'on') {
          this.editCoordinator = 'off'
        } else {
          this.editCoordinator = 'on'
        }
      },
      switchCloseDiv: function () {
        this.$emit('closediv')
      },
      getValueCoordinator: function () {
        this.temp.actualPracticum.coordinatorAssistance = Object.assign({}, this.temp.selectedCoordinator.value)
        this.switchEditCoordinator()
      },
      getAllCourses: function () {
        getAllCoursesAPI().then(response => { this.courses = response.object.courses.content })
      },
      getCandidateKoas (search, loading) {
        loading(true)
        fetchCandidateCoordinatorAPI(search).then(resp => {
          this.temp.candidateKoas = resp.object.users.map(v => {
            var option = {}
            option.value = v
            option.label = v.name
            return option
          })
          loading(false)
        })
      },
      deletePracticum: function () {
        deletePracticumAPI(this.temp.actualPracticum)
          .then(response => {
            if (response.response === 1) {
              successAlert('Praktikum berhasil dihapus')
              this.emitter.practicum = Object.assign({}, this.temp.actualPracticum)
              this.emitter.mode = 'delete'
              this.$emit('changelist', this.emitter)
              this.$emit('closediv')
            } else {
              warningAlert('Gagal menghapus praktikum')
            }
          })
      },
      updatePracticum: function () {
        updatePracticumAPI(this.temp.actualPracticum)
          .then(response => {
            if (response.response === 1) {
              successAlert('Data praktikum berhasil diubah')
              this.emitter.practicum = Object.assign({}, this.temp.actualPracticum)
              this.emitter.mode = 'update'
              this.$emit('changelist', this.emitter)
              this.$emit('closediv')
            } else {
              warningAlert('Gagal menyimpan perubahan praktikum')
            }
          })
      }
    },
    destroyed () {
      this.course = {}
      this.emitter = {}
      this.temp = {}
      this.practicum = {}
    }
  }
</script>
