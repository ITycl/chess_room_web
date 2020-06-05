import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
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

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/user_table',
    meta: {
      title: '用户管理', icon: 'example'
    },
    children: [
      {
        path: 'user_table',
        name: 'user_table',
        component: () => import('@/views/user_table/index'),
        meta: {
          title: '玩家列表', icon: 'table'
        }
      },
      {
        path: 'chinese_chess',
        name: 'chinese_chess',
        component: () => import('@/views/chinese_chess/index'),
        meta: {
          title: '中国象棋', icon: 'tree'
        }
      },
      {
        path: 'reversi',
        name: 'reversi',
        component: () => import('@/views/reversi/index'),
        meta: {
          title: '黑白棋', icon: 'tree'
        }
      },
      {
        path: 'gobang',
        name: 'gobang',
        component: () => import('@/views/gobang/index'),
        meta: {
          title: '五子棋', icon: 'tree'
        }
      },
      {
        path: 'weiqi',
        name: 'weiqi',
        component: () => import('@/views/weiqi/index'),
        meta: {
          title: '围棋', icon: 'tree'
        }
      }
    ]
  }]

//   {
//     path: '/',
//     component: Layout,
//     redirect: '/user_table',
//     children: [{
//       path: 'user_table',
//       name: '玩家列表',
//       component: () => import('@/views/user_table/index'),
//       meta: {
//         title: '玩家列表', icon: 'dashboard'
//       }
//     }]
//   },
//   {
//     path: '/chinese_chess',
//     component: Layout,
//     redirect: '/chinese_chess',
//     children: [{
//       path: 'chinese_chess',
//       name: '中国象棋',
//       component: () => import('@/views/chinese_chess/index'),
//       meta: {
//         title: '中国象棋', icon: 'dashboard'
//       }
//     }]
//   }
// ]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  {
    path: '*', redirect: '/404', hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
