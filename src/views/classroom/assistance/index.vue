<template>
  <div class="animated fadeIn">
    <classroom v-bind:classrooms="classrooms" v-bind:practicum="practicum" role="assistance"></classroom>
  </div>
</template>

<script>
import { getAllClassroomByAssistance as getAllClassroomByAssistanceAPI } from '@/api/classroom'
import { getUser } from '@/utils/auth'
import Classroom from './../modules'

export default {
  name: 'classroom-assistance',
  components: {
    Classroom
  },
  mounted () {
    var userid = getUser()
    getAllClassroomByAssistanceAPI(userid)
      .then(response => {
        if (response.status === 200) {
          this.classrooms = response.data
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
