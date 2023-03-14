import dannyRequest from ".."

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