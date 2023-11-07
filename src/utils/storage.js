// 存储模块, (1) 持久化 vuex 数据 (2) 封装"持久化数据的方法"

// (1) 用户模块 user

// 约定一个通用的存储用键名
const INFO_KEY = 'hm_shopping'

// 约定一个通用的默认存储对象, token 为空, userId 为空
const DEFAULT_INFO = { token: '', userId: '' }

/** 获取存储在本地的数据
 *
 * @returns result 如果本地有值, 则返回本地数据
 * @returns defaultInfo 如果本地没有值, 则返回默认数据
 */
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY) // 返回存储在本地的数据
  // 判断: 存储在本地的数据是否有数据
  if (result) {
    return JSON.parse(result)
  }
  console.log('尝试获取本地键名为INFO_KEY的数据,结果为空,将使用默认的返回值: token: 空字符串, userId: 空字符串')
  return DEFAULT_INFO
}

/** 将数据存储在本地
 *
 * @param newUserInfo Object 新个人信息
 * {
 *  @param newToken String 新token令牌
 *  @param newUserId String 新用户 id
 * }
 */
export const setInfo = (newUserInfo) => {
  // 判断: 存入的新对象是否为空 或者存入的对象的内容为空格
  if (!newUserInfo ||
     (newUserInfo.token.trim() === '' &&
      newUserInfo.userId.trim() === '')) {
    console.log('存入本地的新对象为空, 将存储默认的对象: token: 空字符串,   userId: 空字符串')
    return localStorage.setItem(INFO_KEY, JSON.stringify(DEFAULT_INFO))
  }
  return localStorage.setItem(INFO_KEY, JSON.stringify(newUserInfo))
}

/** 将数据从本地移除
 *
 */
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
 * @param newHistoryList Object 新搜索历史
 */
export const setHistoryList = (newHistoryList) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistoryList))
}
