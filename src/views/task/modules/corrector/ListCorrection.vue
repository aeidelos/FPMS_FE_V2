<template>
    <div class="animated fadeIn fadeOut">
        <div class="card card-primary">
            <div class="card-body col-sm-12">
                <div>
                  <div class="example-btn row">
                    <p>
                      <span>Dokumen terunggah : {{ document.filename }}</span>
                      <br>
                      <span>Tingkat Plagiasi : </span>
                    </p>
                    <p>
                    <button class="btn btn-primary">Input Nilai</button>
                    <button class="btn btn-success" @click="modal = modal ? false : true">Lihat</button>
                    <b-modal title="Modal title" hide-footer size="lg" v-model="modal" 
      hide-header-close no-close-on-backdrop no-close-on-esc>
      <p>TRR</p>
                    </b-modal>
                    </p>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'list-correction',
    component: {
    },
    props: {
      document: {
        type: Object,
        required: false,
        default: null
      }
    },
    mounted () {
    },
    data () {
      return {
        modal: false
      }
    },
    computed: {
    },
    methods: {
    },
    destroyed () {
      this.document = null
    }
  }
</script>
