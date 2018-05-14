<template>
    <div class="animated fadeIn">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card border" style="min-height:450px;">
                <div class="card-body">
                      <button v-if="role == 'assistance' || role == 'coordinator'" class="btn btn-primary pull-right" v-on:click="switchAddTask"><i class="fa fa-plus"></i>Tambah Baru</button>
                      <paginate-links class="" for="task-paginate" :limit="1" 
                        :show-step-links="true"
                        :classes="{
                        'ul': 'pagination',
                        '.next > a': 'page-link',
                        '.prev > a': 'page-link'
                      }"></paginate-links>
                    <br><br><br>
                    <div v-if="switcher.editableTask == 'on'">
                        <editable-task v-bind:practicum="practicum" v-bind:classroom="classroom" v-bind:mode="switcher.editableMode"
                        v-bind:selectedTask="selectedTask" v-on:closediv="switchEditableTask"
                        v-on:changelist="updateList"></editable-task>
                    </div>
                    <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link"  v-bind:class="{ active: isActiveCurrent}" v-on:click="switchTaskTime('current')"><i class="fa fa-play"></i> Aktif</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" v-bind:class="{ active: isActivePast}" v-on:click="switchTaskTime('past')"><i class="fa fa-stop"></i> Berakhir</a>
                    </li>
                    </ul>
                    <div class="card">
                      <div class="card-body" style="min-height:450px;">
                      <paginate ref="paginator"
                        name="task-paginate"
                        :list="getActiveTasks"
                        :per="5"
                        tag="div"
                      >
                        <div v-if="getActiveTasks.length>0" v-for="task in paginated('task-paginate')" class="card" @change="updatePaginate">
                              <div v-if="currentlyActive(task) == true">
                                <div class="card no-body pl-4 pb-4 pr-4">
                                  <div class="col-md-12 col-sm-12 m-0 p-0" >
                                    <span class="pull-right"></span>
                                  </div>
                                    <div class="row" style="margin:20px">
                                      <div class="col-sm-8">
                                        <h3><strong><i class="fa fa-bookmark"></i> {{ task.title }}</strong></h3>
                                      </div>
                                      <div class="col-sm-4">
                                        <button v-if="role != 'practican' && isTheCreator(task) == true" v-on:click="switchDeleteTask(task)" class="btn btn-danger pull-right"><i class="fa fa-close">Hapus</i></button>
                                        <button v-if="role != 'practican' && isTheCreator(task) == true" v-on:click="switchEditTask(task)" class="btn pull-right"><i class="fa fa-edit"></i>Sunting</button>
                                        <h5 v-else class="pull-right"><span class="badge badge-md badge-success"><i class="fa fa-clock-o"></i> 7 Jam 50 Menit</span></h5>
                                      </div>
                                    </div>
                                    <div style="margin-left:30px">
                                      <div class="row">
                                        <div class="col-sm-6">
                                          <div class="row">
                                            <strong><p><i class="fa fa-align-justify"></i> Deskripsi Tugas</p></strong>
                                          </div>
                                          <div class="row">
                                            <p v-html="task.description"></p>
                                          </div>
                                          <div class="row">
                                            <strong><p><i class="fa fa-user"></i> Dibuat Oleh : </p></strong>
                                          </div>
                                          <div class="row">
                                            <p>{{ task.createdBy.name }}</p>
                                          </div>
                                          <div class="row">
                                            <strong><p><i class="fa fa-cloud-upload"></i> Unggahan</p></strong>
                                          </div>
                                          <div class="row">
                                            <ol>
                                              <li v-for="assignment in task.assignments"> {{ assignment.description }} - ({{ assignment.fileAllowed }})</li>
                                            </ol>
                                          </div>
                                        </div>
                                        <div class="col-sm-6">
                                          <div class="row">
                                            <strong><p><i class="fa fa-calendar"></i> Waktu Pengerjaan</p></strong>
                                          </div>
                                          <div class="row">
                                            <p>Mulai : {{ task.createdDate }} - Selesai : {{ task.dueDate }}</p>
                                          </div>
                                          <div class="row">
                                            <Strong><p><i class="fa fa-angle-down"></i> Ijinkan Keterlambatan</p></Strong>
                                          </div>
                                          <div class="row">
                                            <p v-if="task.allowLate">Ya</p>
                                            <p v-else>Tidak</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-md-12 col-sm-12">
                                        <div v-for="assignment in task.assignments" :key="assignment.id">
                                          <uploader-task v-bind:assignment="assignment" 
                                          v-bind:practican="getActiveUser" v-if="task.id == switcher.viewUpload"
                                          v-on:viewDocument="viewDocument" v-on:closeViewer="viewUpload(null)"
                                          v-bind:isNotLate="isNotLate(task)"
                                          ></uploader-task>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row" style="margin-bottom:30px;">
                                      <div class="col-sm-12 col-md-12">
                                        <div v-if="task.id != switcher.viewUpload">
                                           <button v-if="role =='assistance' || role=='coordinator'" class="btn btn-primary pull-right" 
                                           v-on:click="switchToNextRouteClassroom(classroom,task)"><i class="fa fa-list"></i> Lihat Pengumpulan</button>
                                           <button v-if="role == 'practican'" style="margin-right:3px;" class="btn btn-success pull-right" v-on:click="viewUpload(task)"><i class="fa fa-pencil"></i> Pengerjaan</button>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="row">
                                      <div class="col-md-12 col-sm-12">
                                        <corrector-list v-if="switcher.corrector == 'on'" 
                                        v-bind:task="task" v-on:closeViewer="closeViewer('corrector')"></corrector-list>
                                      </div>
                                    </div>
                                    <div class="row" v-if="switcher.viewer == 'on'">
                                      <div class="col-md-12 col-sm-12">
                                         <document-viewer v-if="activeViewer.data[0].assignment.fileAllowed == 'document'" v-bind:document="activeViewer.data"
                                      v-on:closeViewer="closeViewer('viewer')"></document-viewer>
                                         <code-viewer v-if="activeViewer.data[0].assignment.fileAllowed == 'sourcecode'" v-bind:document="activeViewer.data"
                                      v-on:closeViewer="closeViewer('viewer')"></code-viewer>
                                      </div>
                                    </div>
                                </div>
                              </div>
                        </div>
                      </paginate>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import EditableTask from './EditableTask'
