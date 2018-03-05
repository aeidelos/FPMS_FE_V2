<template>
  <div class="animated fadeIn">
    <div v-for="assignment in getAssignments" class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <p>{{ assignment[0].practican.name }}</p>
          </div>
        </div>
        <div class="row" v-for="singleAssignment in assignment">
          <div class="col-md-12 col-sm-12">
            <list-correction v-bind:document="singleAssignment"></list-correction>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeViewer from './../viewer/CodeViewer'
import DocumentViewer from './../viewer/DocumentViewer'
import ListCorrection from './ListCorrection'
import { getDocumentByClassroom as getDocumentByClassroomAPI } from '@/api/assignment'
export default {
  name: 'corrector-list',
  components: {
    CodeViewer,
    DocumentViewer,
    ListCorrection
  },
  props: {
    task: {
      required: false,
      default: null,
      type: Object
    },
    classroom: {
      required: false,
      default: null,
      type: Object
    }
  },
  mounted () {
    getDocumentByClassroomAPI(this.task, this.classroom)
      .then(response => {
        this.assignments = response.object.assignments
      })
  },
  data () {
    return {
      assignments: []
    }
  },
  computed: {
    getAssignments () {
      return this.assignments
    }
  }
}
</script>
