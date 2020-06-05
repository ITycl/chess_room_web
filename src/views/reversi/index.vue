<!--suppress ALL -->
<template>
  <div class="chinese_chess">
    <table border="0" cellpadding="0" cellspacing="0" background="/image/bgimg/black_white.png" id="table"
           :style="{ '-webkit-transform': !flag ?'rotate(180deg)': ''}">
      <tr v-for="i in 8">
        <td v-for="j in 8" @click.stop="move($event)">
          <img class="user2" v-if="i + '_' + j == '4_4'" src="image/black_white/white.png"/>
          <img class="user1" v-if="i + '_' + j == '4_5'" src="image/black_white/black.png"/>
          <img class="user1" v-if="i + '_' + j == '5_4'" src="image/black_white/black.png"/>
          <img class="user2" v-if="i + '_' + j == '5_5'" src="image/black_white/white.png"/>
        </td>
      </tr>
    </table>
    <countDown
      ref="countDown"
      :fire="fire"
      time="60"
      :statusChange="[30000,10000]"
      width="50"
      height="50"
      @onStatusChange="onStatusChange"
      @onEnd="onEnd"
      :hidden="!is"
      style="position: absolute;right: 150px;bottom: 50px;"
    />
  </div>
</template>

<script>
  import axios from 'axios'
  import $ from 'jquery'
  import countDown from 'vue-canvas-countdown'

  export default {
    components: {
      countDown
    },
    data() {
      return {
        oid: '',
        jid: '',
        flag: false,
        flagV: '',
        is: false,
        ruleList: [],
        fire: 0
      }
    },
    computed: {
      wsdata() {
        return this.$store.state.app.wsdata
      }
    },
    watch: {
      wsdata: function () {
        console.log(this.wsdata)
        var split = this.wsdata.split('-')
        switch (split[0]) {
          case 'EXCEPTION':
            this.$message.error(split[1]);
            break
          case 'MOVE':
            let id = split[2]
            // 启动倒计时
            this.fireCD()
            if (id == 'WAIVER'){
              this.$message('对方没有可落棋子, 本回合自动弃权!')
              this.is = true
              return false
            }else {
              $("#" + id).html('<img class="' + (!this.flag ? "user1" : "user2") + '" src="image/black_white/' + (!this.flag ? "black.png" : "white.png") + '" />')
              var r = this.rule(id, false);
              this.turn(r)
            }

            if (this.$store.state.app.jsonObjectIsEmpty(this.rule())){
              this.is = true
            } else {
              if (id == 'WAIVER'){
                this.$message('双方都没有可落棋子, 游戏结束!')
                this.$store.state.app.websocket.send('MOVE-' + this.oid + '-' + this.jid + "-" + "WAIVER")
              }else{
                this.$message('你没有可落棋子, 本回合自动弃权!')
                this.$store.state.app.websocket.send('MOVE-' + this.oid + '-' + this.jid + "-" + "WAIVER")
              }
            }
            break
          case 'GAME_OVER':
            this.is = false
            this.$alert(split[1], '游戏结束', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push({path: '/user_table'})
              }
            });
            break
        }
      }
    },
    created() {
      // 是否为观战
      console.log(this.$route.params.jid);
      if(this.$route.params.jid) {
        this.jid = this.$route.params.jid
        this.$store.state.app.getJournal(this.jid).then(journal=> {
          console.log(journal)
        })
        // var it = setInterval(function () {
        //   this.$store.state.app.getJournal(this.jid)
        // }, 10000)
        return false
      }

      this.oid = this.$route.params.oid
      this.flag = this.$route.params.flag
      this.jid = this.flag ? this.$store.state.app.uid + "|" + this.$route.params.oid : this.$route.params.oid + "|" + this.$store.state.app.uid
      this.flagV = this.flag ? "user1" : "user2"
      this.is = this.$route.params.flag
    },
    mounted() {
      $(".chinese_chess tr").each(function (i, val) {
        $(this).children("td").each(function (j, val) {
          $(this).attr("id", (i + 1) + "_" + (j + 1))
        })
      })
      if (this.is) {
        this.fireCD()
      }
    },
    methods: {
      move(e) {
        if (this.is) {
          var chess = $(e.srcElement)
          var id = chess.attr("id")
          if (!id) {
            return false
          }
          var r = this.rule(id, true);
          if (r.length > 0) {
            this.is = false
            this.$store.state.app.websocket.send('MOVE-' + this.oid + '-' + this.jid + "-" + id)
            chess.html('<img class="' + (this.flag ? "user1" : "user2") + '" src="image/black_white/' + (this.flag ? "black.png" : "white.png") + '" />')
            this.turn(r)
          }
        }
      },
      // 移动规则
      rule(id, isSelf) {
        // 是否有敌方棋子
        var isExist = (qid, flag) => {
          var $1 = $("#" + qid)
          if (flag) {
            return ($1.children().length !== 0)
          } else {
            if (isSelf) {
              return $1.children().hasClass((this.flag ? "user2" : "user1"))
            } else {
              return $1.children().hasClass((this.flag ? "user1" : "user2"))
            }
          }
        }
        let rules = []
        if (id) {
          let obj = $("#" + id)
          let ids = obj.attr("id").split("_")
          ids[0] = ids[0] * 1
          ids[1] = ids[1] * 1

          // 横左
          let interim_rule = []
          for (let i = ids[1] - 1; i > 0; i--) {
            if (isExist(ids[0] + "_" + i)) {
              interim_rule.push(ids[0] + "_" + i)
            } else if (isExist((ids[0] + "_" + i), true)){
              rules = rules.concat(interim_rule)
              break
            } else {
              break
            }
          }
          // 横右
          interim_rule = []
          for (let i = ids[1] + 1; i < 9; i++) {
            if (isExist(ids[0] + "_" + i)) {
              interim_rule.push(ids[0] + "_" + i)
            } else if (isExist((ids[0] + "_" + i), true)){
              rules = rules.concat(interim_rule)
              break
            } else {
              break
            }
          }
          // 纵上
          interim_rule = []
          for (let i = ids[0] - 1; i > 0; i--) {
            if (isExist(i + "_" + ids[1])) {
              interim_rule.push(i + "_" + ids[1])
            } else if (isExist((i + "_" + ids[1]), true)){
              rules = rules.concat(interim_rule)
              break
            } else {
              break
            }
          }
          // 纵下
          interim_rule = []
          for (let i = ids[0] + 1; i < 9; i++) {
            if (isExist(i + "_" + ids[1])) {
              interim_rule.push(i + "_" + ids[1])
            } else if (isExist((i + "_" + ids[1]), true)){
              rules = rules.concat(interim_rule)
              break
            } else {
              break
            }
          }

          // 左上
          interim_rule = []
          for (let i = 1; ids[0] - i > 0 && ids[1] - i > 0; i++) {
            if (isExist((ids[0] - i) + "_" + (ids[1] - i))) {
              interim_rule.push((ids[0] - i) + "_" + (ids[1] - i))
            } else if (isExist(((ids[0] - i) + "_" + (ids[1] - i)), true)){
              rules = rules.concat(interim_rule)
              break
            } else {
              break
            }
          }
          // 左下
          interim_rule = []
          for (let i = 1; ids[0] + i < 9 && ids[1] + i < 9; i++) {
            if (isExist((ids[0] + i) + "_" + (ids[1] + i))) {
              interim_rule.push((ids[0] + i) + "_" + (ids[1] + i))
            }else if (isExist(((ids[0] + i) + "_" + (ids[1] + i)), true)){
              rules = rules.concat(interim_rule)
              break
            } else {
              break
            }
          }
          // 右上
          interim_rule = []
          for (let i = 1; ids[0] + i < 9 && ids[1] - i > 0; i++) {
            if (isExist((ids[0] + i) + "_" + (ids[1] - i))) {
              interim_rule.push((ids[0] + i) + "_" + (ids[1] - i))
            } else if (isExist(((ids[0] + i) + "_" + (ids[1] - i)), true)){
              rules = rules.concat(interim_rule)
              break
            } else {
              break
            }
          }
          // 右下
          interim_rule = []
          for (let i = 1; ids[0] - i > 0 && ids[1] + i < 9; i++) {
            if (isExist((ids[0] - i) + "_" + (ids[1] + i))) {
              interim_rule.push((ids[0] - i) + "_" + (ids[1] + i))
            } else if (isExist(((ids[0] - i) + "_" + (ids[1] + i)), true)){
              rules = rules.concat(interim_rule)
              break
            } else {
              break
            }
          }
        } else {
          rules = {}
          let _this = this
          $(".chinese_chess td").each(function () {
            if ($(this).children().length == 0) {
              let r = _this.rule($(this).attr("id"));
              if (r.length > 0){
                rules[$(this).attr("id")] = r
              }
            }
          })
        }
        return rules
      },
      turn(list) {
        for (let j = 0; j < list.length; j++) {
          setTimeout(function() {
            let obj = $("#" + list[j]).children()
            let i = 0
            let it = setInterval(function () {
              i++
              // obj.css("transform", "rotateX(" + i + "deg)")
              obj.css("transform", "rotateY(" + i + "deg)")
              // obj.css("transform", "rotateZ(" + i + "deg)")
              if (i == 90) {
                if(obj.prop("src").endsWith("black.png")){
                  obj.prop("src", "image/black_white/white.png")
                  obj.prop("class", "user2")
                } else {
                  obj.prop("src", "image/black_white/black.png")
                  obj.prop("class", "user1")
                }
              }
              if (i == 180) {
                window.clearInterval(it)
              }
            }, 1)
          }, j * 300)
        }
      },
      fireCD() {
        console.log(this.fire++)
      },
      onStatusChange(payload) {
        console.log('倒计时状态改变：', payload)
      },
      onEnd() {
        if (this.is) {
          this.is = false
          this.$store.state.app.websocket.send('GAME_OVER-' + this.oid + '-' + this.jid + "-对方超时, 游戏结束")
          this.$alert('时间到, 游戏结束', '游戏结束', {
            confirmButtonText: '确定',
            callback: action => {
              this.$router.push({path: '/user_table'})
            }
          });
        }
        console.log('倒计时结束的回调函数')
      }
    }
  }

</script>

<style lang="scss">
  .chinese_chess {
    text-align: center;
    margin-top: 12px;

    table {
      background-size: 100% 100%;
      margin: 0px auto;
      /*-webkit-transform:rotate(180deg);*/
      td {
        /*width: 11.1%;*/
        /*height: 10%;*/
        width: 50px;
        height: 50px;

        img {
          width: 96%;
          border-radius: 100%;
          /*-webkit-transform:rotate(180deg);*/
        }
      }
    }

    .avatar-wrapper {
      position: absolute;
      right: 40px;
      bottom: 40px;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
    }
  }

  .user2 {
    -webkit-transform: rotate(180deg);
  }

</style>
