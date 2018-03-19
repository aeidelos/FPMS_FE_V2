<template>
 <div id="accordion" role="tablist" class="fadeIn animated">
  <div class="card" v-for="(document,index) in documents" :key="index">
    <div class="card-header" role="tab" :id="'heading'+ index" v-on:click="setActiveDocument(Object.keys(document)[0])" >
      <h5 class="mb-0">
        <a data-toggle="collapse" aria-expanded="true" aria-controls="'collapse'+index">
          {{ getPracticanName(document)}}
        </a>
      </h5>
    </div>
    <div :id="'collapse'+index" class="collapse animated fadeIn" 
      v-bind:class="{show: active !== null && active == Object.keys(document)[0] }"
    role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        <div v-for="assignment in document">
          <div class="row card" style="padding:20px; margin:20px;">
            <div class="card-body" style="padding:20px;">
              <div class="row">
                <p>Nama file : </p>
              </div>
              <div class="row">
                <ul>
                  <li v-for="file in assignment">{{ file.document.filename }}</li>
                </ul>
              </div>
              <div class="row">
                <div v-if="switcher.grade == null || switcher.grade != assignment[0].document.id">
                  <p>Nilai : {{ getAverageAssignment(assignment) }} <a style="color:blue;" @click="switcher.grade = assignment[0].document.id; switcher.gradeValue = assignment[0].document.grade">edit</a> </p>
                </div>
                <div v-else>
                  <p><input type="text" v-model="switcher.gradeValue"> <a style="color:blue;" @click="switcher.grade = null; setGrade(assignment[0].document)">simpan</a> </p>
                </div>  
              </div>
              <div class="row">
                <p>Plagiasi : {{ getAveragePlagiarism(assignment) }}</p>
              </div>
              <div class="row">
                <div class="pull-right">
                  <button class="btn btn-primary" v-on:click="setActiveViewer(assignment)">Lihat Dokumen</button>
                  <button class="btn btn-danger" v-on:click="viewPlagiarized(assignment)" >Dokumen Terplagiasi</button>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
  <div>
    <div v-if="activeViewer!=null">
      <document-viewer v-if="activeViewer[0].document.assignment.fileAllowed == 'document'" v-bind:document="activeViewer" withPlagiarism="true"
        v-on:closeViewer="closeViewer()"></document-viewer>
      <code-viewer v-if="activeViewer[0].document.assignment.fileAllowed == 'sourcecode'" v-bind:document="activeViewer" withPlagiarism="true"
        v-on:closeViewer="closeViewer()"></code-viewer>
    </div>
  </div>
</div>
</template>


<script>
import { getDocumentByClassroom as getDocumentByClassroomAPI, setGrade as setGradeAPI } from '@/api/assignment'
import CodeViewer from './../modules/viewer/CodeViewer'
import DocumentViewer from './../modules/viewer/DocumentViewer'
import { successAlert } from '@/utils/alert'
export default {
  name: 'classroom-practicum',
  components: {
    CodeViewer,
    DocumentViewer
  },
  props: {
    classroom: {
      required: false
    },
    practicum: {
      required: false
    },
    task: {
      required: true
    }
  },
  mounted () {
    if (this.task === null || this.task === undefined) {
      this.$router.go(-1)
    }
    if (this.classroom !== null || this.classroom !== undefined) {
      this.getDocumentByClassroom()
    }
  },
  data () {
    return {
      documents: [],
      active: null,
      activeViewer: null,
      switcher: {
        grade: null,
        gradeValue: 0
      }
    }
  },
  methods: {
    getDocumentByClassroom () {
      getDocumentByClassroomAPI(this.task, this.classroom)
        .then(response => {
          this.documents = response.data
        })
    },
    setActiveDocument (document) {
      this.active = document
    },
    closeViewer () {
      this.activeViewer = null
    },
    setActiveViewer (assignment) {
      this.activeViewer = assignment
    },
    getPracticanName (document) {
      let docid = Object.keys(document)[0]
      let obj = document[docid]
      let name = obj[0].document.practican.name
      return name
    },
    getAverageAssignment (assignment) {
      var sum = 0
      for (const file in assignment) {
        sum += assignment[file].document.grade
      }
      return sum / assignment.length
    },
    getAveragePlagiarism (assignment) {
      var sum = 0
      for (const file in assignment) {
        if (assignment[file].plagiarism !== null && assignment[file].plagiarism !== undefined && assignment[file].plagiarism !== '') sum += assignment[file].plagiarism.rate
      }
      return sum / assignment.length
    },
    setGrade (document) {
      setGradeAPI(document.id, this.switcher.gradeValue)
        .then(response => {
          if (response.status === 200) {
            successAlert('Berhasil mengubah nilai')
            this.switcher.gradeValue = 0
            this.getDocumentByClassroom()
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    viewPlagiarized (assignment) {
      var doc
      if (assignment[0].document.id === assignment[0].plagiarism.document1.id) {
        doc = assignment[0].plagiarism.document2
      } else {
        doc = assignment[0].plagiarism.document1
      }
      var temp = {document: doc}
      var arr = []
      arr.push(temp)
      this.setActiveViewer(arr)
    }
  }
}
</script>
