import axios from 'axios'
import config from './config'
axios.defaults.withCredentials = true

/**
 * 全局工具对象
 */
const util = {
  /**
   * 通用请求函数
   * @param {Object} params 一个包含 类型、地址、数据、数据类型 的对象
   */
  request (params) {
    const { type, url, data, dataType } = params

    let option = {
      url: config.baseUrl + url,
      method: type || 'get',
      responseType: dataType || 'json'
    }

    if (type === 'get') option.params = data
    if (type === 'post') option.data = data

    return new Promise((resolve, reject) => {
      axios(option)
        .then((res) => resolve(res))
        .catch((err) => reject(err))
    })
  }
}

export default util
