<template>
  <div class="animated fadeIn">
    <classroom v-bind:classrooms="classrooms" v-bind:practicum="practicum" role="coordinator"></classroom>
  </div>
</template>

<script>
import { getPracticumByCoordinatorAssistance as getPracticumByCoordinatorAssistanceAPI } from '@/api/practicum'
import { getAllClassroomByPracticum as getAllClassroomByPracticumAPI } from '@/api/classroom'
import { getUser } from '@/utils/auth'
import Classroom from './../modules'

export default {
  name: 'classroom-coordinator',
  components: {
    Classroom
  },
  mounted () {
    var userid = getUser()
    getPracticumByCoordinatorAssistanceAPI(userid)
      .then(response => {
        if (response.status === 200) {
          this.practicum = response.data
          getAllClassroomByPracticumAPI(response.data)
            .then(response => {
              this.classrooms = response.data
            })
        } else {
        }
      })
  },
  data () {
    return {
      classrooms: [],
      practicum: {}
    }
  }
}
</script>