import UploaderTask from './../upload'
import CodeViewer from './../viewer/CodeViewer'
import DocumentViewer from './../viewer/DocumentViewer'
import CorrectorList from './../corrector'
export default {
  name: 'list-task',
  components: {
    EditableTask,
    UploaderTask,
    CodeViewer,
    DocumentViewer,
    CorrectorList
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
    },
    role: {
      type: String,
      default: null,
      require: true
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
        viewUpload: null,
        viewer: 'off',
        corrector: 'off'
      },
      activeLink: {
        current: true,
        past: false
      },
      activeViewer: {
        data: {},
        type: {}
      },
      selectedTask: null,
      exporter: {
        classroom: {},
        assignment: {}
      },
      paginate: ['task-paginate']
    }
  },
  updated () {
  },
  methods: {
    updatePaginate () {
      if (this.activeTasks.length > 0) {
        this.$refs.paginator.goToPage(1)
      }
    },
    viewDocument (document) {
      this.activeViewer.data = document
      this.switcher.viewer = 'on'
    },
    isNotLate (task) {
      if (task.allowLate === true) {
        return true
      } else {
        let date = moment(task.dueDate, 'DD-MM-YYYY hh:mm:ss').toDate()
        let late = new Date() <= date
        return late
      }
    },
    getUser () {
      return this.$store.getters.user
    },
    isTheCreator (task) {
      console.log(task.createdBy.id)
      console.log(this.getUser().id)
      let allow = false
      if (task.createdBy.id === this.getUser().id) {
        allow = true
      }
      return allow
    },
    currentlyActive (task) {
      let date = moment(task.createdDate, 'DD-MM-YYYY hh:mm:ss').toDate()
      return new Date() > date
    },
    closeViewer (type) {
      this.activeViewer.data = {}
      if (type === 'viewer') this.switcher.viewer = 'off'
      if (type === 'corrector') this.switcher.corrector = 'off'
    },
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
    switchToNextRouteClassroom (classroom, task) {
      this.$router.push({name: 'CollectionTask', params: {classroom, task}})
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
