import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/list',
    name: 'User',
    meta: { title: '用户管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'UserList',
        component: () => import('@/views/user/list'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'UserAdd',
        component: () => import('@/views/user/add'),
        meta: { title: '新增用户', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'UserEdit',
        component: () => import('@/views/user/edit'),
        meta: { title: '修改用户信息', icon: 'form' },
        hidden: true
      }
    ]
  },

  {
    path: '/role',
    component: Layout,
    redirect: '/role/list',
    name: 'Role',
    meta: { title: '角色管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'RoleList',
        component: () => import('@/views/role/list'),
        meta: { title: '角色列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'RoleAdd',
        component: () => import('@/views/role/add'),
        meta: { title: '新增角色', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'RoleEdit',
        component: () => import('@/views/role/edit'),
        meta: { title: '修改角色信息', icon: 'form' },
        hidden: true
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/list',
    name: 'Permission',
    meta: { title: '权限管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: 'PermissionList',
        component: () => import('@/views/permission/list'),
        meta: { title: '权限列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'PermissionAdd',
        component: () => import('@/views/permission/add'),
        meta: { title: '新增权限', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'PermissionEdit',
        component: () => import('@/views/permission/edit'),
        meta: { title: '修改权限信息', icon: 'form' },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
