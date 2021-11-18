import request from '@/utils/request'

export function getCities() {
  return request({
    url: '/dict/city',
    method: 'get'
  })
}
export function getCommunities() {
  return request({
    url: '/dict/community',
    method: 'get'
  })
}
