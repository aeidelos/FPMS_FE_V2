<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-md-12">
        <div v-if="filterExtension == 'pdf'">
        <object  type="application/pdf" style="height:600px; width:100%;"
        v-bind:data="getView" id="show_obj1" class="obj"></object>
        </div>
        <div v-else>
        <span>Oops, file saat ini belum support untuk ditampilkan</span>
        <a v-bind:href="getView">Download File</a>
        </div>
        <div>
          <button v-on:click="closeViewer" class="btn btn-warning">Close</button>
        </div>
      </div>
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
      getDocumentAPI(this.document)
        .then(response => {
          this.result = URL.createObjectURL(new Blob([response], {type: 'application/pdf'}))
        })
    }
  },
  data () {
    return {
      result: {}
    }
  },
  computed: {
    getView () {
      return this.result
    },
    filterExtension () {
      var fileName = this.document.filename
      var ext = fileName.substr(fileName.lastIndexOf('.') + 1)
      return ext
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
