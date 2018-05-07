import request from '@/utils/request'

export function getRoleList() {
  return request({
    url: '/role/list',
    method: 'get'
  })
}

export function getUsableRole() {
  return request({
    url: 'role/usableList',
    method: 'get'
  })
}

export function addRole(params) {
  return request({
    url: '/role/add',
    method: 'put',
    data: params
  })
}

export function banSelectionRole(params) {
  return request({
    url: '/role/banSelection',
    method: 'delete',
    data: params
  })
}

export function allowSelectionRole(params) {
  return request({
    url: '/role/allowSelection',
    method: 'post',
    data: params
  })
}

export function banRole(params) {
  return request({
    url: '/role/ban/' + params,
    method: 'delete'
  })
}

export function allowRole(params) {
  return request({
    url: '/role/allow/' + params,
    method: 'post'
  })
}

export function updateRole(params) {
  return request({
    url: '/role/update',
    method: 'post',
    data: params
  })
}

export function getRolePermission(params) {
  return request({
    url: 'role/rolePermission/' + params,
    method: 'get'
  })
}
