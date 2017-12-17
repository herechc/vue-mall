<template>
  <div class="detail-container" v-if="goodsInfo">
    <mt-header title="商品详情">
      <mt-button icon="back" slot="left" @click="goback">返回</mt-button>
    </mt-header>
    <div class="banner">
      <img :src="baseUrlImg + goodsInfo.image_path">
    </div>
    <div class="detail">
      <div class="title">
        <span>{{goodsInfo.name}}</span>
        <span>${{goodsInfo.price}}</span>
      </div>
      <div class="product-stock status">
        <span>已售:{{goodsInfo.sold}}</span>
        <span>库存:{{goodsInfo.stock}}</span>
      </div>
     
      <div class="desc">{{goodsInfo.descr}}</div>
    </div>
    <img class="detail-desc" v-for="item in goodsInfo.picture" :src="baseUrlImg + item" :key="item.id"></img>
    <div class="go-add-cart" id="go-add-cart">
      <span @click="addCart(goodsInfo.id)">加入购物车</span>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import { baseUrlImg } from 'utils/config'
import { Header, Button, MessageBox } from 'mint-ui'
export default {
  name: 'detail',
  components: {
    [Header.name]: Header,
    [Button.name]: Button,
    [MessageBox.name]: MessageBox
  },
  data() {
    return {
      goods_id: '',
      goodsInfo: undefined,
      baseUrlImg,
      goodsData: []
    }
  },
  // computed: {
  //   ...mapGetters(['goodsId'])
  // },
  mounted() {
    this.goods_id = this.$route.query.index
    this.getDetails(this.goods_id)
    // localStorage.removeItem('goodsData')
    this.goodsData = localStorage.getItem('goodsData') ? JSON.parse(localStorage.getItem('goodsData')) : []
  },
  methods: {
    getDetails(id) {
      this.$api.goodsDetails(id).then(res => {
        // console.log(res)
        if (res.data.code === 1) {
          this.goodsInfo = res.data.list
        } else {
          MessageBox.alert(res.data.message)
        }
      }).catch(err => {
        MessageBox.alert(err.message)
      })
    },
    addCart(_id) {
      // 加入购物车
      let data = {
        id: this.goodsInfo.id,
        imgSrc: this.goodsInfo.image_path,
        name: this.goodsInfo.name,
        price: this.goodsInfo.price,
        num: 1,
        checkStatus: true
      }
      const cartData = this.goodsData
      if (!cartData.length) {
        cartData.push(data)
      } else {
        for (var i = 0; i < cartData.length; i++) {
          if (cartData[i].id === _id) {
            cartData[i].num ++
            break
          }
          if (i === cartData.length - 1) {
            cartData.push(data)
            break
          }
        }
      }
      this.$root.eventHub.$emit('goodsCount', 1)
      localStorage.setItem('goodsData', JSON.stringify(cartData))
    },
    goback() {
      // 返回
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.detail-container{
  padding-bottom:40px
}
.container {
  padding-bottom: 80px;
  background: #eee;
}
.banner{
  height:240px;
}
.banner img {
  width: 100%;
  height: 100%;
}
.status{
  border-bottom:1px solid #e5e5e5
}
.detail {
  padding: 10px 0px 0;
  background: #fff;
  margin-bottom: 10px;
}

.product-stock {
  display: flex;
  line-height:30px;
  padding:0 10px;
  height:30px;
  color:#898989;
  justify-content: space-between;
  font-size: 14px;
}

.detail-desc {
  background: #fff;
  padding: 6px;
  margin:0 auto 100px;
  width:90%;
  display:block;
  height:100%;

}
.title{
  padding:0 10px;
  height:35px;
  color:#333;
  line-height:35px;
  span{
    &:last-child{
      float: right;
      color:#F44!important
    }
  }
}
.detail-desc img {
  width: 100%;
  vertical-align: bottom;
  display: block;
}

.desc {
  color: #999;
  padding:10px 10px;
}

.go-add-cart {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 55px;
  background: #26a2ff;
  color: #fff;
  text-align: center;
}
</style>