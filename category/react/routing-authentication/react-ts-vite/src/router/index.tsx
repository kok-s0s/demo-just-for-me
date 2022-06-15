import { Router } from 'oh-router'
import { BookManage } from '../pages/book-manage'
import { Login } from '../pages/login'
import { UserManage } from '../pages/user-manage'
import { LoginCheckMiddleware } from './middlewares/loginCheck'

export const router = new Router({
  middlewares: [new LoginCheckMiddleware()],
  routes: [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      redirect: '/user-manage',
    },
    {
      path: '/user-manage',
      element: <UserManage />,
    },
    {
      path: '/book-manage',
      element: <BookManage />,
    },
    {
      path: '*',
      element: <div>404</div>,
    },
  ],
})
