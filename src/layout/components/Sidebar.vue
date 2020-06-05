<template>
  <div class="sidebar">
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
        <tr>
          <th width="100px">姓名</th>
          <th width="260px">{{ currentRowName }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            style="text-align: center;"
            :style="selectUId == '00'? 'background-color: #ebebeb;':'background-color: #fff;'"
            @click="chageTag('00','九州一号群')"
          >九州一号群
          </td>
          <td rowspan="100" style="padding: 0px">
            <el-scrollbar style="height: 400px;background-color: #ebebeb">
              <!-- 消息 -->
              <div v-for="key in messageData" :class="key.id === $store.state.app.uid ? 'chat-receiver' : 'chat-sender'">
                <div><img :src="key.imgUrl"></div>
                <div>{{ key.name }}</div>
                <div style="text-align: left;">
                  <div :class="key.id === $store.state.app.uid ? 'chat-right_triangle' : 'chat-left_triangle'" />
                  <span>{{ key.message }}</span>
                </div>
              </div>
            </el-scrollbar>
            <el-card id="input" class="box-card" style="padding: 0px" shadow="hover">
              <el-input v-model="message" type="textarea" rows="4" style="padding: 0px" />
              <el-button style="padding: 5px;float: right" @click="send">发送(S)</el-button>
            </el-card>
          </td>
        </tr>
        <tr v-for="key in chatUsers">
          <td
            style="text-align: center;"
            :style="selectUId === key.id ? 'background-color: #ebebeb;':'background-color: #fff;'"
            @click="chageTag(key.id, key.name)"
          >
            <el-badge :value="key.count !== 0?key.count:''" class="item" />
            <el-tag
              :key="key.name"
              closable
              style="border: 0px;color: #000;height: 0px;line-height: 0px;"
              type="info"
              @click="chageTag(key.id, key.name)"
              @close="handleClose(key.id)"
            >
              <!--❤-->
              {{ key.name }}
            </el-tag>
          </td>
        </tr>
        <tr style="height: 100%" />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRowName: '',
      selectUId: '',
      message: '',
      chatUsers: [],
      messageData: [],
      chatRecords: new Map()
    }
  },
  computed: {
    wsdata() {
      return this.$store.state.app.wsdata
    }
  },
  watch: {
    wsdata: function() {
      console.log(this.wsdata)
      var split = this.wsdata.split('-')
      switch (split[0]) {
        case 'EXCEPTION':
          this.$message.error(split[1])
          break
        case 'MESSAGE':
          var user = this.getChatUsers(split[1], true)
          if (user) {
            this.addDataMap(split[1], user.img, user.id, user.name, split[2])
          } else {
            const _this = this
            window.setTimeout(function() {
              var user = _this.getChatUsers(split[1], true)
              _this.addDataMap(split[1], user.img, user.id, user.name, split[2])
            }, 500)
          }
          break
        case 'MASS_MESSAGE':
          var user2 = this.getChatUsers(split[1], false)
          if (user2) {
            this.addDataMap('00', user2.img, user2.id, user2.name, split[2])
          } else {
            const _this = this
            window.setTimeout(function() {
              var user2 = _this.getChatUsers(split[1], false)
              _this.addDataMap('00', user2.img, user2.id, user2.name, split[2])
            }, 500)
          }
          break
      }
    }
  },
  created() {
    this.chatRecords.set('00', [])
    this.chageTag('00', '九州一号群')
  },
  methods: {
    chageTag(id, name) {
      this.$store.state.app.show(true)
      if (id === this.selectUId) {
        return
      } else {
        this.selectUId = id
        this.currentRowName = name
        this.messageData = this.chatRecords.get(id)
        this.UpdateTag(id, false)
      }
    },
    handleClose(id) {
      this.chatUsers.splice(this.chatUsers.indexOf(id), 1)
      this.chatRecords.delete(id)
      this.chageTag('00', '九州一号群')
    },
    send() {
      if (!this.message) {
        return
      } else {
        this.addDataMap(this.selectUId, this.$store.state.app.uimgUrl, this.$store.state.app.uid, this.$store.state.app.uname, this.message)
        if (this.selectUId === '00') {
          this.$store.state.app.websocket.send('MASS_MESSAGE-' + this.message)
        } else {
          this.$store.state.app.websocket.send('MESSAGE-' + this.selectUId + '-' + this.message)
        }
        this.message = ''
      }
    },
    addDataMap(mid, imgUrl, id, name, message) {
      if (!this.chatRecords.has(mid)) {
        this.chatRecords.set(mid, [])
      }
      var arr = this.chatRecords.get(mid)
      arr.push({
        imgUrl: imgUrl,
        id: id,
        name: name,
        message: message
      })
      if (mid !== '00' && this.selectUId !== mid) {
        this.UpdateTag(mid, true)
      }
    },
    UpdateTag(mid, is) {
      for (let i = 0; i < this.chatUsers.length; i++) {
        if (mid === this.chatUsers[i].id) {
          if (!is) {
            this.chatUsers[i].count = 0
            // this.$set(this.chatUsers[i].count, i, 0)
          } else {
            // this.$set(this.chatUsers[i].count, i, this.chatUsers[i].count + 1)
            this.chatUsers[i].count = this.chatUsers[i].count + 1
            this.$forceUpdate()
          }
          break
        }
      }
    },
    getChatUsers(id, is) {
      for (let i = 0; i < this.chatUsers.length; i++) {
        if (id === this.chatUsers[i].id) {
          return this.chatUsers[i]
        }
      }
      const new_user = this.$store.state.app.getUserById(id)
      if (is && new_user !== undefined) {
        new_user.count = 0
        this.chatUsers.push(new_user)
      }
      return new_user
    }
  }
}
</script>

