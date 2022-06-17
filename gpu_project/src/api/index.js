import ajax from './ajax';

const BASE = '/api/v1/'
/**登录 */
export const reqLogin = (email, password) => ajax('/api1/api/v1/auth/login', {email, password}, 'POST')

/**注册 */
export const reqRegister = (email) => ajax('/api1/api/v1/auth/sign_up', {email}, 'POST')