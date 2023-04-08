// 封装和频道相关的接口
import dannyRequest from "services";

/**
 * 获取频道数据
 * @returns 
 */
export function getChannels() {
  return dannyRequest.get({url: "/channels"})
}