<template>
  <div class="animated fadeIn">
    <b-modal title="Modal title" size="lg" v-model="largeModal" @ok="largeModal = false"
    hide-footer hide-header no-close-on-backdrop>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <p>Nama/NIM Mahasiswa : {{ getIdentity }}</p>
          <ul class="nav nav-tabs">
            <li v-for="content in getHighlighted" class="nav-item">
              <a class="nav-link" v-on:click="setSwitcherData(content)"
              v-bind:class="{active : isSwitcherActive(content)}">{{ content.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row card-body">
        <div class="col-md-12 col-sm-12">
          <pre v-highlightjs="switcher.data.code"><code class="java"></code></pre>
          <button class="btn btn-success pull-right" v-on:click="runCode">Run</button>
        </div>
      </div>
      <div class="row card-body">
        <div class="col-md-12 col-sm-12">
          <div class="" style="min-height:100px; background-color:#e0e0d1; margin-bottom:7px;">
            <p>Result : </p>
            <pre v-highlightjs="getCodeResult"><code class="java"></code></pre>
          </div>
          <button class="btn btn-danger btn pull-right" v-on:click="closeViewer">Tutup</button>
        </div>
        </div>
    </b-modal>
  </div>
</template>

<script>
import { getDocument as getDocumentAPI, runCode as runCodeAPI } from '@/api/assignment'
import { warningAlert } from '@/utils/alert'
export default {
  name: 'code-viewer',
  components: {
  },
  props: {
    document: null,
    withPlagiarism: {
      default: 'false',
      required: false
    }
  },
  methods: {
    getName (ext) {
      let split = ext.split('/')
      return split[split.length - 1]
    },
    setSwitcherData (data) {
      this.switcher.data = data
    },
    isSwitcherActive (data) {
      return (this.switcher.data.name === data.name)
    },
    closeViewer () {
      this.$emit('closeViewer')
    },
    runCode () {
      var code
      if (this.withPlagiarism === 'true') {
        code = this.document[0].document
      } else {
        code = this.document[0]
      }
      runCodeAPI(code)
        .then(response => {
          if (response.status === 200) {
            this.codeResult = response.data
          }
        })
        .catch(error => {
          console.log(error)
          let msg = ''
          if (error.response.data === 403) msg = 'Terjadi kesalahan pada server kompiler'
          warningAlert('Gagal menjalankan kode program : ' + msg + ' / ' + error.response.data.message)
        })
    }
  },
  mounted () {
    if (this.document !== null) {
      this.document.forEach(element => {
        if (this.withPlagiarism === 'true') element = element.document
        getDocumentAPI(element)
          .then(response => {
            var decoder = new TextDecoder('utf-8')
            if (response.status === 200) {
              let res = {
                name: this.getName(element.filename),
                code: decoder.decode(new Uint8Array(response.data))
              }
              this.result.push(res)
              this.switcher.data = res
            }
          })
          .catch(error => {
            console.log(error)
            warningAlert('Gagal memuat kode program : ' + error.response.data.message)
          })
      })
    }
    this.largeModal = true
  },
  data () {
    return {
      result: [],
      largeModal: true,
      switcher: {
        data: {}
      },
      codeResult: ''
    }
  },
  computed: {
    getHighlighted () {
      return this.result
    },
    getCodeResult () {
      return this.codeResult.result !== '' && this.codeResult.result !== null ? this.codeResult.result : this.codeResult.log
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
  }
}
</script>
