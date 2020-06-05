<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    // 页面刚进入时开启长连接
    this.initWebSocket()
  },
  destroyed: function() {
    // 页面销毁时关闭长连接
    this.websocketclose()
  },
  methods: {
    initWebSocket() { // 初始化weosocket
      // 获取服务器ip地址
      const ip = (window.location.href).split('/')[2]
      const wsuri = 'ws://' + ip + '/websocket'
      this.$store.state.app.websocket = new WebSocket(wsuri)
      this.$store.state.app.websocket.onopen = this.websocketonopen
      this.$store.state.app.websocket.onerror = this.websocketonerror
      this.$store.state.app.websocket.onmessage = this.websocketonmessage
      this.$store.state.app.websocket.onclose = this.websocketclose
    },

    websocketonopen() {
      console.log('WebSocket连接成功')
    },
    websocketonerror(e) { // 错误
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage(e) { // 数据接收
      console.log(e.data)
      var split = e.data.split('-')
      if (split[0] === 'SESSIONID') {
        this.$store.state.app.uid = split[1]
        var uname = sessionStorage.getItem('uname')
        var uimgUrl = sessionStorage.getItem('uimgUrl')
        if (uname) {
          this.$store.state.app.uname = uname
          this.$store.state.app.websocket.send('RENAME-' + uname)
        } else {
          this.$store.state.app.uname = split[2]
        }
        if (uimgUrl) {
          this.$store.state.app.uimgUrl = uimgUrl
          this.$store.state.app.websocket.send('CHAGEIMG-' + uimgUrl)
        }
      }
      this.$store.state.app.wsdata = e.data + '-' + new Date().getTime()
    },

    // websocketsend(agentData) { // 数据发送
    //   this.$store.store.state.app.websocket.send(agentData)
    // },

    websocketclose(e) { // 关闭
      console.log('connection closed (' + e.code + ')')
    }
  }
}
</script>
