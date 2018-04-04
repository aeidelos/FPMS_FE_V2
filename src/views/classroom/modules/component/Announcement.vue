<template>
    <div class="fadeIn">
      <b-modal title="Modal title" hide-footer size="lg" v-model="modal" 
      hide-header no-close-on-backdrop no-close-on-esc>
        <h3>Pengumuman</h3>
        <div class="card">
          <div class="card-body">
            <div class="col-sm-12 col-md-12">
              <div role="group" class="b-form-group form-group">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label">Judul Pengumuman</label>
                        <div class="col-sm-9">
                        <div> <input type="text" v-model="announcement.title" class="form-control"></div>
                        </div>
                    </div>
              </div>
              <div role="group" class="b-form-group form-group">
                    <div class="form-row"><label for="horizPass" class="col-sm-3 col-form-label">Deskripsi Pengumuman</label>
                        <div class="col-sm-9">
                        <div> <wysiwyg v-model="announcement.description" /> </div>
                        </div>
                    </div>
              </div>
              <br>
              <button @click="closeViewer()" class="btn btn-danger btn-sm pull-right">Tutup</button>
              <button @click="saveAnnouncement()" class="btn btn-success btn-sm pull-right">Simpan</button>
            </div>
          </div>
        </div>
      </b-modal>
    </div>
</template>

<script>
  import { saveAnnouncement as saveAnnouncementAPI, getAnnouncement as getAnnouncementAPI }
    from '@/api/announcement'
  import { successAlert, warningAlert } from '@/utils/alert'
  export default {
    name: 'announcement',
    props: {
      classroom: {
        required: false,
        type: Object,
        default: null
      },
      practicum: {
        required: false,
        type: Object,
        default: null
      }
    },
    mounted () {
      var context
      if (this.practicum === null) {
        context = 'idClassroom=' + this.classroom.id
      } else if (this.classroom === null) {
        context = 'idPracticum=' + this.practicum.id
      }
      getAnnouncementAPI(context)
        .then(response => {
          if (response.status === 200) {
            this.announcement = response.data
          }
        })
    },
    data () {
      return {
        modal: true,
        announcement: {
          title: '',
          description: '',
          classroom: this.classroom,
          practicum: this.practicum,
          createdBy: this.$store.getters.user
        }
      }
    },
    computed: {
    },
    methods: {
      closeViewer () {
        this.$emit('closediv')
      },
      saveAnnouncement () {
        saveAnnouncementAPI(this.announcement)
          .then(response => {
            if (response.status === 201) successAlert('Pengumuman berhasil disimpan')
          })
          .catch(error => {
            console.log(error)
            warningAlert('Gagal menyimpan pengumuman : ' + error.response.data.message)
          })
      }
    },
    destroyed () {
    }
  }
</script>
