<template>
  <div class="animated fadeIn">
      <task-list v-bind:tasks="tasks" v-bind:classroom="classroom"></task-list>
  </div>
</template>

<script>
import TaskList from './../modules/list'
import { getAllTaskByClassroom as getAllTaskByClassroomAPI, getAllTaskByClassroomPast as getAllTaskByClassroomPastAPI }
  from '@/api/task'
export default {
  name: 'classroom-practicum',
  components: {
    TaskList
  },
  props: {
    classroom: {
      type: Object,
      default: null,
      required: false
    }
  },
  mounted () {
    if (this.classroom === null) this.$router.go(-1)
    getAllTaskByClassroomAPI(this.classroom.id)
      .then(response => {
        this.tasks.current = response.data
      })
    getAllTaskByClassroomPastAPI(this.classroom.id)
      .then(response => {
        this.tasks.past = response.data
      })
  },
  data () {
    return {
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
