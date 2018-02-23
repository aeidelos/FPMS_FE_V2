<template>
    <div class="animated fadeIn">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card border">
                <div class="card-body">
                      <button class="btn btn-primary pull-right" v-on:click="switchAddTask"><i class="fa fa-plus"></i>Tambah Baru</button>
                    <br><br><br>
                    <div class="card" v-if="switcher.editableTask == 'on'">
                      <div class="card-body">
                        <editable-task v-bind:practicum="practicum" v-bind:mode="switcher.editableMode"
                        v-bind:task="selectedTask"></editable-task>
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
                                    <div class="row" style="margin-bottom:40px">
                                        <h3><strong>{{ task.title }}</strong></h3>
                                    </div>
                                    <div>
                                      <div class="row">
                                        <p>Deskripsi Tugas</p>
                                        <p v-html="task.description"></p>
                                      </div>
                                      <div class="row">
                                        <p>Waktu Pengerjaan</p>
                                        <p>Mulai : {{ task.createdDate }} - Selesai : {{ task.dueDate }}</p>
                                      </div>
                                      <div class="row">
                                        <p>Dibuat Oleh : </p>
                                        <p>{{ task.createdBy.name }}</p>
                                      </div>
                                      <div class="row">
                                        <p>Lampiran</p>
                                        <ol>
                                          <li v-for="assignment in task.assignments"> {{ assignment.description }} - ({{ assignment.fileAllowed }})</li>
                                        </ol>
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
export default {
  name: 'list-task',
  components: {
    EditableTask
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
    }
  },
  mounted () {
  },
  data () {
    return {
      activeTasks: null,
      switcher: {
        editableTask: 'off',
        editableMode: 'add'
      },
      activeLink: {
        current: true,
        past: false
      },
      selectedTask: null
    }
  },
  methods: {
    switchAddTask () {
      this.switcher.editableMode = 'add'
      this.switchEditableTask()
    },
    switchEditableTask () {
      if (this.switcher.editableTask === 'off') {
        this.switcher.editableTask = 'on'
      } else {
        this.switcher.editableTask = 'off'
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
    }
  }
}
</script>
