import * as types from './mutation-types'

const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_USERID](state, userid) {
    state.userId = userid
  },
  [types.SET_GOODS](state, goodsId) {
    state.goodsId.push(goodsId)
  }
}

export default mutations
