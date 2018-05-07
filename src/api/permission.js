import request from '@/utils/request'

export function getUsablePermission() {
  return request({
    url: '/permission/usableList',
    method: 'get'
  })
}

export function getPermissionList(params) {
  return request({
    url: '/permission/list',
    method: 'get',
    params
  })
}

export function addPermission(params) {
  return request({
    url: '/permission/add',
    method: 'put',
    data: params
  })
}

export function banSelectionPermission(params) {
  return request({
    url: '/permission/banSelection',
    method: 'delete',
    data: params
  })
}

export function allowSelectionPermission(params) {
  return request({
    url: '/permission/allowSelection',
    method: 'post',
    data: params
  })
}

export function banPermission(params) {
  return request({
    url: '/permission/ban/' + params,
    method: 'delete'
  })
}

export function allowPermission(params) {
  return request({
    url: '/permission/allow/' + params,
    method: 'post'
  })
}

export function updatePermission(params) {
  return request({
    url: '/permission/update',
    method: 'post',
    data: params
  })
}
