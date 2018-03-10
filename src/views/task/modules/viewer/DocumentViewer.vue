<template>
  <div class="animated fadeIn">
    <div class="row">
      <b-modal title="Modal title" hide-footer size="lg" v-model="modal" 
       hide-header-close no-close-on-backdrop no-close-on-esc>
        <div class="col-md-12">
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
export default {
  name: 'document-viewer',
  components: {
  },
  props: {
    document: null
  },
  mounted () {
    if (this.document !== null) {
      getDocumentAPI(this.document[0])
        .then(response => {
          this.result = URL.createObjectURL(new Blob([response.data], {type: 'application/pdf'}))
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
      var fileName = this.document[0].filename
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1)
      return ext
    },
    getLinkDocument () {
      return 'http://localhost:8000/file/assignment/' + this.document[0].id
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
