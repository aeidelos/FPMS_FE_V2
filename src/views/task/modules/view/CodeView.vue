<template>
    <div class="animated fadeIn fadeOut">
      <div>
        {{ getPrism('o') }}
      </div>
    </div>
</template>

<style>
</style>


<script>
  import prism from 'prismjs'
  export default {
    name: 'code-view',
    component: {
    },
    props: {
    },
    mounted () {
    },
    data () {
    },
    computed: {
    },
    methods: {
      getPrism (code, type) {
        prism.highlight(code, prism.language.javascript)
      }
    },
    destroyed () {
    }
  }
</script>
