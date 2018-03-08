<template>
    <div class="animated fadeIn">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card border">
                <div class="card-header">
                    <div>
                        <div>
                            <button v-on:click='switchAddingPracticum' class="btn btn-primary pull-right"><i class="fa fa-plus"></i>Tambah Baru</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div v-if="switcher.editablePracticum=='on'">
                        <div v-if="switcher.editableMode=='add'">
                        <editable-practicum act='add' v-on:changelist='updateListPracticum' v-on:closediv='switchEditablePracticum'></editable-practicum>
                        </div>
                        <div v-else-if="switcher.editableMode=='edit'">
                        <editable-practicum act='edit' v-bind:practicum='selectedPracticum' v-on:changelist='updateListPracticum' v-on:closediv='switchEditablePracticum' ></editable-practicum>
                        </div>
                        <div  v-else-if="switcher.editableMode=='delete'">
                        <editable-practicum act='delete' v-bind:practicum='selectedPracticum' v-on:changelist='updateListPracticum' v-on:closediv='switchEditablePracticum' ></editable-practicum>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <div><i class="fa fa-align-justify"></i> Praktikum</div>
                        </div>
                        <div class="card-body">
                            <table aria-busy="false" aria-colcount="4" aria-rowcount="-1" class="table b-table table-striped table-responsive-sm" id="__BVID__696_">
                                <!---->
                                <!---->
                                <thead class="">
                                    <tr>
                                        <th aria-colindex="1" class="">Mata Kuliah</th>
                                        <th aria-colindex="2" class="">Judul Praktikum</th>
                                        <th aria-colindex="3" class="">Koordinator</th>
                                        <th aria-colindex="4" class="">Sunting</th>
                                        <th aria-colindex="5" class="">Hapus</th>
                                    </tr>
                                </thead>
                                <!---->
                                <tbody class="">
                                    <!---->
                                    <tr v-for="(practicum, index) in practicums" aria-rowindex="" class="">
                                        <td aria-colindex="1" class="">{{ practicum.course.courseName }}</td>
                                        <td aria-colindex="2" class="">{{ practicum.name }}</td>
                                        <td aria-colindex="3" class="" v-if="practicum.coordinatorAssistance==null">Belum ada Koordinator Asisten</td>
                                        <td aria-colindex="3" class="" v-else-if="practicum.coordinatorAssistance!=null">{{ practicum.coordinatorAssistance.name }}</td>
                                        <td aria-colindex="4" class=""><button v-on:click="editPracticum(practicum)" class="btn"><i class="fa fa-edit"></i>Sunting</button></td>
                                        <td aria-colindex="5" class=""><button v-on:click="deletePracticum(practicum)" class="btn btn-danger"><i class="fa fa-trash"></i>Hapus</button></td>
                                    </tr>
                                    <!---->
                                    <!---->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAllPracticum as getAllPracticumAPI } from '@/api/practicum'

import EditablePracticum from './EditablePracticum'

export default {
  name: 'list-practicum',
  components: {
    EditablePracticum
  },
  mounted () {
    this.getAllPracticum()
  },
  data () {
    return {
      practicums: {},
      switcher: {
        editablePracticum: 'off',
        editableMode: 'add',
        indexButton: '-99'
      },
      selectedPracticum: {}
    }
  },
  methods: {
    deletePracticum: function (practicum) {
      this.switcher.editableMode = 'delete'
      this.selectedPracticum = Object.assign({}, practicum)
      this.switchEditablePracticum()
    },
    editPracticum: function (practicum) {
      this.switcher.editableMode = 'edit'
      this.selectedPracticum = Object.assign({}, practicum)
      this.switchEditablePracticum()
    },
    switchAddingPracticum: function () {
      this.switcher.editableMode = 'add'
      this.switchEditablePracticum()
    },
    switchEditablePracticum: function () {
      if (this.switcher.editablePracticum === 'off') {
        this.switcher.editablePracticum = 'on'
      } else {
        this.switcher.editablePracticum = 'off'
      }
    },
    getAllPracticum: function () {
      getAllPracticumAPI().then(response => { this.practicums = response.data.content })
    },
    updateListPracticum: function (args) {
      this.getAllPracticum()
    }
  }
}
</script>
