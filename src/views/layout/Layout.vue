<template>
  <div class="app-wrapper">
     <App-main></App-main>
     <navbar></navbar>  
  </div>
</template>
<script>
  import AppMain from 'views/layout/AppMain'
  import navbar from 'views/layout/navbar'
  export default {
    name: 'layout',
    components: {
      AppMain,
      navbar
    }
  }
</script>
<style lang="scss" scoped>

</style>
