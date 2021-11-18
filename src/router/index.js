import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  //登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  //注册
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    hidden: true
  },
  //404
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 素材管理
  {
    path: '/community',
    component: Layout,
    meta: {
      title: '社区功能',
      icon: 'table'
    },
    children: [{
      path: 'check-template',
      name: 'check-template',
      component: () => import('@/views/community/check-template'),
      meta: {
        title: '查看模板',
      }
    },
      {
        path: 'logo',
        name: 'logo',
        component: () => import('@/views/community/check-logo'),
        meta: {
          title: '查看logo',
        }
      },
      {
        path: 'generate',
        name: 'generate',
        component: () => import('@/views/community/generate'),
        meta: {
          title: '生成素材',
        }
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('@/views/community/statistics'),
        meta: {
          title: '统计分析',
        }
      },
    ]
  },

  //测试页面
  {
    path: '/',
    meta: {
      title: '用户管理',
      icon:'user'
    },
    component: Layout,
    children: [
      {
        path: 'user-info',
        name: 'user-info',
        component: () => import('@/views/user/user-info'),
        meta: {
          title: '用户信息',
        }
      },
      //个人信息
      {
        path: 'me',
        name: 'me',
        component: () => import('@/views/user/me'),
        meta: {
          title: '个人信息',
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
