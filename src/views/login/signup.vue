<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out" >
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>buyone</p>
        </div>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="listQuery.username"></mt-field>
        <mt-field label="密码" type="password" placeholder="请输入密码" v-model="listQuery.password"></mt-field>
        <mt-button type="primary" @click="signup">注册</mt-button> 
      </section>
    </transition>
  </div>
</template>

<script>
  import { Field, Button, MessageBox } from 'mint-ui'
  export default {
    name: 'login',
    components: {
      [Field.name]: Field,
      [Button.name]: Button,
      [MessageBox.name]: MessageBox
    },
    data() {
      return {
        // 参数
        listQuery: {
          username: '',
          password: ''
        },
        // 显示控制
        showLogin: false
      }
    },
    mounted() {
      this.showLogin = true
    },
    methods: {
      signup() {
        this.$api.signup(this.listQuery).then(res => {
          const data = res.data
          // console.log(res)
          if (data.code === 1) {
            MessageBox.alert('注册成功').then(action => {
              this.$router.push('/login')
            })
          } else {
            MessageBox.alert(data.message)
          }
        }).catch(err => {
          MessageBox.alert(err.message)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~styles/mixin';
  .login_page {
    background-color: #324057;
  }
  
  .manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;
    p {
      font-size: 22px;
      color: #fff;
    }
  }
  
  .form_contianer {
    @include wh(280px, 150px);
    @include ctp(280px, 150px);
    padding: 10px 0;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;
    .submit_btn {
      width: 100%;
      font-size: 16px;
    }
  }
  
  .tip {
    font-size: 12px;
    color: red;
  }
  
  .form-fade-enter-active,
  .form-fade-leave-active {
    transition: all 1s;
  }
  
  .form-fade-enter,
  .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
