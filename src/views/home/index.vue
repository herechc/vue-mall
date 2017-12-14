<template>
  <div class="my-container" v-loading="isload">
    <div class="block-swipe">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in bannerlist" :key="item.id">
          <img :src="baseUrlImg + item.image_path" >
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="block-product" >
      <div class="wrapper product-new">
        <p>最近新品</p>
        <div class="product-list">
          <div class="product" v-for="item in tableList" @click="goDetails(item.id)" :key="item.id">
            <img :src="baseUrlImg + item.image_path" >
            <div class="info">
              <div class="title">{{item.name}}</div>
              <div class="price">${{item.price}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Swipe, SwipeItem, Loadmore, MessageBox } from 'mint-ui'
  import { baseUrlImg } from 'utils/config'
  import { is2Bottom } from 'utils/scroll2Bottom'
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
        listQuery: {
          pageSize: 2
        },
        tableList: [],
        baseUrlImg,
        bannerlist: [],
        isload: false
      }
    },
    mounted() {
      this.getlist()
      this.getBanner()
      is2Bottom(this.handle2Bottom)
    },
    methods: {
      handle2Bottom() {
        this.isload = true
        this.listQuery.pageSize += 1
        this.getlist()
      },
      getlist() {
        this.$api.goodsList(this.listQuery).then(res => {
          // console.log(res)
          const that = this
          if (res.data.code === 1) {
            this.tableList = res.data.list
            this.$nextTick(_ => {
              setTimeout(function() {
                that.isload = false
              }, 1000);
            })
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
.my-container{
  background:#f5f5f5;
}
.block-swipe{
  height:250px;
  img{
    height:250px;
    width:100%;
  }
}
.block-product{
  .product{
    margin-bottom: 70px;
  }
  p{
    line-height:45px;
    margin-top:5px;
    height:45px;
    background:#fff;
    padding:0 20px;
    font-size:16px;
    color:#999;
    border-bottom:1px solid #e6e6e6
  }
  .product-list{
    padding: 0.4em;
    .product{
      height:90px;
      margin-bottom: 0.4em;
      background: #fff;
      display: flex;
      align-items: center
      
    }
    img{
      width: 70px;
      height: 70px;
      margin-left:10px;
      margin-right:20px;
      border-radius: 50%;
    }
  }
  .title{
    margin:5px 0 8px
  }
  .price{
    color:#ccc;
    font-size:16px
  }
}
</style>
