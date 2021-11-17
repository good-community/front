import request from '@/utils/request'

export function getUserInfo() {
  return request({
    url: '/user/info/all',
    method: 'get'
  })
}
export function getMyInfo(userId) {
  return request({
    url: '/user/info/'+userId,
    method: 'get'
  })
}
