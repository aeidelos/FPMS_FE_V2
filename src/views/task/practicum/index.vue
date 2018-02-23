<template>
  <div class="animated fadeIn">
      <task-list v-bind:tasks="tasks" v-bind:practicum="practicum"></task-list>
  </div>
</template>

<script>
import { getPracticumByCoordinatorAssistance as getPracticumByCoordinatorAssistanceAPI } from '@/api/practicum'
import TaskList from './../modules/list'
import { getUser } from '@/utils/auth'
import { getAllTaskByPracticum as getAllTaskByPracticumAPI,
  getAllTaskByPracticumPast as getAllTaskByPracticumPastAPI } from '@/api/task'
export default {
  name: 'classroom-practican',
  components: {
    TaskList
  },
  mounted () {
    var userid = getUser()
    getPracticumByCoordinatorAssistanceAPI(userid)
      .then(response => {
        if (response.response === 1) {
          this.practicum = response.object.practicum
          getAllTaskByPracticumAPI(response.object.practicum.id)
            .then(response => {
              this.tasks.current = response.object.tasks
            })
          getAllTaskByPracticumPastAPI(response.object.practicum.id)
            .then(response => {
              this.tasks.past = response.object.tasks
            })
        }
      })
  },
  data () {
    return {
      practicum: {},
      tasks: {
        current: {
          type: Array,
          default: null
        },
        past: {
          type: Array,
          default: null
        }
      }
    }
  }
}
</script>
