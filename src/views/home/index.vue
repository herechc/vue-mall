<template>
  <div class="my-container">
    <div class="block-swipe">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in bannerlist" :key="item.id">
          <img :src="baseUrlImg + item.image_path" >
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="block-product">
      <div class="wrapper product-new">
        <p>最近新品</p>
        <div class="product-list">
          <div class="product" v-for="item in tableList" @click="goDetails(item.id)">
            <img :src="baseUrlImg + item.image_path" >
            <div class="title">{{item.name}}</div>
            <div class="price">${{item.price}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="block-product">
      <div class="wrapper product-hot">
        <p>精品推荐</p>
        <div class="product-list">
          <div class="product">
            <img src="../../assets/images/pro1.jpg" alt="">
            <div class="title">test</div>
            <div class="price">$1024</div>
          </div>
      </div>
    </div> -->
  </div>
</template>
<script>
  import { Swipe, SwipeItem, Loadmore, MessageBox } from 'mint-ui'
  import { baseUrlImg } from 'utils/config'
  export default {
    name: 'home',
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [Loadmore.name]: Loadmore,
      [MessageBox.name]: MessageBox
    },
    data() {
      return {
        listQuery: {},
        tableList: [],
        baseUrlImg,
        bannerlist: []
      }
    },
    mounted() {
      this.getlist()
      this.getBanner()
    },
    methods: {
      getlist() {
        this.$api.goodsList().then(res => {
          // console.log(res)
          if (res.data.code === 1) {
            this.tableList = res.data.list
          } else {
            MessageBox.alert(res.message)
          }
        }).catch(err => {
          MessageBox.alert(err.message)
        })
      },
      goDetails(id) {
        this.$router.push({path: '/detail', query: { index: id }})
      },
      getBanner() {
        this.$api.fetchBanner().then(res => {
          // console.log(res)
          if (res.data.code) {
            this.bannerlist = res.data.list
          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
.block-swipe{
  height:250px;
}
.block-product{
  .product{
    margin-bottom: 70px;
  }
  p{
    text-align: center;
    color: #AB956D;
  }
  .product-list{
    padding: 0.4em;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .product{
      width: 49%;
      padding: 0.4em 0;
      margin-bottom: 0.4em;
      background: #eee;
      display: flex;
      flex-direction: column;
      text-align: center;
      div{
        padding-top: 10px;
      }
    }
    img{
      width: 70px;
      height: 70px;
      border-radius: 50%;
      margin: 0 auto 10px;
    }
  }
  .title{
    height: 46px;
  }
}
</style>
