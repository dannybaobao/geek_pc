// 用于封装所有的localStorage的操作
// 以后key可以随意更改
const TOKEN_KEY = 'token-geek-pc'


/**
 * 保存token
 * @param {*} token 
 * @returns 
 */
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token)

/**
 * 取token
 * @returns token
 */
export const getToken = () => localStorage.getItem(TOKEN_KEY)

/**
 * 移除token
 * @returns 
 */
export const removeToken = () => localStorage.removeItem(TOKEN_KEY)

/**
 *  判断是否有token，也可以不用封装
 * @returns boolen
 */
export const hasToken = () => !!getToken()