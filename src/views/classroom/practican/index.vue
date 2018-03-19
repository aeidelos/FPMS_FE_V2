<template>
  <div class="animated fadeIn">
    <classroom v-bind:classrooms="classrooms" v-bind:practicum="practicum" role="practican"></classroom>
  </div>
</template>

<script>
import { getAllClassroomByPractican as getAllClassroomByPracticanAPI } from '@/api/classroom'
import { getUser } from '@/utils/auth'
import Classroom from './../modules'

export default {
  name: 'classroom-practican',
  components: {
    Classroom
  },
  mounted () {
    var userid = getUser()
    getAllClassroomByPracticanAPI(userid)
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
