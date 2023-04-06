import dannyRequest from ".."
// 模块请求
//登录
/**
 * 
 * @param {string} mobile 
 * @param {string} code 
 * @returns promise
 */
export function getLoginData(mobile,code) {
  // 返回的是axios 的promise
  return dannyRequest.post({
    url: "/authorizations",
    data: {
      mobile,
      code
    }
  })
}