import dannyRequest from "services";

/**
 * 获取用户信息
 * @returns 
 */

// export const getUserProfile = () => {}
export function getUserProfile () {
  return dannyRequest.get({
    url: "/user/profile"
  })
}