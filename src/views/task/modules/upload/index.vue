<template>
    <div class="animated fadeIn fadeOut">
        <div class="card card-primary">
            <div class="card-body col-sm-12">
                <div>
                  <div class="upload">
                        <ul>
                        </ul>
                        <div class="example-btn row">
                          <div v-if="switcher.upload == 'on'">
                            <input class="btn btn-default btn-sm" type="file" v-on:change="fileChange">
                            <button class="btn btn-primary btn-sm" v-on:click="fileUpload">Upload</button>
                            <button class="btn btn-danger btn-sm" v-if="document != null"
                            v-on:click="switcher.upload = 'off'">Batal</button>
                          </div>
                          <div v-else>
                            <p>Dokumen terunggah : {{ document.filename }}</p>
                            <button class="btn btn-primary" v-on:click="switcher.upload = 'on'">Ubah</button>
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
</style>


<script>
  import { getAssignmentInformation as getAssignmentInformationAPI,
    uploadAssignment as uploadAssignmentAPI } from '@/api/assignment'
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
            this.document = response.object.document
            if (this.document !== undefined) {
              this.switcher.upload = 'off'
            }
          })
      }
    },
    data () {
      return {
        temp: {},
        emitter: {},
        file: {},
        document: {},
        switcher: {
          upload: 'on'
        }
      }
    },
    computed: {
    },
    methods: {
      fileChange (event) {
        this.file = event.target.files[0]
      },
      fileUpload () {
        const uploader = new FormData()
        uploader.append('file', this.file, this.file.name)
        uploadAssignmentAPI(this.assignment, this.practican, uploader)
          .then(response => {
          })
      }
    },
    destroyed () {
    }
  }
</script>
