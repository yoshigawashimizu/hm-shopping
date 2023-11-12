// 存储模块, (1) 持久化 vuex 数据 (2) 封装"持久化数据的方法"

// (1) 用户模块 user

// 约定一个通用的存储用键名
const INFO_KEY = 'hm_shopping'

// 约定一个通用的默认存储对象, token 为空, userId 为空
const DEFAULT_INFO = { token: '', userId: '' }

/** 获取存储在本地的用户数据
 *
 * @returns result 如果本地有值, 则返回本地数据
 * @returns defaultInfo 如果本地没有值, 则返回默认数据
 */
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY) // 返回存储在本地的数据
  // 判断: 存储在本地的数据是否有数据
  if (result) {
    return JSON.parse(result) // 将 json 格式 转换成 js 的对象格式?
  }
  // console.log('尝试获取本地键名为INFO_KEY的数据,结果为空,将使用默认的返回值: token: 空字符串, userId: 空字符串') // 调试代码: 如果获取到的本地用户数据为空, 则发出对应提示
  return DEFAULT_INFO
}

/** 将数据存储在本地
 *
 * @param {Object} newUserInfo Object 新个人信息
 *
 * @param {String} newUserInfo.token String 新token令牌
 * @param {String} newUserInfo.userId String 新用户 id
 *
 */
export const setInfo = (newUserInfo) => {
  const { token } = newUserInfo // 尝试解构出token
  // 判断: 存入的新对象中是否没有token
  if (!token) {
    // console.log('存入本地的新对象为空, 将存储默认的对象: token: 空字符串,   userId: 空字符串') // 调试用代码: 如果存入本地的对象不为空, 则发出提示
    return localStorage.setItem(INFO_KEY, JSON.stringify(DEFAULT_INFO))
  }

  // console.log('存入本地的新用户消息不为空, 将存储对象: token:', newUserInfo.token, 'userId:', newUserInfo.userId) // 调试用代码: 如果存入本地的对象为空, 则发出提示

  return localStorage.setItem(INFO_KEY, JSON.stringify(newUserInfo))
}

/** 将数据从本地移除 */
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// (2) 搜索历史 模块

// 约定一个通用的存储用键名
const HISTORY_KEY = 'hm_history_list'

/** 获取存储在本地的数据
 *
 * @returns result 如果本地有值, 则返回本地数据
 * @returns defaultHistory 如果本地没有值, 则返回默认数据
 */
export const getHistoryList = () => {
  const result = localStorage.getItem(HISTORY_KEY) // 返回存储在本地的数据
  return result ? JSON.parse(result) : []
}

/** 将数据存储在本地
 *
 * @param {Array} newHistoryList76629 新搜索历史
 */
export const setHistoryList = (newHistoryList) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistoryList))
}
