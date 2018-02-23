<template>
    <div class="animated fadeIn fadeOut">
        <div class="card card-primary">
            <div class="card-header">
                <div v-if="mode=='add'"><strong>Tambah Tugas Baru</strong>
                </div>
                <div v-else-if="mode=='edit'"><strong>Edit Tugas - {{ task.title }}</strong>
                </div>
                <div v-else-if="mode=='delete'"><strong>Hapus Tugas - {{ task.title }}</strong>
                </div>
            </div>
            <div class="card-body">
                <div v-if="mode=='delete'"><span> Apakah anda yakin ingin menghapus tugas ini? </span></div>
                <div role="group" class="b-form-group form-group">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label">Judul Tugas</label>
                        <div class="col-sm-9">
                        <input v-model="task.title" type="text" placeholder="Judul tugas.." class="form-control">
                        <!----><small class="form-text text-muted">Masukkan Judul Tugas</small></div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label">Deskripsi Tugas</label>
                        <div class="col-sm-9">
                        <wysiwyg v-model="task.description" />
                        <!----><small class="form-text text-muted">Deskripsikan Detail Tugas Serinci Mungkin</small></div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label">Waktu Pengerjaan</label>
                        <div class="col-sm-9">
                        <date-picker v-on:confirm="assignmentDatePicker()" v-model="temp.selectedDate" lang="en" range type="datetime" 
                        format="yyyy-MM-dd" confirm></date-picker>
                        <!----><small class="form-text text-muted">Batas Mulai Sampai Selesai</small></div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label">Keterlambatan</label>
                        <div class="col-sm-9">
                        <label class="switch switch-text switch-primary">
                            <input type="checkbox" class="switch-input" checked v-model="task.allowLate">
                            <span class="switch-label" data-on="Ya" data-off="Tdk"></span>
                            <span class="switch-handle"></span>
                        </label>
                        <!----><small class="form-text text-muted">Perbolehkan Pengumpulan Seusai Keterlambatan Peserta</small></div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label">Laman Pengerjaan</label>
                        <div class="col-sm-3">
                            <input type="text" placeholder="Judul lampiran.." class="form-control" v-model="temp.assignment.description">
                        </div>
                        <div class="col-sm-3">
                            <select name="" id="" class="form-control" v-model="temp.assignment.fileAllowed">
                                <option value="document">Dokumen (.doc/.docx/.pdf)</option>
                                <option value="sourcecode">Kode Program (.java/.php/.py)</option>
                                <option value="text">Input Manual (Form Pengisian Tambahan)</option>
                            </select>
                        </div>
                        <div class="col-sm-2">
                            <button v-on:click="addTemporaryAssignment()" class="btn btn-primary"><i class="fa fa-plus"></i></button>
                        </div>
                    </div>
                </div>
                <div role="group" class="b-form-group form-group" v-if="task.assignments.length>0" v-for="(assignment, index) in task.assignments">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label"></label>
                        <div class="col-sm-4">
                            <i v-if="assignment.fileAllowed=='sourcecode'" class="fa fa-code bg-primary p-1 mr-1 float-left"></i>
                            <i v-else-if="assignment.fileAllowed=='document'" class="fa fa-book bg-primary p-1 mr-1 float-left"></i>
                            <i v-else-if="assignment.fileAllowed=='text'" class="fa fa-edit bg-primary p-1 mr-1 float-left"></i>
                            <span style="margin-left:20px">{{ assignment.description }}</span>
                        </div>
                        <div class="col-sm-3">
                            <span>
                                <i v-if="assignment.fileAllowed=='sourcecode'" >source code (.java/.py/.php)</i>
                                <i v-else-if="assignment.fileAllowed=='document'" >document (.doc/.docx/.pdf)</i>
                                <i v-else-if="assignment.fileAllowed=='text'" >text editor</i>
                            </span>
                        </div>
                        <div class="col-sm-2">
                            <button v-on:click="removeTemporaryAssignment(index)" class="btn btn-danger btn-sm"><i class="fa fa-close"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div><button v-if="mode == 'add'" v-on:click="addTask" type="submit" class="btn btn-success btn-sm"><i class="fa fa-plus-square"></i> Tambahkan</button>
                <button v-if="mode == 'edit'"  type="submit"  class="btn btn-success btn-sm"><i class="fa fa-save"></i> Simpan</button>
                <button v-if="mode == 'delete'" type="submit" class="btn btn-danger btn-sm"><i class="fa fa-minus-circle"></i> Hapus</button>
                <button class="btn btn-sm" ><i class="fa fa-ban"></i> Batal</button></div>
            </div>
        </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import { addTask as addTaskAPI } from '@/api/task'
  export default {
    name: 'editable-task',
    component: {
    },
    props: {
      mode: null,
      classroom: null,
      practicum: null,
      selectedTask: {
        type: Object,
        default: null,
        required: false
      }
    },
    mounted () {
      if (this.selectedTask != null) {
        this.task = this.selectedTask
      }
    },
    computed: {
    },
    data () {
      return {
        task: {
          description: '',
          title: '',
          createdDate: '',
          dueDate: '',
          id: null,
          practicum: null,
          classroom: null,
          createdBy: null,
          assignments: [],
          allowLate: false
        },
        temp: {
          selectedDate: '',
          assignment: {
            fileAllowed: '',
            description: ''
          }
        }
      }
    },
    methods: {
      addTemporaryAssignment () {
        this.task.assignments.push(Object.assign({}, this.temp.assignment))
        this.temp.assignment.description = ''
        this.temp.assignment.fileAllowed = ''
      },
      removeTemporaryAssignment (index) {
        this.task.assignments.splice(index, 1)
      },
      assignmentDatePicker () {
        this.task.createdDate = moment(this.temp.selectedDate[0]).format('DD-MM-YYYY hh:mm:ss')
        this.task.dueDate = moment(this.temp.selectedDate[1]).format('DD-MM-YYYY hh:mm:ss')
      },
      addTask () {
        // required validation (to be implemented)
        this.task.practicum = this.practicum
        this.task.createdBy = this.$store.getters.user
        addTaskAPI(this.task)
          .then(response => {

          })
      }
    },
    destroyed () {
      this.task = {}
    }
  }
</script>
