// 请求'用户登录相关数据'的二次封装类
import request from '@/utils/request' // 导入了 axios 的二次封装类

/** 获取图形验证码
 * 请求路径: /captcha/image
 * 请求方法: get
 * 请求传参: none
 */
export const getPicCode = () => {
  return request.get('/captcha/image') // 细节: 必须 return
}

/** 获取短信验证码
 * 请求路径: /captcha/sendSmsCaptcha
 * 请求方法: post
 * 请求传参: (1) Header 参数: platform String 当前请求的客户端（APP、小程序、H5等） 在请求拦截器里已经被传入 必需
 *          (2) Body 参数: form Object 表格 必需
 *                         {
 *                           captchaCode: String 用户输入的图形验证码 必需
 *                           captchaKey: String 图形验证码唯一标识
 *                           mobile: String 手机号
 *                         }
*
 * @param {String} captchaCode 用户输入的图形验证码
 * @param {String} captchaKey 图形验证码key
 * @param {String} mobile 接收验证码的手机
 */
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode, // 用户输入的图形验证码
      captchaKey, // 图形验证码唯一标识
      mobile // 手机号
    }
  })
}

/** 登录接口, 点击登录按钮, 进行登录
 * 注意: 发送短信验证码时, 用户输入的图形验证码进行了一次校验, 但在此处的登录
 * 方法未进行图形验证码的正确性校验,虽然存在着用户再次修改图形验证码的可能性,
 * 但是无伤大雅, 属于无关紧要的小问题
 *
 * 请求路径: '/passport/login'
 * 请求方法: post
 * 请求传参: (1) Header 参数: platform: 当前请求的客户端（APP、小程序、H5等） 示例值: H5
 *          (2) body 参数: form: object
 *                              {
 *                                mobile: String 手机号码
 *                                smsCode: String 短信验证码， 测试环境验证码为：246810
 *                                isParty: boolean 是否存在第三方用户信息
 *                                partyData: object 三方登录信息，默认为：{} 可选
 *                              }
 *
 * @param {String} mobile 手机号码
 * @param {String} smsCode 短信验证码
 * @param {Boolean} isParty 是否存在第三方用户信息
 * @param {Object} partyData 三方登录信息
 */
export const codeLogin = (mobile, smsCode, isParty = false, partyData = {}) => {
  return request.post('/passport/login', {
    form: {
      isParty, // 是否存在第三方用户信息
      partyData, // 三方登录信息
      mobile, // 手机号
      smsCode // 短信验证码
    }
  })
}
