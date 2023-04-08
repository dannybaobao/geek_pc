//封装和文章相关的接口

import dannyRequest from "services";

/**
 * 获取文章列表数据
 * 不懂这里为啥用params
 */
export const getArticles = (params) => {
  return dannyRequest.get({
    // 注意路径不要有空格不然报404get错误
    url: "/mp/articles",
    params
  })
} 