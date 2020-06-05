import $ from 'jquery'
import axios from 'axios'

const state = {
  websocket: null,
  wsdata: null,
  uid: null,
  uname: null,
  uimgUrl: '/pkq.png',
  userList: [],
  show(is) {
    if (is === null || is === undefined) {
      is = !($('.main-container').css('marginLeft') === '360px')
    }
    if (is) {
      $('.main-container').css('marginLeft', '360px')
      $('#svg').css('-webkit-transform', 'rotate(180deg)')
    } else {
      $('.main-container').css('marginLeft', '100px')
      $('#svg').css('-webkit-transform', '')
    }
  },
  getUserById(id) {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].id === id) {
        return this.userList[i]
      }
    }
    this.fetchData()
  },
  fetchData() {
    if (this.uid) {
      axios.get('/getUsers').then(res => {
        this.userList = res.data.filter(item => item.id !== this.uid)
      })
    } else {
      window.setTimeout(() => this.fetchData(), 500)
    }
  },
  getJournal(jid) {
    return axios.get('/getJournal/' + jid)
  },
  /**
   * 判断一个json对象是否为空，即{}
   *
   * @param jsonObject
   * @returns {boolean}
   */
  jsonObjectIsEmpty(jsonObject) {
    let isEmpty = false
    // eslint-disable-next-line no-unused-vars
    for (const prop in jsonObject) {
      isEmpty = true
      break
    }
    return isEmpty
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  actions
}
