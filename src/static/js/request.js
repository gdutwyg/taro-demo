import Taro from '@tarojs/taro'
class Request {
  get(params) {
    return this.sendReq({ ...params, methods: 'GET' })
  }
  POST(params) {
    return this.sendReq({ ...params, methods: 'POST' })
  }
  async sendReq(params) {
    return await Taro.request({ ...params })
      .then(res => {
        if (res.statusCode === 200) return res.data
        else return {}
      })
      .catch(error => {
        return error.response.data
      })
  }
}
export default new Request()
