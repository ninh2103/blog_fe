import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import AdminLayout from '@/layouts/AdminLayout'
import MainLayout from '@/layouts/MainLayout'
import Login from '@/Pages/Login/Login'
import PostDetail from '@/Pages/PostDetail/PostDetail'
import Category from '@/Pages/manage/Categories/Category'
import Dashboard from '@/Pages/manage/Dashboard/Dashboard'
import PostList from '@/Pages/manage/Posts/PostList/PostList'
import Tag from '@/Pages/manage/Tags/Tag'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'posts/:slug',
        element: <PostDetail />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Navigate to='/admin/dashboard' replace />
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='dashboard' replace />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'posts',
        element: <PostList />
      },
      {
        path: 'categories',
        element: <Category />
      },
      {
        path: 'tags',
        element: <Tag />
      },
      {
        path: '*',
        element: <Navigate to='dashboard' replace />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to='/' replace />
  }
]
