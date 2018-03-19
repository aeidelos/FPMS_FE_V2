<template>
  <div class="resource-body" style="min-height:450px;">
    <div class="row" style="min-height:450px;">
      <div class="col-md-6 resource-empty">
      </div>
      <div class="col-md-6 vertical-center">
        <div class="row"><span class="resource-title">{{ title }}...</span></div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .resource-body {
    min-height: 100%;
    min-width: 100%;
  }
  .resource-empty {
    background: url('/static/img/404.png') no-repeat center center;
    background-size: 300px 200px;
  }
  .vertical-center {
    display: flex;
    align-items: center;
  }
  .resource-title {
    font-size: 30px;
    font-family: "Times New Roman", Times, serif;
    font-style: italic;
  }

</style>


<script>
export default {
  props: {
    title: ''
  }
}
</script>
