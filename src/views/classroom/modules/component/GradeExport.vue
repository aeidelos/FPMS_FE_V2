<template>
    <div class="fadeIn">
      <b-modal title="Modal title" v-model="modal"  hide-footer size="lg" hide-header no-close-on-backdrop no-close-on-esc>
        <div class="card" >
          <div class="card-body" style="overflow-x:auto" id="printDocument" >
            <h3> Daftar Nilai {{ classroom.practicum.name}} - {{classroom.name }} </h3>
            <table class="table table-bordered" style="table-layout: fixed;max-width: 200px;">
              <thead style="">
                <th style="text-align:left;width:150px" >NIM</th>
                <th style="text-align:left;width:200px" >Nama Mahasiswa</th>
                <th style="text-align:center;width:200px" v-for="task in tasks" :key="task.id">{{ task.title.slice(0,42) }} </th>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id" >
                  <td style="text-align:left;">{{ user.identity }}</td>
                  <td style="text-align:left;">{{ user.name }} </td>
                  <td style="text-align:center;" v-for="grade in grades" :key="grade.id">  {{ getGrade(user, grade.documents) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <button class="btn btn-warning btn-sm pull-right" @click="closeViewer">Tutup</button>
            <button class="btn btn-sm pull-right" @click="print()">Print</button> 
          </div>
        </div>
      </b-modal>
    </div>
</template>

<script>
  import printjs from 'print-js'
  export default {
    name: 'grade-export',
    props: {
      grades: {
        type: Array,
        default: [],
        required: true
      },
      classroom: {
        type: Object,
        default: {},
        required: true
      }
    },
    mounted () {
      this.grades.forEach(grade => {
        this.tasks.push(grade.task)
      })
      this.grades[0].documents.forEach(doc => {
        this.users.push(doc.user)
      })
    },
    data () {
      return {
        modal: true,
        tasks: [],
        users: []
      }
    },
    computed: {
    },
    methods: {
      closeViewer () {
        this.$emit('closediv')
      },
      getGrade (user, grade) {
        let gradetemp = 0
        grade.forEach(g => {
          if (g.user.id === user.id) {
            gradetemp = g.grade
          }
        })
        return gradetemp
      },
      print () {
        printjs('printDocument', 'html')
      }
    },
    destroyed () {
    }
  }
</script>

<style scoped>
td{
  width: 400px !important;
}
</style>
