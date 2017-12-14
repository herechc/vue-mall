<template>
  <div class="category-container">
    <mt-header title="分类" class="block-header">
      <router-link to="/" slot="left">
        <mt-button icon="back" >返回</mt-button>
      </router-link>
    </mt-header>
    <div class="block-category">
      <div class="category-nav">
        <a @click="tabCate(item.id)" :class="{active: cateIndex === item.id}" v-for="(item,index) in category" :key="item.id">{{item.name}}</a>
      </div>
      <div class="category-main">
        <div class="product-list">
          <div class="product" v-for="item in goodsList" @click="handleDetails(item.id)" :key="item.id">
            <img :src="baseUrlImg + item.image_path">
            <div class="title">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Header, Button } from 'mint-ui'
  import { baseUrlImg } from 'utils/config'
  export default {
    name: 'category',
    components: {
      [Header.name]: Header,
      [Button.name]: Button
    },
    data() {
      return {
        category: [],
        cateIndex: 1,
        goodsList: {},
        baseUrlImg
      }
    },
    created() {
      // console.log(32)
    },
    mounted() {
      this.categorylist()
    },
    methods: {
      categorylist() {
        this.$api.fetchCategory().then(res => {
          const data = res.data
          if (data.code && data.list.length) {
            this.category = data.list
            this.tabCate(data.list[0].id)
          }
        })
      },
      tabCate(id) {
        this.cateIndex = id
        this.$api.fetchGoods(id).then(res => {
          // console.log(res)
          const data = res.data
          if (data.code) {
            this.goodsList = res.data.list
          }
        })
      },
      handleDetails(id) {
        this.$router.push({path: '/detail', query: {index: id}})
      }
    }
  }
</script>
<style lang="scss" scoped>
.block-category{
  min-height: 100vh;
  background:#f9f9f9;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  .category-nav{
    width: 80px;
    display: flex;
    background:#f0f0f0;
    flex-direction: column;
    a{
      width: 100%;
      display: block;
      line-height: 50px;
      text-align: center;
      &.active{
        color: #26a2ff;
        background:#f9f9f9;
        border-left:2px solid #26a2ff;
      }
    }
  }
  .category-main{
    width: 75%;
    padding:6px;
    box-sizing:border-box;
    background:#f9f9f9;
    &>img{
      width: 70px;
    }
    .product-list{
      margin-bottom: 70px;
      display: flex;
      flex-wrap: wrap;
      .product{
        width: 33%;
        padding: 0.4em 0;
        margin-bottom: 0.4em;
        display: flex;
        flex-direction: column;
        text-align: center;
        div{
          padding-top: 0.4em;
        }
      }
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin: 0 auto 10px;
      }
    }
  }
  .title{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis
  }
}
</style>
