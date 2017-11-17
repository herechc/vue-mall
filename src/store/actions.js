import $api from 'api'
import cookie from 'utils/cookie'
import * as key from 'utils/config'
import * as types from './mutation-types'
import { MessageBox } from 'mint-ui'
import Vue from 'vue'

Vue.component(MessageBox.name, MessageBox)

export const Login = ({commit}, userInfo) => {
  return new Promise((resolve, reject) => {
    $api.login(userInfo).then(res => {
      console.log(res)
      if (res.data.code === 1) {
        const data = res.data
        cookie.set(key.TOKEN, data.token)
        commit(types.SET_TOKEN, data.token)
        cookie.set(key.ID, data.user_id)
        commit(types.SET_USERID, data.user_id)
        resolve()
      } else {
        MessageBox.alert(res.data.message)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
export const LogOut = ({ commit }) => {
  return new Promise(resolve => {
    commit(types.SET_TOKEN, '')
    cookie.remove(key.TOKEN)
    commit(types.SET_USERID, '')
    cookie.remove(key.ID)
    resolve()
  })
}

export const setUserId = ({ commit }, userid) => {
  commit(types.SET_USERID, userid)
}

export const setGoodsid = ({ commit }, goodsid) => {
  commit(types.SET_GOODS, goodsid)
}
