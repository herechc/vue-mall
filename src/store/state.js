import cookie from 'utils/cookie'
import * as key from 'utils/config'

const state = {
  token: cookie.get(key.TOKEN),
  userId: cookie.get(key.ID),
  goodsId: {}
}

export default state
