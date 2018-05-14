<template>
 
 <div id="accordion" role="tablist" class="fadeIn animated row">
   <div class="col-md-12 col-sm-12">
     <div class="card card-body">
       <h3>Judul Tugas</h3>
        <p>Deskripsi</p>
        <p>Pengumpulan</p>
        <ul>
          <li>Tanggal 1</li> 
          <li>Tanggal 2</li>
        </ul>
     </div>
   </div>
  <div class="col-md-12 col-sm-12 ">
    <paginate-links class="" for="assignment-paginate" :limit="1" 
      :show-step-links="true"
      :classes="{
        'ul': 'pagination',
        '.next > a': 'page-link',
        '.prev > a': 'page-link'
    }"></paginate-links>
  </div>
  <paginate
    name="assignment-paginate"
    :list="documents"
    :per="10"
    tag="card"
    class="col-md-12 col-sm-12"
  >
  <div v-for="(document,index) in paginated('assignment-paginate')">
    
    <div>
      
        <div v-for="assignment in document">
          <div style="">
            <div class="card ml-0 mr-0 col-md-12" >
              <div class="pt-3">
                <h5 class="mb-0">
                  {{ getPracticanName(document)}}
                </h5>
              </div>
              <div class="card-body p-4">
              <div class="row">
                <p>Nama file : </p>
              </div>
              <div class="row">
                <ul>
                  <li v-for="file in assignment">
                    {{ getFileName(file.document.filename) }}
                    <span v-if="file.document.markAsPlagiarized" class="badge badge-danger">
                      terplagiasi
                    </span>
                    <span v-if="file.plagiarism.rate>=50" class="badge badge-warning">
                      similarity = {{ file.plagiarism.rate.toFixed(2) }}
                    </span>
                    <span v-else-if="file.plagiarism.rate<50" class="badge badge-primary">
                      similarity = {{ file.plagiarism.rate.toFixed(2) }}
                    </span>
                    <span class="badge badge-info" v-on:click="viewPlagiarized(file)">
                      lihat dokumen pembanding
                    </span>
                    <span @click="setPlagiarizedStatus(file.document, false)" class="badge badge-success" v-if="file.document.markAsPlagiarized">
                      tandai bukan plagiasi
                    </span>
                    <span @click="setPlagiarizedStatus(file.document, true)" class="badge badge-danger" v-else-if="file.document.markAsPlagiarized == false">
                      tandai sebagai plagiasi
                    </span>
                    <span></span>
                    </li>
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
                <div class="col-sm-12 col-md-12">
                  <button class="btn btn-primary pull-right" v-on:click="setActiveViewer(assignment)"><i class="fa fa-file"></i> Lihat Dokumen</button>
                 </div>
              </div>
              </div>
            </div>
          </div> 
      </div>
    </div>
  </div>
  </paginate>
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
import { getDocumentByClassroom as getDocumentByClassroomAPI, setGrade as setGradeAPI, setPlagiarized } from '@/api/assignment'
import CodeViewer from './../modules/viewer/CodeViewer'
import DocumentViewer from './../modules/viewer/DocumentViewer'
import { successAlert, warningAlert } from '@/utils/alert'
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
      },
      paginate: ['assignment-paginate']
    }
  },
  methods: {
    getFileName (longName) {
      let split = longName.split('/')
      return split[3]
    },
    getDocumentByClassroom () {
      getDocumentByClassroomAPI(this.task, this.classroom)
        .then(response => {
          this.documents = Object.values(response.data)
        })
        .catch(error => {
          console.log(error)
          warningAlert('Belum ada yang mengumpulkan dokumen')
        })
    },
    filterName (filename) {
      return filename.substr(0, 80)
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
    setPlagiarizedStatus (document, status) {
      setPlagiarized(document.id, status)
        .then(response => {
          if (response.status === 200) {
            successAlert('Berhasil mengubah status plagiasi')
            document.markAsPlagiarized = status
          }
        })
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
      return Math.round(sum / assignment.length)
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
          warningAlert('Gagal mengubah nilai')
        })
    },
    viewPlagiarized (assignment) {
      var doc
      if (assignment.document.id === assignment.plagiarism.document1.id) {
        doc = assignment.plagiarism.document2
      } else {
        doc = assignment.plagiarism.document1
      }
      var temp = {document: doc}
      var arr = []
      arr.push(temp)
      this.setActiveViewer(arr)
    }
  }
}
</script>
