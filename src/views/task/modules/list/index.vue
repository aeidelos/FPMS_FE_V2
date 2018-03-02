<template>
    <div class="animated fadeIn">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card border">
                <div class="card-body">
                      <button class="btn btn-primary pull-right" v-on:click="switchAddTask"><i class="fa fa-plus"></i>Tambah Baru</button>
                    <br><br><br>
                    <div class="card" v-if="switcher.editableTask == 'on'">
                      <div class="card-body">
                        <editable-task v-bind:practicum="practicum" v-bind:classroom="classroom" v-bind:mode="switcher.editableMode"
                        v-bind:selectedTask="selectedTask" v-on:closediv="switchEditableTask"
                        v-on:changelist="updateList"></editable-task>
                      </div>
                    </div>
                    <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link"  v-bind:class="{ active: isActiveCurrent}" v-on:click="switchTaskTime('current')">Aktif</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-bind:class="{ active: isActivePast}" v-on:click="switchTaskTime('past')">Berakhir</a>
                    </li>
                    </ul>
                    <div class="card">
                        <div class="card-body">
                            <div v-if="getActiveTasks.length>0" v-for="task in getActiveTasks" class="card">
                                <div class="card-body">
                                    <div class="row" style="margin:20px">
                                      <div class="col-sm-10">
                                        <h3><strong>{{ task.title }}</strong></h3>
                                      </div>
                                      <div class="col-sm-2">
                                        <button v-on:click="switchDeleteTask(task)" class="btn btn-danger pull-right"><i class="fa fa-close"></i></button>
                                        <button v-on:click="switchEditTask(task)" class="btn pull-right"><i class="fa fa-edit"></i></button>
                                      </div>
                                    </div>
                                    <div style="margin-left:30px">
                                      <div class="row">
                                        <div class="col-sm-6">
                                          <div class="row">
                                            <strong><p>Deskripsi Tugas</p></strong>
                                          </div>
                                          <div class="row">
                                            <p v-html="task.description"></p>
                                          </div>
                                          <div class="row">
                                            <strong><p>Dibuat Oleh : </p></strong>
                                          </div>
                                          <div class="row">
                                            <p>{{ task.createdBy.name }}</p>
                                          </div>
                                          <div class="row">
                                            <strong><p>Lampiran</p></strong>
                                          </div>
                                          <div class="row">
                                            <ol>
                                              <li v-for="assignment in task.assignments"> {{ assignment.description }} - ({{ assignment.fileAllowed }})</li>
                                            </ol>
                                          </div>
                                        </div>
                                        <div class="col-sm-6">
                                          <div class="row">
                                            <strong><p>Waktu Pengerjaan</p></strong>
                                          </div>
                                          <div class="row">
                                            <p>Mulai : {{ task.createdDate }} - Selesai : {{ task.dueDate }}</p>
                                          </div>
                                          <div class="row">
                                            <Strong><p>Ijinkan Keterlambatan</p></Strong>
                                          </div>
                                          <div class="row">
                                            <p v-if="task.allowLate">Ya</p>
                                            <p v-else>Tidak</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-sm-12">
                                        <div v-for="assignment in task.assignments">
                                          <uploader-task v-bind:assignment="assignment" v-bind:practican="getActiveUser" v-if="task.id == switcher.viewUpload"></uploader-task>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-sm-12">
                                        <div v-if="task.id != switcher.viewUpload">
                                           <button class="btn btn-primary pull-right">Lihat Pengumpulan</button>
                                           <button class="btn btn-success pull-right" v-on:click="viewUpload(task)">Unggah Pengerjaan</button>
                                        </div>
                                        <div v-else>
                                            <button class="btn btn-warning pull-right" v-on:click="viewUpload(null)">Tutup</button>
                                        </div>
                                      </div>
                                    </div>
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
import EditableTask from './EditableTask'
import UploaderTask from './../upload'
export default {
  name: 'list-task',
  components: {
    EditableTask,
    UploaderTask
  },
  props: {
    tasks: {
      current: {
        type: Array,
        default: null
      },
      past: {
        type: Array,
        default: null
      }
    },
    practicum: {
      type: Object,
      default: null,
      require: false
    },
    classroom: {
      type: Object,
      default: null,
      require: false
    }
  },
  mounted () {
  },
  data () {
    return {
      activeTasks: null,
      switcher: {
        editableTask: 'off',
        editableMode: 'add',
        viewUpload: null
      },
      activeLink: {
        current: true,
        past: false
      },
      selectedTask: null
    }
  },
  methods: {
    viewUpload (task) {
      this.switcher.viewUpload = task == null ? null : task.id
    },
    switchAddTask () {
      this.switcher.editableMode = 'add'
      this.switchEditableTask()
    },
    switchEditTask (task) {
      this.selectedTask = Object.assign({}, task)
      this.switcher.editableMode = 'edit'
      this.switchEditableTask()
    },
    switchDeleteTask (task) {
      this.selectedTask = Object.assign({}, task)
      this.switcher.editableMode = 'delete'
      this.switchEditableTask()
    },
    switchEditableTask () {
      if (this.switcher.editableTask === 'off') {
        this.switcher.editableTask = 'on'
      } else {
        this.switcher.editableTask = 'off'
        this.selectedTask = null
      }
    },
    switchTaskTime (time) {
      if (time === 'past') {
        this.activeTasks = this.tasks.past
        this.switchActiveTask(time)
      } else {
        this.activeTasks = this.tasks.current
        this.switchActiveTask(time)
      }
    },
    switchActiveTask (component) {
      if (component === 'current') {
        this.activeLink.current = true
        this.activeLink.past = false
      } else {
        this.activeLink.current = false
        this.activeLink.past = true
      }
    },
    updateList (args) {
      if (args.mode === 'add') {
        if (args.category === 'current') {
          this.tasks.current.push(args.task)
          this.activeTasks = this.tasks.current
        } else if (args.category === 'past') {
          this.tasks.past.push(args.task)
          this.activeTasks = this.tasks.past
        }
      } else {
        if (args.category === 'current') {
          var taskstempcurrent = this.tasks.current.filter(function (item) {
            return item.id !== args.task.id
          })
          if (args.mode === 'update') {
            taskstempcurrent.push(args.task)
          }
          this.tasks.current = taskstempcurrent
          this.activeTasks = this.tasks.current
        } else if (args.category === 'past') {
          var taskstemppast = this.tasks.past.filter(function (item) {
            return item.id !== args.task.id
          })
          if (args.mode === 'update') {
            taskstemppast.push(args.task)
          }
          this.tasks.past = taskstemppast
          this.activeTasks = this.tasks.past
        }
      }
    }
  },
  computed: {
    getActiveTasks () {
      return this.activeTasks === null ? this.tasks.current : this.activeTasks
    },
    isActiveCurrent () {
      return this.activeLink.current
    },
    isActivePast () {
      return this.activeLink.past
    },
    getActiveUser () {
      return this.$store.getters.user
    }
  },
  destroyed () {
  }
}
</script>
