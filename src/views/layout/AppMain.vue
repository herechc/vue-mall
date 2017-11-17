<template>
  <section class="app-main">
    <router-view :key="key"></router-view>
  </section>
</template>
<script>
  export default {
    name: 'AppMain',
    computed: {
      key() {
        return this.$route.meta.noAlive ? this.$route.name + new Date() : ''
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>