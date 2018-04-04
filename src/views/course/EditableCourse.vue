<template>
    <div class="fadeIn">
      <b-modal title="Modal title" hide-footer size="lg" v-model="modal" 
      hide-header no-close-on-backdrop no-close-on-esc>
        <div class="card">
            <div class="card-header">
                <div v-if="mode=='add'"><strong>Tambah Mata Kuliah</strong>
                </div>
                <div v-else-if="mode=='edit'"><strong>Edit Mata Kuliah</strong>
                </div>
                <div v-else-if="mode=='delete'"><strong>Hapus Mata Kuliah</strong>
                </div>
            </div>
            <div class="card-body">
                <div v-if="mode=='delete'"><span> Apakah anda yakin ingin menghapus mata kuliah ini? </span></div>
                <div role="group" class="b-form-group form-group" id="__BVID__338_" aria-labelledby="__BVID__338___BV_label_">
                    <div class="form-row"><label for="horizEmail" class="col-sm-3 col-form-label" id="__BVID__338___BV_label_">Kode MK</label>
                        <div class="col-sm-9">
                            <input v-if="mode=='edit'" v-model="temp.actualCourse.courseCode" id="horizEmail" type="text" placeholder="Kode MK.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                            <input v-if="mode=='add'" v-model="temp.actualCourse.courseCode" id="horizEmail" type="text" placeholder="Kode MK.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_">
                            <input v-if="mode=='delete'" v-model="temp.actualCourse.courseCode" id="horizEmail" type="text" placeholder="Kode MK.." class="form-control" aria-describedby="__BVID__338___BV_description_ __BVID__338___BV_description_" disabled>
                            <!---->
                            <!----><small class="form-text text-muted" id="__BVID__338___BV_description_">Masukkan kode Mk</small></div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group" id="__BVID__340_" aria-labelledby="__BVID__340___BV_label_">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label" id="__BVID__340___BV_label_">Nama MK</label>
                        <div class="col-sm-9">
                            <input v-if="mode=='edit'" v-model="temp.actualCourse.courseName" id="horizPass" type="text" placeholder="Nama MK.." class="form-control" aria-describedby="__BVID__340___BV_description_ __BVID__340___BV_description_">
                            <input v-if="mode=='add'" v-model="temp.actualCourse.courseName" id="horizPass" type="text" placeholder="Nama MK.." class="form-control" aria-describedby="__BVID__340___BV_description_ __BVID__340___BV_description_">
                            <input v-if="mode=='delete'" v-model="temp.actualCourse.courseName" id="horizPass" type="text" placeholder="Nama MK.." class="form-control" aria-describedby="__BVID__340___BV_description_ __BVID__340___BV_description_" disabled>
                            <!---->
                            <!----><small class="form-text text-muted">Masukkan Nama MK</small></div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div><button v-if="mode == 'add'" v-on:click="addCourseAction" type="submit" class="btn btn-success btn-sm"><i class="fa fa-plus-square"></i> Tambahkan</button>
                <button v-if="mode == 'edit'" v-on:click="updateCourseAction" type="submit" class="btn btn-success btn-sm"><i class="fa fa-save"></i> Simpan</button>
                <button v-if="mode == 'delete'" v-on:click="deleteCourseAction" type="submit" class="btn btn-danger btn-sm"><i class="fa fa-minus-circle"></i> Hapus</button>
                <button v-on:click="closeSwitch" class="btn btn-sm"><i class="fa fa-ban"></i> Batal</button></div>
            </div>
        </div>
      </b-modal>
    </div>
</template>

<script>
  import { addCourse, updateCourse, deleteCourse } from '@/api/course'
  import { successAlert, warningAlert } from '@/utils/alert'
  import { validate } from '@/validation/course'
  export default {
    name: 'editable-course',
    props: {
      act: {
        type: String,
        required: false
      },
      course: {
        type: Object,
        required: false
      }
    },
    mounted () {
      if (this.act === undefined || this.act === null || this.act === '') {
        this.mode = 'add'
      } else if (this.act === 'edit') {
        this.mode = 'edit'
        this.temp.tempCourse = this.course
        this.temp.actualCourse = Object.assign({}, this.course)
      } else if (this.act === 'delete') {
        this.mode = 'delete'
        this.temp.tempCourse = this.course
        this.temp.actualCourse = Object.assign({}, this.course)
      }
    },
    data () {
      return {
        mode: 'edit',
        temp: {
          tempCourse: {
            id: '',
            courseCode: '',
            courseName: ''
          },
          actualCourse: {
            id: '',
            courseCode: '',
            courseName: ''
          }
        },
        modal: true
      }
    },
    methods: {
      addCourseAction: function () {
        if (validate(this.temp.actualCourse.courseCode, this.temp.actualCourse.courseName)) {
          addCourse(this.temp.actualCourse.courseCode, this.temp.actualCourse.courseName)
            .then(response => {
              if (response.status === 201) {
                successAlert('Berhasil menambahkan mata kuliah')
                this.tempCourse = Object.assign({}, this.temp.actualCourse)
                this.$emit('changelist')
                this.$emit('closediv')
              }
            })
            .catch(error => {
              console.log(error)
              let msg = 'server error'
              if (error.response.status === 409) msg = 'Kode MK sudah digunakan'
              warningAlert('Gagal menambahkan MK : ' + msg)
            })
        }
      },
      closeSwitch: function () {
        this.$emit('closediv')
      },
      deleteCourseAction: function () {
        deleteCourse(this.temp.actualCourse.id)
          .then(response => {
            if (response.status === 200) {
              successAlert('Berhasil menghapus mata kuliah')
              this.tempCourse = Object.assign({}, this.temp.actualCourse)
              this.$emit('changelist')
              this.$emit('closediv')
            }
          })
          .catch(error => {
            console.log(error)
            let msg = 'server error'
            if (error.response.status === 409) msg = 'Masih terdapat praktikum aktif, silahkan hapus terlebih dahulu'
            warningAlert('Gagal menghapus mata kuliah : ' + msg)
          })
      },
      updateCourseAction: function () {
        if (validate(this.temp.actualCourse.courseName, this.temp.actualCourse.courseCode)) {
          updateCourse(this.temp.actualCourse.id, this.temp.actualCourse.courseName, this.temp.actualCourse.courseCode)
            .then(response => {
              if (response.status === 200) {
                successAlert('Berhasil mengubah mata kuliah')
                this.tempCourse = Object.assign({}, this.temp.actualCourse)
                this.$emit('changelist')
                this.$emit('closediv')
              }
            })
            .catch(error => {
              console.log(error)
              let msg = 'server error'
              warningAlert('Gagal mengubah mata kuliah : ' + msg)
            })
        }
      }
    },
    destroyed () {
      this.course = {}
    }
  }
</script>
