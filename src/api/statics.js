import request from '@/utils/request'

export function getChartData(body) {
  return request({
    url: "/statistics/chart",
    data: body,
    method: "POST"
  })
}
