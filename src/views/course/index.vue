<template>
    <div class="animated fadeIn">
        <div class="col-sm-12 col-md-12 col-lg-12">
            <div class="card border">
                <div class="card-header">
                    <div>
                        <div>
                            <button v-on:click="switchEditableCourse(); switchAddingButton();" class="btn btn-primary pull-right"><i class="fa fa-plus"></i>Tambah Baru</button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div v-if="switcher.editableCourse=='on'">
                        <div v-if="switcher.editableMode=='add'">
                            <editable-course v-on:closediv= "switchEditableCourse" v-on:changelist="updateCourseList"></editable-course>
                        </div>
                        <div v-if="switcher.editableMode=='edit'">
                            <editable-course act="edit"  v-on:closediv= "switchEditableCourse" v-bind:course="temp.selectedCourse" v-on:changelist="updateCourseList"></editable-course>
                        </div>
                        <div v-if="switcher.editableMode=='delete'">
                            <editable-course act="delete"  v-on:closediv= "switchEditableCourse" v-bind:course="temp.selectedCourse" v-on:changelist="updateCourseList"></editable-course>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <div><i class="fa fa-align-justify"></i> Mata Kuliah</div>
                        </div>
                        <div class="card-body">
                            <table aria-busy="false" aria-colcount="4" aria-rowcount="-1" class="table b-table table-striped table-responsive-sm" id="__BVID__696_">
                                <!---->
                                <!---->
                                <thead class="">
                                    <tr>
                                        <th aria-colindex="1" class="">Kode MK</th>
                                        <th aria-colindex="2" class="">Judul</th>
                                        <th aria-colindex="3" class="">Ubah</th>
                                        <th aria-colindex="4" class="">Hapus</th>
                                    </tr>
                                </thead>
                                <!---->
                                <tbody class="">
                                    <!---->
                                    <tr v-for="(course, index) in courses" aria-rowindex="" class="">
                                        <td aria-colindex="1" class="">{{ course.courseCode }}</td>
                                        <td aria-colindex="2" class="">{{ course.courseName }}</td>
                                        <td aria-colindex="3" class="">
                                        <button v-on:click="editingCourse(index,course)" class="btn"><i class="fa fa-edit"></i>Ubah</button>
                                        </td>
                                        <td aria-colindex="4" class="">
                                        <button v-on:click="deletingCourse(index,course)"  class="btn btn-danger"><i class="fa fa-trash"></i>Hapus</button>
                                        </td>
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
import EditableCourse from './EditableCourse'
import { getAllCourses } from '@/api/course'
export default {
  name: 'list-course',
  components: {
    EditableCourse
  },
  mounted () {
    this.getCourses()
  },
  data () {
    return {
      courses: {},
      switcher: {
        addingButton: 'on',
        editableCourse: 'off',
        editableMode: 'add',
        indexButton: '-99'
      },
      temp: {
        selectedCourse: {}
      }
    }
  },
  methods: {
    deletingCourse: function (index, course) {
      this.switcher.editableMode = 'delete'
      this.temp.selectedCourse = Object.assign({}, course)
      if (this.switcher.indexButton === '-99' || index === String(this.switcher.indexButton)) {
        this.switchEditableCourse()
      }
    },
    editingCourse: function (index, course) {
      this.switcher.editableMode = 'edit'
      this.temp.selectedCourse = Object.assign({}, course)
      if (this.switcher.indexButton === '-99' || index === String(this.switcher.indexButton)) {
        this.switchEditableCourse()
      }
    },
    getCourses: function () {
      getAllCourses().then(response => { this.courses = response.object.courses.content })
    },
    switchEditableCourse: function () {
      if (this.switcher.editableCourse === 'off') {
        this.switcher.editableCourse = 'on'
      } else {
        if (this.switcher.addingButton === 'on') {
          this.switchAddingButton()
        }
        this.switcher.editableCourse = 'off'
      }
    },
    switchAddingButton: function () {
      this.switcher.editableMode = 'add'
      if (this.switcher.addingButton === 'off') {
        this.switcher.addingButton = 'on'
      } else {
        this.switcher.addingButton = 'off'
      }
    },
    updateCourseList: function (args) {
      if (args.mode === 'add') {
        this.courses.push(args.course)
      } else {
        var coursetemp = this.courses.filter(function (item) {
          return item.id !== args.course.id
        })
        if (args.mode === 'update') {
          coursetemp.push(args.course)
        }
        console.log(coursetemp)
        this.courses = Object.assign({}, coursetemp)
      }
    }
  }
}
</script>
