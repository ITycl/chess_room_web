import axios from 'axios'

export function getUserList() {
  return axios({
    url: '/ChineseChess',
    method: 'get',
    params: {}
  })
}
