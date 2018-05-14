<template>
  <div class="animated fadeIn">
    <div class="row">
      <b-modal title="Document Viewer" hide-footer size="lg" v-model="modal" 
       hide-header-close no-close-on-backdrop no-close-on-esc>
        <div class="col-md-12">
          <p>Nama/NIM Mahasiswa : {{ getIdentity }} </p>
          <div v-if="filterExtension == 'pdf'">
          <object  type="application/pdf" style="height:600px; width:100%;"
          v-bind:data="getView" id="show_obj1" class="obj"></object>
          </div>
          <div v-else>
          <span>Oops, file saat ini belum support untuk ditampilkan</span>
          <a target="_blank" v-bind:href="getLinkDocument">Download File</a>
          </div>
          <div>
            <button v-on:click="closeViewer" class="btn btn-warning">Close</button>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { getDocument as getDocumentAPI } from '@/api/assignment'
import { warningAlert } from '@/utils/alert'
export default {
  name: 'document-viewer',
  components: {
  },
  props: {
    document: null,
    withPlagiarism: {
      default: 'false',
      required: false
    }
  },
  mounted () {
    if (this.document !== null) {
      var docs
      if (this.withPlagiarism === 'false') {
        docs = this.document[0]
      } else {
        docs = this.document[0].document
      }
      getDocumentAPI(docs)
        .then(response => {
          this.result = URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
        })
        .catch(error => {
          console.log(error)
          warningAlert('Gagal memuat dokumen : ' + error.response.data.message)
        })
    }
  },
  data () {
    return {
      result: {},
      modal: true
    }
  },
  computed: {
    getView () {
      return this.result
    },
    filterExtension () {
      var fileName
      if (this.withPlagiarism === 'false') {
        fileName = this.document[0].filename
      } else {
        fileName = this.document[0].document.filename
      }
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1)
      return ext
    },
    getLinkDocument () {
      var docs
      if (this.withPlagiarism === 'false') {
        docs = this.document[0]
      } else {
        docs = this.document[0].document
      }
      return 'http://localhost:8000/file/assignment/' + docs.id
    },
    getIdentity () {
      let identity
      if (this.withPlagiarism === 'true') {
        identity = this.document[0].document.practican
      } else {
        identity = this.document[0].practican
      }
      return identity.name + '/' + identity.identity
    }
  },
  destroyed () {
    this.document = {}
    this.result = {}
  },
  methods: {
    closeViewer () {
      this.$emit('closeViewer')
    }
  }
}
</script>
