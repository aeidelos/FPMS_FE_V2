<template>
    <div v-if="loading" class="center-loader">
      <half-circle-spinner
        :animation-duration="1000"
        :size="90"
        color="#ff1d5e"
      />
    </div>
    <div v-else class="animated fadeIn">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="" style="min-height:450px;">
              <div v-if="classrooms.length <= 0 && role != 'coordinator'">
                <resource-empty v-bind:title="title" style="min-height:450px;"></resource-empty>
              </div>
              <div v-else>
                <b-row class="ml-2">
                  <b-col align-self="start">
                    <paginate-links class="mb-0" for="classroom-paginate" :limit="1" 
                    :show-step-links="true"
                    :classes="{
                    'ul': 'pagination',
                    '.next > a': 'page-link',
                    '.prev > a': 'page-link'
                   }"></paginate-links>
                  </b-col>
                  <b-col align-self="end" class="mr-4">
                    <button v-if="role == 'coordinator'" v-on:click="addClassroom" class="btn btn-primary pull-right"><i class="fa fa-plus"></i> Tambah Baru</button><br>
                  </b-col>
                </b-row>
                <div class="card-body">
                    <div v-if="switcher.announcement == 'on'" >
                      <announcement  v-on:closediv="switcher.announcement = 'off'; temp.selectedClassroom = null;"
                       v-bind:classroom="temp.selectedClassroom"></announcement>
                    </div>
                    <div v-if="switcher.gradeExport == 'on'">
                      <grade-export v-bind:classroom="temp.selectedClassroom" v-bind:grades="temp.grades"
                      v-on:closediv="switcher.gradeExport = 'off'; temp.selectedClassroom=null;temp.grades = null;"
                      ></grade-export>
                    </div>
                    <div v-if="switcher.listPractican == 'on'">
                      <list-practican v-bind:classroom="temp.selectedClassroom" v-on:closediv="switcher.listPractican='off'"></list-practican>
                    </div>
                    <div v-if="switcher.editableClassroom == 'on'">
                      <div v-if="switcher.editableMode=='add'"><editable-classroom  v-bind:role = "role" v-bind:practicum="practicum" v-on:closediv="switchEditableClassroom" v-on:changelist="updateClassroomList" act='add'></editable-classroom></div>
                      <div v-if="switcher.editableMode=='edit'"><editable-classroom v-bind:role = "role" v-bind:classroom="temp.selectedClassroom" act='edit' v-on:closediv="switchEditableClassroom" v-on:changelist="updateClassroomList"></editable-classroom></div>
                      <div v-if="switcher.editableMode=='delete'"><editable-classroom v-bind:role = "role" v-bind:classroom="temp.selectedClassroom" act='delete' v-on:closediv="switchEditableClassroom" v-on:changelist="updateClassroomList"></editable-classroom></div>
                    </div>
                    <paginate
                      name="classroom-paginate"
                      :list="classrooms"
                      :per="10"
                      tag="div"
                    >
                    <div  v-for="classroom in paginated('classroom-paginate')"  class="card border">
                        <div class="card-body container">
                            <div class="row">
                                <div class="col-md-6">
                                    <b>{{ classroom.practicum.name }} - {{ classroom.name }}</b>
                                </div>
                                <div class="col-md-6">
                                  <button v-if="role == 'coordinator'" v-on:click="deleteClassroom(classroom)" class="btn btn-danger pull-right"><i class="fa fa-trash"></i>Hapus</button>
                                  <button v-if="role != 'practican'" style="margin-right:3px;" v-on:click="editClassroom(classroom)" class="btn pull-right"><i class="fa fa-edit"></i>Sunting</button>
                                </div>
                            </div>
                            <div class="row" style="margin-top:30px;">
                                  <div class="col-md-3 col-sm-12">
                                    <span><strong>Enrollment Key</strong></span> <br> {{ classroom.enrollmentKey }}
                                  </div>
                                  <div class="col-md-3 col-sm-12">
                                    <span><strong>Asisten</strong></span>
                                    <div v-if="classroom.assistance.length>0">
                                      <ul style="margin:0px; padding:0px;">
                                        <li v-for="assistance in classroom.assistance"> {{ assistance.name  }} </li>
                                      </ul>
                                    </div>
                                    <div v-else>Belum ada asisten ditambahkan</div>
                                  </div>
                                  <div class="col-md-3 col-sm-12">
                                    <span><strong>Ruang Kelas</strong></span> <br> {{ classroom.location }}
                                  </div>
                                  <br>
                                  <div class="col-md-3 col-sm-12">
                                    <span><strong>Jadwal Praktikum</strong></span> <br> {{ classroom.date }}
                                  </div>
                                  <br>
                              </div>
                              <br>
                              <div>
                                 <button v-if="role == 'assistance'" style="margin-right:3px;" class="btn btn-md btn-primary pull-left" @click="activeAnnouncement(classroom)" hidden><i class="fa fa-bullhorn"></i> Pengumuman</button>
                                 <button style="margin-right:3px;" class="btn btn-md btn-success pull-left" @click="switchToNextRouteClassroom(classroom)"><i class="fa fa-tasks"></i> Tugas & Laporan</button>
                                 <button v-if="role == 'assistance' || role== 'coordinator'" style="margin-right:3px;" class="btn btn-md btn-success pull-left" @click="exportGrade(classroom)"><i class="fa fa-list-alt"></i> Rekap Nilai</button>
                                 <button style="margin-right:3px;" class="btn btn-md btn-primary pull-right" @click="switchListPractican(classroom)" ><i class="fa fa-users"></i> Peserta Kelas</button>
                              </div>
                            </div>
                    </div>
                    </paginate>
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
import EditableClassroom from './component/EditableClassroom'
import ResourceEmpty from '@/components/ResourceEmpty'
import Announcement from './component/Announcement'
import GradeExport from './component/GradeExport'
import ListPractican from './component/ListPractican'
import { HalfCircleSpinner } from 'epic-spinners'
import { getExportedGrade } from '@/api/assignment'
export default {
  name: 'classroom',
  components: {
    EditableClassroom,
    ResourceEmpty,
    Announcement,
    GradeExport,
    ListPractican,
    HalfCircleSpinner
  },
  props: {
    classrooms: {
      type: Array,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    practicum: {
      type: Object,
      required: false
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    }, 300)
  },
  mounted () {
    if (this.role === 'assistance') {
      this.title = 'Anda belum menjadi asisten'
    } else if (this.role === 'coordinator') {
      this.title = 'Belum ada kelas. Silahkan buat terlebih dahulu'
    } else {
      this.title = 'Anda belum masuk ke kelas praktikum'
    }
  },
  data () {
    return {
      loading: true,
      temp: {
        selectedClassroom: {},
        grades: {}
      },
      switcher: {
        editableClassroom: 'off',
        editableMode: 'add',
        announcement: 'off',
        gradeExport: 'off',
        listPractican: 'off'
      },
      title: '',
      paginate: ['classroom-paginate']
    }
  },
  methods: {
    activeAnnouncement (classroom) {
      this.switcher.announcement = 'on'
      this.temp.selectedClassroom = classroom
    },
    switchToNextRouteClassroom (classroom) {
      let role = this.role
      this.$router.push({name: 'ClassroomTask', params: {classroom, role}})
    },
    switchEditableClassroom () {
      if (this.switcher.editableClassroom === 'off') {
        this.switcher.editableClassroom = 'on'
      } else {
        this.switcher.editableClassroom = 'off'
      }
    },
    switchListPractican (classroom) {
      if (this.switcher.listPractican === 'off') {
        this.switcher.listPractican = 'on'
        this.temp.selectedClassroom = classroom
      } else {
        this.switcher.listPractican = 'off'
        this.temp.selectedClassroom = {}
      }
    },
    addClassroom () {
      this.switcher.editableMode = 'add'
      this.switchEditableClassroom()
    },
    editClassroom (classroom) {
      this.temp.selectedClassroom = classroom
      this.switcher.editableMode = 'edit'
      this.switchEditableClassroom()
    },
    deleteClassroom (classroom) {
      this.temp.selectedClassroom = classroom
      this.switcher.editableMode = 'delete'
      this.switchEditableClassroom()
    },
    updateClassroomList (args) {
      if (args.mode === 'add') {
        this.classrooms.push(args.classroom)
      } else {
        var classroomTemp = this.classrooms.filter(classroom => { return classroom.id !== args.classroom.id })
        if (args.mode === 'edit') {
          classroomTemp.push(args.classroom)
        }
        this.classrooms = Object.assign([], classroomTemp)
      }
    },
    exportGrade (classroom) {
      getExportedGrade(classroom)
        .then(response => {
          this.temp.selectedClassroom = classroom
          this.temp.grades = response.data
          this.switcher.gradeExport = 'on'
        })
        .catch(error => console.log(error))
    }
  }
}
</script>
