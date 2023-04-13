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

/**
 * 删除文章接口
 * @param {*} id 
 * @returns 
 */
export const delArticle = (id) => {
  return dannyRequest.delete({
    url: `/mp/articles/${id}`
  })
}

/**
 * 添加文章
 * @param {*} data 
 * @returns 
 */
export const addArticle = (data, draft=false) => {
  console.log(data)
  return dannyRequest.post({
    "url" : `/mp/articles?draft=${draft}`,
    // data是难点，怎么准备给请求
    // data: JSON.stringify()
    data

    
  })
}
