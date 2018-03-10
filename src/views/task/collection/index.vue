<template>
  <div role="tablist" class="fadeIn animated">
    <b-card no-body class="mb-1" v-for="document in documents">
      <b-card-header header-tag="header" class="p-1" role="tab" v-on:click="setActiveDocument(document[0].practican.id)" > 
        <b-btn block href="#"  >{{ document[0].practican.name }}</b-btn>
      </b-card-header>
      <b-collapse v-bind:id="document[0].practican.id" v-bind:class="{visible: active == document[0].practican.id}" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <p class="card-text">
            I start opened because <code>visible</code> is <code>true</code>
          </p>
          <p class="card-text">
            Kadal
          </p>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>


<script>
import { getDocumentByClassroom as getDocumentByClassroomAPI } from '@/api/assignment'
export default {
  name: 'classroom-practicum',
  components: {
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
      active: {}
    }
  },
  methods: {
    getDocumentByClassroom () {
      getDocumentByClassroomAPI(this.task, this.classroom)
        .then(response => {
          this.documents = response.data
        })
    },
    setActiveDocument (document) {
      this.active = document
    }
  }
}
</script>
