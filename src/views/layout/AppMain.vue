<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
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
