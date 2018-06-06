<template>
    <div v-if="loading" class="center-loader">
      <half-circle-spinner
        :animation-duration="1000"
        :size="30"
        color="#ff1d5e"
      />
    </div>
    <div v-else class="fadeIn">
        <div class="card card-primary">
            <div class="card-body col-sm-12">
                <div>
                  <div class="upload">
                        <div class="">
                          <div class="row ">
                            <div class="col-md-12">
                              <div class="col-md-12 attachment-title">Lampiran : {{ assignment.description }}
                                <div v-if="document.length>0">
                                  <span v-if="getIsPlagiarized(document) == false" class="badge badge-success">bebas plagiasi</span>
                                  <span v-else class="badge badge-danger">ditandai sebagai plagiasi</span>
                                </div>
                              </div>
                              <div class="col-md-12">
                                <div v-if="switcher.upload == 'on'" class="attachment-content">
                                    <span v-if="isNotLate">
                                      <input class="btn btn-default btn-sm" v-bind:accept="getFileAccepted" v-if="getFileSingleOrMultiple" multiple type="file" v-on:change="fileChange">
                                      <input class="btn btn-default btn-sm" v-bind:accept="getFileAccepted" v-else type="file" v-on:change="fileChange">
                                      <button class="btn btn-primary btn-sm" v-on:click="fileUpload"><i class="fa fa-upload"></i> Upload</button>
                                    </span>
                                    <span v-else> <span>Tugas sudah tidak dapat diunggah.</span> </span>
                                    <button class="btn btn-danger btn-sm" v-if="document.length>0"
                                    v-on:click="switcher.upload = 'off'"><i class="fa fa-ban"></i> Batal</button>
                                    <button class="btn btn-warning btn-sm" v-on:click="closeView" ><i class="fa fa-close"></i> Tutup</button>
                                  </div>
                                  <div v-else>
                                      <button class="btn btn-success" v-on:click="fileView(document)"><i class="fa fa-file"></i> Lihat</button>
                                      <button class="btn btn-primary" v-if="isNotLate" v-on:click="switcher.upload = 'on'"><i class="fa fa-cloud-upload"></i> Unggah Berkas</button>
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
  import { warningAlert, successAlert } from '@/utils/alert'
  import { HalfCircleSpinner } from 'epic-spinners'
  export default {
    name: 'upload-task',
    components: {
      HalfCircleSpinner
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
      },
      isNotLate: {
        type: Boolean,
        default: false,
        required: true
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
          .catch(error => {
            console.log(error)
          })
      }
    },
    created () {
      setTimeout(() => {
        this.loading = false
      }, 300)
    },
    data () {
      return {
        temp: {},
        loading: true,
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
          return '.java'
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
      getIsPlagiarized (document) {
        let res = false
        document.forEach(doc => {
          if (doc.markAsPlagiarized === true) {
            res = true
          }
        })
        console.log(res)
        return res
      },
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
        if (this.file === null || this.file.length === 0) {
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
              if (response.status === 200) {
                successAlert('Berhasil mengunggah dokumen')
                this.file = []
              }
            })
            .catch(error => {
              console.log(error)
              warningAlert('Gagal mengunggah dokumen')
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
