<template>
  <div class="my-container">
    <div class="me-header">
      <img src="" class="headimgurl">
      <p>{{infolist.name}}</p>
    </div>
    <div class="user-address">
      <div class="addr-manage">
        <span>地址管理</span>
        <router-link to="/address">></router-link>
      </div>
      <div class="addr-detail">
        <div >收货人：{{infolist.name}}</div>
        <div >电话：{{infolist.mobile}}</div>
        <div >详细地址：{{infolist.full_address}}</div>
        <div >备注：{{infolist.remark}}</div>
      </div>
    </div>
    <div class="diliver"></div>
    <div class="user-order">
      <div class="order-title"><span>我的订单</span></div>
      <div class="bb-1" >
        <div class="order_sn">订单编号：303</div>
        <div class="order-goods" >
          <div><img src=""></div>
          <div><span>02</span> <br> <span>03件商品</span></div>
          <div >
            <span>待付款</span>
          </div>
          <div ><span>已付款</span></div>
        </div>
        <div class="order-status">
          <span>实付：$1145</span>
          <div class="pay-status-1" >
            <a >取消订单</a>
            <a >去付款</a>
          </div>
          <div class="pay-status-2" >
            <a>已付款、未发货</a>
          </div>
          <div class="pay-status-3" >
            <a>已发货</a>
          </div>
        </div>
      </div>
  
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui'
  export default {
    name: 'my',
    components: {
      [MessageBox.name]: MessageBox
    },
    data() {
      return {
        userid: '',
        infolist: {}
      }
    },
    mounted() {
      this.userId = this.$store.getters.userId
      this.getInfo()
    },
    methods: {
      getInfo() {
        this.$api.fetchInfo(this.userId).then(res => {
          // console.log(res)
          const data = res.data
          if (res.data.code) {
            this.infolist = data.list
          } else {
            MessageBox.alert(data.message)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    min-height: 100vh;
    background: #fff;
    color: #999;
  }
  
  .diliver {
    height: 10px;
    background: #eee;
  }
  
  .me-header {
    width: 100%;
    height: 100px;
    padding: 10px;
    box-sizing: border-box;
    background: #26a2ff;
    display: flex;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
    p {
      padding-left: 20px;
      line-height: 80px;
      color: #fff;
    }
  }
  
  .user-address {
    overflow: auto;
    margin-bottom: 10px;
    background: #fff;
    .addr-manage,
    .addr-detail div {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .addr-manage {
      display: flex;
    }
    .addr-manage span {
      display: block;
      &:first-child {
        flex-grow: 2;
        text-align: center;
        padding-left: 10px;
      }
    }
  }
  
  .user-order {
    margin-bottom: 40px;
    .order-title {
      margin: 0;
      padding: 10px;
      text-align: center;
      border-bottom: 1px solid #eee;
    }
    .order_sn {
      padding: 10px 10px 0;
    }
    .order-goods {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      div {
        &:nth-child(2) {
          display: flex;
          flex-direction: column;
        }
        &:last-child {
          display: flex;
          align-items: center;
        }
      }
    }
    .order-status {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      div {
        display: flex;
      }
      a {
        display: block;
        padding: 0 10px;
        height: 30px;
        background-color: #AB956D;
        border-radius: 4px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        margin-left: 10px;
        &:first-child {
          background: #FF6666;
        }
      }
      .pay-status-2 {
        a {
          background: #F79962;
        }
      }
      .pay-status-3 {
        a {
          background: #00CC99;
        }
      }
    }
    img {
      width: 80px;
      height: 80px;
    }
  }
</style>