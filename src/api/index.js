import fetch from 'utils/fetch'
import qs from 'qs'
import store from 'store'

export default {
  /**
   * 接口名称：登录
   * 参数：
   *      access_token(token)
   *      name(名称)
   *      password(密码)
  */
  login: data => {
    return fetch.post('/v1/login', qs.stringify(data))
  },
  /**
   * 接口名称：注册
   * 参数：
   *      access_token(token)
   *      name(名称)
   *      password(密码)
  */
  signup: data => {
    return fetch.post('/v1/signup', qs.stringify(data))
  },
  /**
   * 接口名称：商品列表
   * 参数：
   *      access_token(token)
   *      name(名称)
   *      password(密码)
  */
  goodsList: _ => {
    return fetch.get('/v1/user/goods')
  },
  /**
   * 接口名称：获取商品
   * 参数：
   *      access_token(token)
   *      id
  */
  fetchCart: data => {
    data.accesss_token = store.getters.token
    return fetch.get('/v1/user/goods', {params: data})
  },
  /**
   * 接口名称：商品详情
   * 参数：
   *      access_token(token)
  */
  goodsDetails: id => {
    return fetch.get('/v1/user/goods/' + id)
  },
  /**
   * 接口名称：填写地址
   * 参数：
   *      access_token(token)
  */
  updateInfo: (id, data) => {
    return fetch.post('/v1/user/info/' + id, qs.stringify(data))
  },
  /**
   * 接口名称：获取用户信息
   * 参数：
   *      access_token(token)
  */
  fetchInfo: id => {
    return fetch.get('/v1/user/info/' + id)
  },
   /**
   * 接口名称：获取分类
   * 参数：
   *      access_token(token)
  */
  fetchCategory: _ => {
    return fetch.get('/v1/category')
  },
   /**
   * 接口名称：获取分类商品
   * 参数：
   *      access_token(token)
  */
  fetchGoods: id => {
    return fetch.get('/v1/category/goods/' + id)
  },
   /**
   * 接口名称：获取焦点图
   * 参数：
   *      access_token(token)
  */
  fetchBanner: _ => {
    return fetch.get('/v1/banner/')
  }
}
