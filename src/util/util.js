import axios from 'axios'

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
      url,
      method: type || 'get',
      responseType: dataType || 'json'
    }

    if (type === 'get') option.params = data
    if (type === 'post') option.data = data

    return new Promise((resolve, reject) => {
      axios(option)
        .then((res) => {
          if (res.status === 0) {
            resolve(res)
          } else if (res.status === 10) {
            window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
          } else {
            reject(res)
          }
        })
        .catch((err) => reject(err))
    })
  }
}

export default util
