<template>
    <div class="fadeIn">
        <div class="card card-primary">
            <div class="card-body col-sm-12">
                <div>
                  <div class="upload">
                        <div class="">
                          <div class="row ">
                            <div class="col-md-12">
                              <div class="col-md-12 attachment-title">Lampiran : {{ assignment.description }}</div>
                              <div class="col-md-12">
                                <div v-if="switcher.upload == 'on'" class="attachment-content">
                                    <input class="btn btn-default btn-sm" v-bind:accept="getFileAccepted" v-if="getFileSingleOrMultiple" multiple type="file" v-on:change="fileChange">
                                    <input class="btn btn-default btn-sm" v-bind:accept="getFileAccepted" v-else type="file" v-on:change="fileChange">
                                    <button class="btn btn-primary btn-sm" v-on:click="fileUpload">Upload</button>
                                    <button class="btn btn-danger btn-sm" v-if="document != null"
                                    v-on:click="switcher.upload = 'off'">Batal</button>
                                    <button class="btn btn-warning btn-sm" v-on:click="closeView" >Tutup</button>
                                  </div>
                                  <div v-else>
                                      <button class="btn btn-success" v-on:click="fileView(document)">Lihat</button>
                                      <button class="btn btn-primary" v-on:click="switcher.upload = 'on'">Ubah</button>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
  .example-simple label.btn {
    margin-bottom: 0;
    margin-right: 1rem;
  }
  .upload {
    padding: 10px;
  }
  .attachment-title {
    margin-bottom: 10px;
  }
</style>


<script>
  import { getAssignmentInformation as getAssignmentInformationAPI,
    uploadAssignment as uploadAssignmentAPI } from '@/api/assignment'
  import { warningAlert } from '@/utils/alert'
  export default {
    name: 'upload-task',
    component: {
    },
    props: {
      assignment: {
        type: Object,
        default: null,
        required: false
      },
      practican: {
        type: Object,
        default: null,
        required: false
      }
    },
    mounted () {
      if (this.assignment !== null) {
        getAssignmentInformationAPI(this.assignment, this.practican)
          .then(response => {
            this.document = response.data
            if (this.document.length > 0) {
              this.switcher.upload = 'off'
            }
          })
      }
    },
    data () {
      return {
        temp: {},
        emitter: {},
        file: [],
        document: [],
        switcher: {
          upload: 'on',
          view: 'on'
        },
        modal: true
      }
    },
    computed: {
      getFileAccepted () {
        const ext = this.assignment.fileAllowed
        if (ext === 'document') {
          return '.doc,.docx,.pdf'
        } else if (ext === 'sourcecode') {
          return '.java,.php,.txt,.py'
        }
      },
      getFileSingleOrMultiple () {
        const ext = this.assignment.fileAllowed
        if (ext === 'document') {
          return false
        } else if (ext === 'sourcecode') {
          return true
        }
      }
    },
    methods: {
      fileView (docs) {
        this.$emit('viewDocument', docs)
      },
      closeView () {
        this.$emit('closeViewer')
      },
      fileChange (event) {
        this.file = event.target.files
      },
      fileUpload () {
        if (this.file === null) {
          warningAlert('File tidak boleh kosong')
        } else {
          const uploader = new FormData()
          for (let i = 0; i < this.file.length; i++) {
            uploader.append('file', this.file[i], this.file[i].name)
          }
          if (this.document.length > 0) uploader.append('document', this.document[0].id)
          uploadAssignmentAPI(this.assignment, this.practican, uploader)
            .then(response => {
              this.document = response.data
              this.switcher.upload = 'off'
            })
        }
      }
    },
    destroyed () {
      this.temp = {}
      this.emitter = {}
      this.file = null
      this.document = {
        id: null
      }
      this.switcher = {
        upload: 'on'
      }
    }
  }
</script>
