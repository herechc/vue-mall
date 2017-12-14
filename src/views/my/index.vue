<template>
  <div class="my-container">
    <div class="me-header">
      <img src="data:image/jpeg;base64,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" class="headimgurl">
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
      <!-- <div class="bb-1" >
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
      </div> -->
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