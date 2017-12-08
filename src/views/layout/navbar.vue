<template>
  <div class="navbar-container">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <svg-icon icon-class="home" slot="icon"/> 首页
      </mt-tab-item>
      <mt-tab-item id="category">
        <svg-icon icon-class="category" slot="icon"/> 分类
      </mt-tab-item>
      <mt-tab-item id="cart">
        <mt-badge type="error" size="small" v-if="goodsCount > 0">{{goodsCount}}</mt-badge>
        <svg-icon icon-class="car" slot="icon"/> 购物车
      </mt-tab-item>
      <mt-tab-item id="my">
        <svg-icon icon-class="my" slot="icon"/> 我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
  import {
    Tabbar,
    TabItem,
    Badge
  } from 'mint-ui'
  export default {
    name: 'navbar',
    components: {
      [Tabbar.name]: Tabbar,
      [TabItem.name]: TabItem,
      [Badge.name]: Badge
    },
    data() {
      return {
        selected: 'home',
        path: '',
        goodsCount: 0
      }
    },
    mounted() {
      var sessionStorageSelected = sessionStorage.getItem('selected')
      if (sessionStorageSelected) {
        this.selected = sessionStorageSelected;
      }
      let cartCount = localStorage.getItem('goodsData') ? JSON.parse(localStorage.getItem('goodsData')) : []
      Object.keys(cartCount).forEach(key => {
        this.goodsCount += cartCount[key].num
      })
      // console.log(2, cartCount, this.goodsCount)
      this.$root.eventHub.$on('goodsCount', cartNum => {
        this.goodsCount += cartNum
      })
    },
    watch: {
      selected: function(newValue, oldValue) {
        const path = newValue != null ? newValue : oldValue
        this.$router.push({
          path: '/' + path
        })
        sessionStorage.clear()
        newValue != null && sessionStorage.setItem('selected', path)
      },
      '$route' (to, from) {
        var home = to.path.replace('/', '');
        if (home === 'home') {
          sessionStorage.setItem('selected', home)
          this.selected = home;
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mint-tab-item {
    position: relative
  }
  
  .mint-badge {
    position: absolute;
    top: 5px;
    right: 5px
  }
</style>