<template>
    <div class="animated fadeIn">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card border" style="min-height:450px;">
                <div class="card-header">
                    <div>
                        <div>
                            <button v-on:click="addClassroom" class="btn btn-primary pull-right"><i class="fa fa-plus"></i>Tambah Baru</button>
                        </div>
                    </div>
                </div>
                <div>
                </div>
                <div class="card-body">
                    <div v-if="switcher.editableClassroom == 'on'">
                      <div v-if="switcher.editableMode=='add'"><editable-classroom  v-bind:practicum="practicum" v-on:closediv="switchEditableClassroom" v-on:changelist="updateClassroomList" act='add'></editable-classroom></div>
                      <div v-if="switcher.editableMode=='edit'"><editable-classroom v-bind:classroom="temp.selectedClassroom" act='edit' v-on:closediv="switchEditableClassroom" v-on:changelist="updateClassroomList"></editable-classroom></div>
                      <div v-if="switcher.editableMode=='delete'"><editable-classroom v-bind:classroom="temp.selectedClassroom" act='delete' v-on:closediv="switchEditableClassroom" v-on:changelist="updateClassroomList"></editable-classroom></div>
                    </div>
                    <div  v-for="classroom in classrooms"  class="card border">
                        <div class="card-header">
                            <div>
                                <div>
                                    <b>{{ classroom.practicum.name }} - {{ classroom.name }}</b>
                                  <button v-on:click="deleteClassroom(classroom)" class="btn btn-danger pull-right"><i class="fa fa-trash"></i>Hapus</button>
                                  <button v-on:click="editClassroom(classroom)" class="btn pull-right"><i class="fa fa-edit"></i>Sunting</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="col-sm-12 col-md-12 col-lg-12">
                              <div class="row">
                                <div class="col-sm-6 col-md-6 col-lg-6">
                                  <div>
                                    <span>Enrollment Key : </span> {{ classroom.enrollmentKey }}
                                  </div>
                                  <br>
                                  <div>
                                    <span><h6>Asisten : </h6></span>
                                    <div v-if="classroom.assistance.length>0">
                                      <ul>
                                        <li v-for="assistance in classroom.assistance"> {{ assistance.name  }} </li>
                                      </ul>
                                    </div>
                                    <div v-else>Belum ada asisten ditambahkan</div>
                                  </div>
                                </div>
                                <div class="col-sm-6 col-md-6 col-lg-6">
                                  <div>
                                    <span>Ruang Kelas : </span> {{ classroom.location }}
                                  </div>
                                  <br>
                                  <div>
                                    <span>Dosen Pengampu : </span> to be implemented
                                  </div>
                                  <br>
                                  <button class="btn btn-md btn-success btn-block" v-on:click="switchToNextRouteClassroom(classroom)">Tugas & Laporan</button>
                                </div>
                              </div>
                              <br>
                              <div class="row">
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
import EditableClassroom from './component/EditableClassroom'
export default {
  name: 'classroom',
  components: {
    EditableClassroom
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
  mounted () {
  },
  data () {
    return {
      temp: {
        selectedClassroom: {}
      },
      switcher: {
        editableClassroom: 'off',
        editableMode: 'add'
      }
    }
  },
  methods: {
    switchToNextRouteClassroom (classroom) {
      this.$router.push({name: 'ClassroomTask', params: {classroom}})
    },
    switchEditableClassroom () {
      if (this.switcher.editableClassroom === 'off') {
        this.switcher.editableClassroom = 'on'
      } else {
        this.switcher.editableClassroom = 'off'
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
      console.log(1)
      if (args.mode === 'add') {
        this.classrooms.push(args.classroom)
        console.log(2)
      } else {
        console.log(3)
        var classroomTemp = this.classrooms.filter(classroom => { return classroom.id !== args.classroom.id })
        if (args.mode === 'edit') {
          classroomTemp.push(args.classroom)
          console.log(4)
        }
        console.log(5)
        this.classrooms = Object.assign([], classroomTemp)
      }
    }
  }
}
</script>
