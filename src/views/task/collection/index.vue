<template>
  <!-- <div role="tablist" class="fadeIn animated">
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
  </div> -->

 <div id="accordion" role="tablist"class="fadeIn animated">
  <div class="card" v-for="(document,index) in documents" :key="index">
    <div class="card-header" role="tab" :id="'heading'+ index" v-on:click="setActiveDocument(document[0].practican.id)" >
      <h5 class="mb-0">
        <a data-toggle="collapse"
        v-on:click="setActiveDocument(document)" :href="'#collapse'+index" aria-expanded="true" aria-controls="'collapse'+index">
          {{ document[0].practican.name }}
        </a>
      </h5>
    </div>
    <div :id="'collapse'+index" class="collapse" 
      v-bind:class="{show: active !== null && active == document[0].practican.id}"
    role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
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
      active: null
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
