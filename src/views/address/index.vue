<template>
  <div class="container">
    <mt-field label="姓名" placeholder="请输入姓名" class="bb-1" required v-model="listQuery.name"></mt-field>
    <mt-field label="电话" placeholder="请输入电话" class="bb-1" required v-model="listQuery.mobile"></mt-field>
    <mt-field label="详细地址" placeholder="请输入详细地址" class="bb-1" required v-model="listQuery.full_address"></mt-field>
    <mt-field label="备注" placeholder="请输入备注" class="bb-1" required type="textarea" rows="4" v-model="listQuery.remark"></mt-field>
    <br>
    <mt-button size="large" type="primary" @click="handleSave">保存</mt-button>
    <br>
    <mt-button size="large" type="default" @click="handleCancel">取消</mt-button>
  </div>
</template>

<script>
  import { Field, MessageBox } from 'mint-ui'
  export default {
    components: {
      [MessageBox.name]: MessageBox
    },
    data() {
      return {
        listQuery: {
          name: '',
          mobile: undefined,
          full_address: '',
          remark: ''
        },
        userId: ''
      }
    },
    mounted() {
      this.userId = this.$store.getters.userId
    },
    methods: {
      handleSave() {
        this.$api.updateInfo(this.userId, this.listQuery).then(res => {
          // console.log(res)
          if (res.data.code === 1) {
            MessageBox.alert(res.data.message).then(action => {
              this.$router.push({path: '/my'})
            })
          } else {
            MessageBox.alert(res.data.message)
          }
        })
      },
      handleCancel() {
        this.$router.push({path: '/my'})
      }
    }
  }
</script>

<style>
  .container {
    height: 100%;
  }
  
  .mint-cell:last-child {
    background-image: none;
  }
  
  .picker-center-highlight:before,
  .picker-center-highlight:after {
    background-color: initial;
  }
  
  .mint-button--primary {
    background-color: #26a2ff;
  }
  
  .area-select {
    width: 100%;
    border: none;
  }
</style>