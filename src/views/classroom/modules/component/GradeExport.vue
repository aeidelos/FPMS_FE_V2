<template>
    <div class="fadeIn">
      <b-modal title="Modal title" v-model="modal"  hide-footer size="lg" hide-header no-close-on-backdrop no-close-on-esc>
        <div class="card">
          <div class="card-header">
            Daftar Nilai {{ classroom.practicum.name}} - {{classroom.name }}
          </div>
          <div class="card-body">
            <table>
              <thead>
                <td>NIM</td>
                <td>Nama Mahasiswa</td>
                <td v-for="task in tasks">{{ task.title }}</td>
              </thead>
              <tbody>
                <tr v-for="user in users">
                  <td>{{ user.identity }}</td>
                  <td>{{ user.name }} </td>
                  <td  v-for="grade in grades">  {{ getGrade(user, grade.documents) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <button class="btn btn-warning btn-sm pull-right" @click="closeViewer">Tutup</button>
          </div>
        </div>
      </b-modal>
    </div>
</template>

<script>
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
      }
    },
    destroyed () {
    }
  }
</script>
