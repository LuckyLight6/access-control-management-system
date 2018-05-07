import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}

export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'put',
    data: params
  })
}

export function banSelectionUser(params) {
  return request({
    url: '/user/banSelection',
    method: 'delete',
    data: params
  })
}

export function allowSelectionUser(params) {
  return request({
    url: '/user/allowSelection',
    method: 'post',
    data: params
  })
}

export function banUser(params) {
  return request({
    url: '/user/ban/' + params,
    method: 'delete'
  })
}

export function allowUser(params) {
  return request({
    url: '/user/allow/' + params,
    method: 'post'
  })
}

export function updateUser(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: params
  })
}
