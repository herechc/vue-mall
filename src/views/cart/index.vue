<template>
  <div class="my-container">
    <mt-header title="购物车">
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
    </mt-header>
    <div class="nocart" v-if="goodsData <= 0">你还没有添加任何商品</div>
    <div class="page-cell">
      <div class="cell" v-for="item in goodsData">
        <label class="mint-checklist-label">
                <span class="mint-checkbox">
                  <input class="mint-checkbox-input" :value="item.id" :checked="item.checkStatus" @click="check(item.id,item.checkStatus)"  type="checkbox"> 
                  <span class="mint-checkbox-core"></span>
                </span> 
                <span class="mint-checkbox-label"></span>
              </label>
        <img :src="baseUrlImg + item.imgSrc" width="70" height="70">
        <div class="cell-right">
          <div><span class="title">{{item.name}}</span> <span>${{item.price}}</span></div>
          <div>
            <div>
              <span class="span-opt" @click="item.num > 1 && opt(-1,item.id)">-</span>
              <input type="text" v-model="item.num" size="3" disabled>
              <span class="span-opt" @click="opt(1,item.id)">+</span>
            </div>
            <div><i class="iconfont icon-delete" @click="del(item.id)"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div class="go-order">
      <label class="mint-checklist-label">
              <span class="mint-checkbox">
                <input class="mint-checkbox-input" :checked="checkAll" @click="checkall(!checkAll)" type="checkbox"> 
                <span class="mint-checkbox-core"></span>
              </span> 
              <span class="mint-checkbox-label">全选</span>
            </label>
      </mt-checklist>
      <div>下单 | {{checkTotalPrice}}</div>
      <div><i class="iconfont icon-yq-jt-r" @click="placeOrder"></i></div>
    </div>
  </div>
</template>

<script>
  import {
    baseUrlImg
  } from 'utils/config'
  import {
    MessageBox,
    Toast
  } from 'mint-ui'
  export default {
    name: 'cart',
    components: {
      [MessageBox.name]: MessageBox,
      [Toast.name]: Toast
    },
    data() {
      return {
        goodsData: [],
        baseUrlImg,
        checkAll: true,
        checkTotalPrice: 0,
        checkTotalProducts: []
      }
    },
    mounted() {
      this.goodsData = localStorage.getItem('goodsData') ? JSON.parse(localStorage.getItem('goodsData')) : []
    },
    methods: {
      opt(state, id) {
        var len = this.goodsData.length;
        if (state === -1) {
          for (let i = 0; i < len; i++) {
            if (this.goodsData[i].id === id) {
              this.goodsData[i].num > 1 && this.goodsData[i].num--
            }
          }
          this.$root.eventHub.$emit('cartCount', -1)
        } else {
          for (let i = 0; i < len; i++) {
            if (this.goodsData[i].id === id) {
              this.goodsData[i].num++
            }
          }
          this.$root.eventHub.$emit('cartCount', 1)
        }
        localStorage.setItem('cartData', JSON.stringify(this.goodsData));
        this.calcCartData()
      },
      check(id, status) {
        var len = this.goodsData.length
        for (var i = 0; i < len; i++) {
          if (this.goodsData[i].id === id) {
            this.goodsData[i].checkStatus = !status
          }
        }
        this.calcCartData()
      },
      checkall: function(value) {
        var len = this.goodsData.length;
        for (let i = 0; i < len; i++) {
          this.goodsData[i].checkStatus = value;
        }
        this.calcCartData()
      },
      calcCartData: function() {
        var len = this.goodsData.length;
        var checkNum = 0;
        var checkPrice = 0;
        var checkProduct = [];
        for (var i = 0; i < len; i++) {
          if (this.goodsData[i].checkStatus) {
            checkNum++;
            checkPrice += Number(this.goodsData[i].price) * 100 * this.goodsData[i].num * 100
            checkProduct.push(this.goodsData[i])
          }
        }
        this.checkAll = checkNum === len ? true : false
        this.checkTotalPrice = checkPrice / (100 * 100)
        this.checkTotalProducts = checkProduct
      },
      del: function(id) {
        MessageBox.confirm('确定删除吗?').then(action => {
          var len = this.goodsData.length;
          var num = 0;
          for (var i = 0; i < len; i++) {
            if (this.goodsData[i].id === id) {
              num = this.goodsData[i].num;
              this.goodsData.splice(i, 1);
              break;
            }
          }
          localStorage.setItem('cartData', JSON.stringify(this.goodsData));
          this.$root.eventHub.$emit('cartCount', -num)
          Toast({
            message: '删除成功',
            duration: 1000
          });
          this.calcCartData()
        })
      },
      placeOrder() {
        MessageBox.alert('老板,做不到啊！')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .my-container {
    height: 100%;
    background: #fff;
  }
  
  .nocart {
    line-height: 30px;
    color: #aaa;
    text-align: center;
  }
  
  .page-cell {
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 100px;
  }
  
  .cell {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .page-cell .mint-checklist-label {
    padding-top: 24px;
    box-sizing: border-box;
  }
  
  .cell-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 2;
    padding-left: 10px;
  }
  
  .cell-right input {
    text-align: center
  }
  
  .cell-right div:first-child {
    display: flex;
    justify-content: space-between;
  }
  
  .cell-right div:last-child {
    display: flex;
    justify-content: space-between;
  }
  
  .cell-right div:last-child div {
    margin: 0;
    line-height: 26px;
  }
  
  .go-order {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 55px;
    background: #26a2ff;
    display: flex;
    justify-content: space-between;
    flex-flow: 1;
    color: #fff;
  }
  
  .span-opt {
    display: block;
    width: 30px;
    text-align: center;
  }
  
  .title {
    width: 120px;
  }
</style>
