<template>
  <div class="animated fadeIn">
    <pre v-highlightjs="getHighlighted"><code class="java"></code></pre>
  </div>
</template>

<script>
import { getDocument as getDocumentAPI } from '@/api/assignment'
export default {
  name: 'code-viewer',
  components: {
  },
  props: {
    document: null
  },
  mounted () {
    if (this.document !== null) {
      getDocumentAPI(this.document)
        .then(response => {
          var decoder = new TextDecoder('utf-8')
          this.result = decoder.decode(new Uint8Array(response))
        })
    }
  },
  data () {
    return {
      result: {}
    }
  },
  computed: {
    getHighlighted () {
      return this.result
    }
  }
}
</script>
