import { methodPost } from './CommonHttpMethods'

const loginReq = (login_, pswd_, callback) => {
  methodPost(
    '/api/login/',
    {
      login: login_,
      pswd: pswd_,
    },
    callback
  )
}

export { loginReq }
