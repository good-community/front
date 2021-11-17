import request from '@/utils/request'

export function getUserInfo(params) {
  return request({
    url: '/user/info/all',
    method: 'get',
    params
  })
}
