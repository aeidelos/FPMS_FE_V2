<template>
    <div class="fadeIn">
      <b-modal title="Modal title" v-model="modal"  hide-footer size="lg" hide-header no-close-on-backdrop no-close-on-esc>
        <div class="card" >
          <div class="card-body" style="overflow-x:auto" id="printDocument" >
            <h3> Daftar Praktikan {{ classroom.practicum.name}} - {{classroom.name }} </h3><br>
            <table class="table table-bordered" style="table-layout: fixed;max-width: 200px;">
              <thead style="">
                <th style="text-align:left;width:150px" >NIM</th>
                <th style="text-align:left;width:550px" >Nama Mahasiswa</th>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id" >
                  <td style="text-align:left;">{{ user.identity }}</td>
                  <td style="text-align:left;">{{ user.name }} </td>            </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer">
            <button class="btn btn-warning btn-sm pull-right" style="margin-left:5px;" @click="closeViewer"><i class="fa fa-close"></i> Tutup</button>
          </div>
        </div>
      </b-modal>
    </div>
</template>

<script>
  export default {
    name: 'list-practican',
    props: {
      classroom: {
        type: Object,
        required: true
      }
    },
    mounted () {
      this.users = this.classroom.practican
    },
    data () {
      return {
        users: {},
        modal: true
      }
    },
    computed: {
    },
    methods: {
      closeViewer () {
        this.$emit('closediv')
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
