<template>
  <div class="animated fadeIn">
      <task-list v-bind:tasks="tasks" v-bind:role="role" v-bind:practicum="practicum"></task-list>
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
        if (response.status === 200) {
          this.practicum = response.data
          getAllTaskByPracticumAPI(response.data.id)
            .then(response => {
              this.tasks.current = response.data
            })
          getAllTaskByPracticumPastAPI(response.data.id)
            .then(response => {
              this.tasks.past = response.data
            })
        }
      })
      .catch(error => {
        console.log(error)
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
      },
      role: 'coordinator'
    }
  }
}
</script>