<style lang="scss">
  @import "~@/styles/variables.scss";

  .sidebar {
    /*width: 210px;*/
    width: $sideBarWidth;
    height: 100%;
    position: absolute;
    background: #fff;
    th {
      color: #909399;
      height: 52px;
    }
    tr {
      background-color: #FFF;
    }
    td, th {
      border-right: 0.5px solid #EBEEF5;
      border-bottom: 1px solid #EBEEF5;
      padding: 12px 0;
      background-color: #FFF;
      font-size: 14px;
    }
    #input {
      width: 100%;
      height: 120px;
      border-top: 1px solid #EBEEF5;
    }
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    textarea {
      resize: none;
      border: none;
    }
    .el-card__body {
      padding: 0px;
    }
    .chat-sender {
      clear: both;
      font-size: 80%;
    }
    .chat-sender div:nth-of-type(1) {
      float: left;
    }
    .chat-sender div:nth-of-type(2) {
      margin: 0 40px 2px 40px;
      padding: 0px;
      color: #848484;
      font-size: 70%;
      text-align: left;
    }
    .chat-sender div:nth-of-type(3) {
      background-color: white;
      /*float: left;*/
      margin: 0 40px 10px 40px;
      padding: 10px 10px 10px 10px;
      border-radius: 7px;
      text-indent: -13px;
    }

    .chat-receiver {
      clear: both;
      font-size: 80%;
    }
    .chat-receiver div:nth-of-type(1) {
      float: right;
    }
    .chat-receiver div:nth-of-type(2) {
      margin: 0px 40px 2px 40px;
      padding: 0px;
      color: #848484;
      font-size: 70%;
      text-align: right;
    }
    .chat-receiver div:nth-of-type(3) {
      /*float:right;*/
      background-color: #b2e281;
      margin: 0px 40px 10px 40px;
      padding: 10px 10px 10px 10px;
      border-radius: 7px;
    }

    .chat-receiver div:first-child img,
    .chat-sender div:first-child img {
      width: 30px;
      height: 30px;
      border-radius: 20%;
    }

    .chat-left_triangle {
      height: 0px;
      width: 0px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent white transparent transparent;
      position: relative;
      left: -22px;
      top: 3px;
    }
    .chat-right_triangle {
      height: 0px;
      width: 0px;
      border-width: 6px;
      border-style: solid;
      border-color: transparent transparent transparent #b2e281;
      position: relative;
      right: -22px;
      top: 3px;
    }
  }
</style>
