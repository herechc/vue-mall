<template>
  <div class="navbar-container">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img src="" slot="icon"> 首页
      </mt-tab-item>
      <mt-tab-item id="category">
        <img src="" slot="icon"> 分类
      </mt-tab-item>
      <mt-tab-item id="cart">
        <img src="" slot="icon"> 购物车
      </mt-tab-item>
      <mt-tab-item id="my">
        <img src="" slot="icon"> 我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import {
    Tabbar,
    TabItem
  } from 'mint-ui'
  export default {
    name: 'navbar',
    components: {
      [Tabbar.name]: Tabbar,
      [TabItem.name]: TabItem
    },
    data() {
      return {
        selected: 'home'
      }
    },
    watch: {
      selected: function(newValue, oldValue) {
        var path = newValue != null ? newValue : oldValue
        this.$router.push('/' + path)
      }
    }
  }
</script>

<style lang="scss" scoped>
  
</style>