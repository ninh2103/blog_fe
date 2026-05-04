import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import AdminLayout from '@/layouts/AdminLayout'
import MainLayout from '@/layouts/MainLayout'
import Login from '@/Pages/Login/Login'
import PostDetail from '@/Pages/PostDetail/PostDetail'
import Category from '@/Pages/manage/Categories/Category'
import Dashboard from '@/Pages/manage/Dashboard/Dashboard'
import Post from '@/Pages/manage/Posts/Post'
import Tag from '@/Pages/manage/Tags/Tag'

export const routes: RouteObject[] = [
  // ── Public blog ──────────────────────────────────────────────────────
  {
    path: '/blog',
    element: <MainLayout />,
    children: [
      {
        path: ':slug',
        element: <PostDetail />
      }
    ]
  },

  // ── Admin panel (root) ───────────────────────────────────────────────
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'posts',
        element: <Post />
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
        element: <Navigate to='/' replace />
      }
    ]
  },

  // ── Auth ─────────────────────────────────────────────────────────────
  {
    path: '/login',
    element: <Login />
  },

  // ── Backward compat: /admin/* → / ────────────────────────────────────
  {
    path: '/admin',
    element: <Navigate to='/' replace />
  },
  {
    path: '/admin/dashboard',
    element: <Navigate to='/' replace />
  },

  // ── Catch all ────────────────────────────────────────────────────────
  {
    path: '*',
    element: <Navigate to='/' replace />
  }
]
