<!--suppress ALL -->
<template>
  <div class="chinese_chess">
    <table border="0" cellpadding="0" cellspacing="0" background="/image/bgimg/棋盘.png" id="table"
           :style="{ '-webkit-transform': !flag ?'rotate(180deg)': ''}">
      <tr v-for="i in 10">
        <td v-for="j in 9" @click.stop="move($event)">
          <img class="user2" v-if="i + '_' + j == '1_1'" data-type="俥" src="@/assets/chinese_chess/黑俥.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '1_2'" data-type="傌" src="@/assets/chinese_chess/黑傌.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '1_3'" data-type="象" src="@/assets/chinese_chess/黑象.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '1_4'" data-type="仕" src="@/assets/chinese_chess/黑仕.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '1_5'" id="user2" data-type="将" src="@/assets/chinese_chess/黑将.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '1_6'" data-type="仕" src="@/assets/chinese_chess/黑仕.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '1_7'" data-type="象" src="@/assets/chinese_chess/黑象.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '1_8'" data-type="傌" src="@/assets/chinese_chess/黑傌.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '1_9'" data-type="俥" src="@/assets/chinese_chess/黑俥.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '3_2'" data-type="砲" src="@/assets/chinese_chess/黑砲.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '3_8'" data-type="砲" src="@/assets/chinese_chess/黑砲.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '4_1'" data-type="卒" src="@/assets/chinese_chess/黑卒.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '4_3'" data-type="卒" src="@/assets/chinese_chess/黑卒.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '4_5'" data-type="卒" src="@/assets/chinese_chess/黑卒.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '4_7'" data-type="卒" src="@/assets/chinese_chess/黑卒.png"
               width="100%"/>
          <img class="user2" v-if="i + '_' + j == '4_9'" data-type="卒" src="@/assets/chinese_chess/黑卒.png"
               width="100%"/>

          <img class="user1" v-if="i + '_' + j == '10_1'" data-type="車" src="@/assets/chinese_chess/红車.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '10_2'" data-type="馬" src="@/assets/chinese_chess/红馬.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '10_3'" data-type="相" src="@/assets/chinese_chess/红相.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '10_4'" data-type="士" src="@/assets/chinese_chess/红士.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '10_5'" id="user1" data-type="帅" src="@/assets/chinese_chess/红帅.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '10_6'" data-type="士" src="@/assets/chinese_chess/红士.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '10_7'" data-type="相" src="@/assets/chinese_chess/红相.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '10_8'" data-type="馬" src="@/assets/chinese_chess/红馬.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '10_9'" data-type="車" src="@/assets/chinese_chess/红車.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '8_8'" data-type="炮" src="@/assets/chinese_chess/红炮.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '8_2'" data-type="炮" src="@/assets/chinese_chess/红炮.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '7_1'" data-type="兵" src="@/assets/chinese_chess/红兵.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '7_3'" data-type="兵" src="@/assets/chinese_chess/红兵.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '7_5'" data-type="兵" src="@/assets/chinese_chess/红兵.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '7_7'" data-type="兵" src="@/assets/chinese_chess/红兵.png"
               width="100%"/>
          <img class="user1" v-if="i + '_' + j == '7_9'" data-type="兵" src="@/assets/chinese_chess/红兵.png"
               width="100%"/>
        </td>
      </tr>
    </table>
    <countDown
      ref="countDown"
      :fire="fire"
      time="120"
      :statusChange="[60000,20000]"
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
        selectE: null,
        ruleList: [],
        attackList: [],
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
            let ids = split[2].split("=>");
            let s1 = ids[0].split("_")
            let s2 = ids[1].split("_")
            let x = ((s1[1] * 1) - (s2[1] * 1)) * 50
            let y = ((s1[0] * 1) - (s2[0] * 1)) * 50
            let z = Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2), 2) * 1.5
            let obj = $("#" + ids[0]).children();
            let _this = this
            obj.css("position", "relative")
            obj.animate({
              left: x,
              top: y,
            }, z, 'swing', function () {
              _this.is = true
              // 启动倒计时
              _this.fireCD()
              obj.css("position", "static")
              obj.css("left", "0")
              obj.css("top", "0")
              $("#" + ids[1]).html($("#" + ids[0]).html())
              $("#" + ids[0]).html("")
              var isStalemate = _this.stalemate(true)
              if (isStalemate) {
                _this.$message('将军!')
                var checkMate = _this.checkMate(true, isStalemate)
                if (checkMate) {
                  _this.$message('将杀!')
                  _this.$alert('你输了, 游戏结束', '游戏结束', {
                    confirmButtonText: '确定',
                    callback: action => {
                      _this.$router.push({path: '/user_table'})
                    }
                  });
                  _this.is = false
                  _this.$store.state.app.websocket.send('GAME_OVER-' + this.oid + '-' + this.jid + "-你赢了, 游戏结束")
                }
              }
            })
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
      select(e) {
        if (this.is) {
          var chess = $(e.srcElement)
          if (chess.hasClass(this.flagV)) {
            if (chess.hasClass("select")) {
              chess.removeClass("select")
              this.selectE = null
            } else {
              this.flag ? $(".user1").removeClass("select") : $(".user2").removeClass("select")
              chess.addClass("select")
              this.selectE = chess
            }
          }
        }
      },
      move(e) {
        if (this.is) {
          var chess = $(e.srcElement)
          if (chess.hasClass(this.flagV)) {
            if (chess.hasClass("select")) {
              chess.removeClass("select")
              this.ruleList = []
              this.selectE = null
            } else {
              this.flag ? $(".user1").removeClass("select") : $(".user2").removeClass("select")
              chess.addClass("select")
              this.selectE = chess
              this.rule()
            }
          } else if (this.selectE) {
            let id = null
            let obj = null
            let str = null
            if (chess.attr("id")) {
              id = chess.attr("id")
              obj = chess.children()
              str = this.selectE.parent().attr("id") + "=>" + chess.attr("id")
            } else if (chess.parent().attr("id")) {
              id = chess.parent().attr("id")
              obj = chess
              str = this.selectE.parent().attr("id") + "=>" + chess.parent().attr("id")
            }
            if (this.ruleList.indexOf(id) == -1) {
              return
            }
            // if (this.stalemate()) {
            //   return
            // }
            this.is = false
            this.$store.state.app.websocket.send('MOVE-' + this.oid + '-' + this.jid + "-" + str)
            this.selectE.removeClass("select")
            this.ruleList = []
            this.selectE.css("position", "relative")
            let _this = this

            let s1 = id.split("_")
            let s2 = this.selectE.parent().attr("id").split("_")
            let x = ((s1[1] * 1) - (s2[1] * 1)) * 50
            let y = ((s1[0] * 1) - (s2[0] * 1)) * 50
            let z = Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2), 2) * 1.5

            this.selectE.animate({
              left: x,
              top: y,
            }, z, 'swing', function () {
              if (chess.attr("id")) {
                chess.append(_this.selectE);
              } else if (chess.parent().attr("id")) {
                chess.replaceWith(_this.selectE);
              }
              _this.selectE.css("position", "static")
              _this.selectE.css("left", "0")
              _this.selectE.css("top", "0")
              _this.selectE = null

              var isStalemate = _this.stalemate(false)
              if (isStalemate) {
                this.$message('将军!')
                var checkMate = _this.checkMate(false, isStalemate)
                if (checkMate) {
                  this.$message('将杀!')
                }
              }
            })
          }
        }
      },
      // 移动规则
      rule(id, mid, cid) {
        let obj
        let rules = []
        // 判断此处是否有己方棋子, flag=true判断是否有棋子
        var isExist = (qid, flag) => {
          // mid 待移动棋子
          if (mid){
            if (mid == qid) {
              return false
            }
          }
          // cid 待移动位置
          if (cid){
            if (cid == qid) {
              if (flag){
                return true
              } else {
                var $2 = $("#" + mid)
                return $2.children().hasClass(obj.children().prop("class"));
              }
            }
          }
          var $1 = $("#" + qid)
          if (flag){
            return ($1.children().length !== 0)
          }else {
            return $1.children().hasClass(obj.children().prop("class"));
          }
        }
        if (id){
          obj = $("#" + id).children()
        } else {
          obj = this.selectE
        }
        let ids = obj.parent().attr("id").split("_")
        let type = obj.data("type")
        ids[0] = ids[0] * 1
        ids[1] = ids[1] * 1
        switch (type) {
          case "車":
          case "俥":
            // 横 左
            for (let i = ids[1] - 1; i > 0; i--) {
              if (isExist(ids[0] + "_" + i, true)) {
                if (isExist(ids[0] + "_" + i)) {
                  break
                } else {
                  rules.push(ids[0] + "_" + i)
                  break
                }
              } else {
                rules.push(ids[0] + "_" + i)
              }
            }
            // 横 右
            for (let i = ids[1] + 1; i <= 9; i++) {
              if (isExist(ids[0] + "_" + i, true)) {
                if (isExist(ids[0] + "_" + i)) {
                  break
                } else {
                  rules.push(ids[0] + "_" + i)
                  break
                }
              } else {
                rules.push(ids[0] + "_" + i)
              }
            }
            // 纵 上
            for (let i = ids[0] - 1; i > 0; i--) {
              if (isExist(i + "_" + ids[1], true)) {
                if (isExist(i + "_" + ids[1])) {
                  break
                } else {
                  rules.push(i + "_" + ids[1])
                  break
                }
              } else {
                rules.push(i + "_" + ids[1])
              }
            }
            // 纵 下
            for (let i = ids[0] + 1; i <= 10; i++) {
              if (isExist(i + "_" + ids[1], true)) {
                if (isExist(i + "_" + ids[1])) {
                  break
                } else {
                  rules.push(i + "_" + ids[1])
                  break
                }
              } else {
                rules.push(i + "_" + ids[1])
              }
            }
            break
          case "馬":
          case "傌":
            if (!isExist((ids[0] - 1) + "_" + ids[1], true)) {
              if ((ids[0] - 2) > 0 && (ids[1] - 1) > 0 && !isExist((ids[0] - 2) + "_" + (ids[1] - 1))) {
                rules.push((ids[0] - 2) + "_" + (ids[1] - 1))
              }
              if ((ids[0] - 2) > 0 && (ids[1] + 1) < 10 && !isExist((ids[0] - 2) + "_" + (ids[1] + 1))) {
                rules.push((ids[0] - 2) + "_" + (ids[1] + 1))
              }
            }
            if (!isExist((ids[0] + 1) + "_" + ids[1], true)) {
              if ((ids[0] + 2) < 11 && (ids[1] - 1) > 0 && !isExist((ids[0] + 2) + "_" + (ids[1] - 1))) {
                rules.push((ids[0] + 2) + "_" + (ids[1] - 1))
              }
              if ((ids[0] + 2) < 11 && (ids[1] + 1) < 10 && !isExist((ids[0] + 2) + "_" + (ids[1] + 1))) {
                rules.push((ids[0] + 2) + "_" + (ids[1] + 1))
              }
            }
            if (!isExist(ids[0] + "_" + (ids[1] - 1), true)) {
              if ((ids[0] - 1) > 0 && (ids[1] - 2) > 0 && !isExist((ids[0] - 1) + "_" + (ids[1] - 2))) {
                rules.push((ids[0] - 1) + "_" + (ids[1] - 2))
              }
              if ((ids[0] + 1) < 11 && (ids[1] - 2) > 0 && !isExist((ids[0] + 1) + "_" + (ids[1] - 2))) {
                rules.push((ids[0] + 1) + "_" + (ids[1] - 2))
              }
            }
            if (!isExist(ids[0] + "_" + (ids[1] + 1), true)) {
              if ((ids[0] - 1) > 0 && (ids[1] + 2) < 9 && !isExist((ids[0] - 1) + "_" + (ids[1] + 2))) {
                rules.push((ids[0] - 1) + "_" + (ids[1] + 2))
              }
              if ((ids[0] + 1) < 11 && (ids[1] + 2) < 9 && !isExist((ids[0] + 1) + "_" + (ids[1] + 2))) {
                rules.push((ids[0] + 1) + "_" + (ids[1] + 2))
              }
            }
            break
          case "炮":
          case "砲":
            // 横 左
            var is = true
            for (let i = ids[1] - 1; i > 0; i--) {
              if (isExist(ids[0] + "_" + i, true)) {
                if (isExist(ids[0] + "_" + i)) {
                  if (!is) {
                    break
                  }
                } else {
                  if (!is) {
                    rules.push(ids[0] + "_" + i)
                    break
                  }
                }
                is = false
              } else {
                if (is) {
                  rules.push(ids[0] + "_" + i)
                }
              }
            }
            // 横 右
            is = true
            for (let i = ids[1] + 1; i <= 9; i++) {
              if (isExist(ids[0] + "_" + i, true)) {
                if (isExist(ids[0] + "_" + i)) {
                  if (!is) {
                    break
                  }
                } else {
                  if (!is) {
                    rules.push(ids[0] + "_" + i)
                    break
                  }
                }
                is = false
              } else {
                if (is) {
                  rules.push(ids[0] + "_" + i)
                }
              }
            }
            // 纵 上
            is = true
            for (let i = ids[0] - 1; i > 0; i--) {
              if (isExist(i + "_" + ids[1], true)) {
                if (isExist(i + "_" + ids[1])) {
                  if (!is) {
                    break
                  }
                } else {
                  if (!is) {
                    rules.push(i + "_" + ids[1])
                    break
                  }
                }
                is = false
              } else {
                if (is) {
                  rules.push(i + "_" + ids[1])
                }
              }
            }
            // 纵 下
            is = true
            for (let i = ids[0] + 1; i <= 10; i++) {
              if (isExist(i + "_" + ids[1], true)) {
                if (isExist(i + "_" + ids[1])) {
                  if (!is) {
                    break
                  }
                } else {
                  if (!is) {
                    rules.push(i + "_" + ids[1])
                    break
                  }
                }
                is = false
              } else {
                if (is) {
                  rules.push(i + "_" + ids[1])
                }
              }
            }
            break
          case "相":
            if (!isExist((ids[0] - 1) + "_" + (ids[1] - 1), true)) {
              if ((ids[0] - 2) > 5 && (ids[1] - 2) > 0 && !isExist((ids[0] - 2) + "_" + (ids[1] - 2))) {
                rules.push((ids[0] - 2) + "_" + (ids[1] - 2))
              }
            }
            if (!isExist((ids[0] + 1) + "_" + (ids[1] + 1), true)) {
              if ((ids[0] + 2) < 11 && (ids[1] + 2) < 10 && !isExist((ids[0] + 2) + "_" + (ids[1] + 2))) {
                rules.push((ids[0] + 2) + "_" + (ids[1] + 2))
              }
            }
            if (!isExist((ids[0] - 1) + "_" + (ids[1] + 1), true)) {
              if ((ids[0] - 2) > 5 && (ids[1] + 2) < 10 && !isExist((ids[0] - 2) + "_" + (ids[1] + 2))) {
                rules.push((ids[0] - 2) + "_" + (ids[1] + 2))
              }
            }
            if (!isExist((ids[0] + 1) + "_" + (ids[1] - 1), true)) {
              if ((ids[0] + 2) < 11 && (ids[1] - 2) > 0 && !isExist((ids[0] + 2) + "_" + (ids[1] - 2))) {
                rules.push((ids[0] + 2) + "_" + (ids[1] - 2))
              }
            }
            break
          case "象":
            if (!isExist((ids[0] - 1) + "_" + (ids[1] - 1), true)) {
              if ((ids[0] - 2) > 0 && (ids[1] - 2) > 0 && !isExist((ids[0] - 2) + "_" + (ids[1] - 2))) {
                rules.push((ids[0] - 2) + "_" + (ids[1] - 2))
              }
            }
            if (!isExist((ids[0] + 1) + "_" + (ids[1] + 1), true)) {
              if ((ids[0] + 2) < 7 && (ids[1] + 2) < 10 && !isExist((ids[0] + 2) + "_" + (ids[1] + 2))) {
                rules.push((ids[0] + 2) + "_" + (ids[1] + 2))
              }
            }
            if (!isExist((ids[0] - 1) + "_" + (ids[1] + 1), true)) {
              if ((ids[0] - 2) > 0 && (ids[1] + 2) < 10 && !isExist((ids[0] - 2) + "_" + (ids[1] + 2))) {
                rules.push((ids[0] - 2) + "_" + (ids[1] + 2))
              }
            }
            if (!isExist((ids[0] + 1) + "_" + (ids[1] - 1), true)) {
              if ((ids[0] + 2) < 7 && (ids[1] - 2) > 0 && !isExist((ids[0] + 2) + "_" + (ids[1] - 2))) {
                rules.push((ids[0] + 2) + "_" + (ids[1] - 2))
              }
            }
            break
          case "士":
            if ((ids[0] + 1) < 4 && (ids[1] + 1) < 7 && !isExist((ids[0] + 1) + "_" + (ids[1] + 1))) {
              rules.push((ids[0] + 1) + "_" + (ids[1] + 1))
            }
            if ((ids[0] - 1) > 0 && (ids[1] - 1) > 3 && !isExist((ids[0] - 1) + "_" + (ids[1] - 1))) {
              rules.push((ids[0] - 1) + "_" + (ids[1] - 1))
            }
            if ((ids[0] - 1) > 0 && (ids[1] + 1) < 7 && !isExist((ids[0] - 1) + "_" + (ids[1] + 1))) {
              rules.push((ids[0] - 1) + "_" + (ids[1] + 1))
            }
            if ((ids[0] + 1) < 4 && (ids[1] - 1) < 3 && !isExist((ids[0] + 1) + "_" + (ids[1] - 1))) {
              rules.push((ids[0] + 1) + "_" + (ids[1] - 1))
            }
            break
          case "仕":
            if ((ids[0] + 1) < 11 && (ids[1] + 1) < 7 && !isExist((ids[0] + 1) + "_" + (ids[1] + 1))) {
              rules.push((ids[0] + 1) + "_" + (ids[1] + 1))
            }
            if ((ids[0] - 1) > 7 && (ids[1] - 1) > 3 && !isExist((ids[0] - 1) + "_" + (ids[1] - 1))) {
              rules.push((ids[0] - 1) + "_" + (ids[1] - 1))
            }
            if ((ids[0] - 1) > 7 && (ids[1] + 1) < 7 && !isExist((ids[0] - 1) + "_" + (ids[1] + 1))) {
              rules.push((ids[0] - 1) + "_" + (ids[1] + 1))
            }
            if ((ids[0] + 1) < 11 && (ids[1] - 1) > 3 && !isExist((ids[0] + 1) + "_" + (ids[1] - 1))) {
              rules.push((ids[0] + 1) + "_" + (ids[1] - 1))
            }
            break
          case "将":
            if (ids[0] > 1) {
              if (!isExist((ids[0] - 1) + "_" + ids[1])) {
                rules.push((ids[0] - 1) + "_" + ids[1])
              }
            }
            if (ids[0] < 3) {
              if (!isExist((ids[0] + 1) + "_" + ids[1])) {
                rules.push((ids[0] + 1) + "_" + ids[1])
              }
            }
            if (ids[1] > 4) {
              if (!isExist(ids[0] + "_" + (ids[1] - 1))) {
                var split = $("#user1").parent().attr("id").split("_");
                if ((ids[1] - 1) == split[1]){
                  for (let i = ids[0]; i <= split[0]; i++) {
                    if (isExist(i + "_" + split[1]), true){
                      rules.push(ids[0] + "_" + (ids[1] - 1))
                      break
                    }
                  }
                } else {
                  rules.push(ids[0] + "_" + (ids[1] - 1))
                }
              }
            }
            if (ids[1] < 6) {
              if (!isExist(ids[0] + "_" + (ids[1] + 1))) {
                var split = $("#user1").parent().attr("id").split("_");
                if ((ids[1] + 1) == split[1]){
                  for (let i = ids[0]; i <= split[0]; i++) {
                    if (isExist(i + "_" + split[1]), true){
                      rules.push(ids[0] + "_" + (ids[1] + 1))
                      break
                    }
                  }
                } else {
                  rules.push(ids[0] + "_" + (ids[1] + 1))
                }
              }
            }
            break
          case "帅":
            if (ids[0] > 8) {
              if (!isExist((ids[0] - 1) + "_" + ids[1])) {
                rules.push((ids[0] - 1) + "_" + ids[1])
              }
            }
            if (ids[0] < 10) {
              if (!isExist((ids[0] + 1) + "_" + ids[1])) {
                rules.push((ids[0] + 1) + "_" + ids[1])
              }
            }
            if (ids[1] > 4) {
              if (!isExist(ids[0] + "_" + (ids[1] - 1))) {
                var split = $("#user2").parent().attr("id").split("_");
                if ((ids[1] - 1) == split[1]){
                  for (let i = split[0]; i <= ids[0]; i++) {
                    if (isExist(i + "_" + split[1]), true){
                      rules.push(ids[0] + "_" + (ids[1] - 1))
                      break
                    }
                  }
                } else {
                  rules.push(ids[0] + "_" + (ids[1] - 1))
                }
              }
            }
            if (ids[1] < 6) {
              if (!isExist(ids[0] + "_" + (ids[1] + 1))) {
                var split = $("#user2").parent().attr("id").split("_");
                if ((ids[1] + 1) == split[1]){
                  for (let i = split[0]; i <= ids[0]; i++) {
                    if (isExist(i + "_" + split[1]), true){
                      rules.push(ids[0] + "_" + (ids[1] + 1))
                      break
                    }
                  }
                } else {
                  rules.push(ids[0] + "_" + (ids[1] + 1))
                }
              }
            }
            break
          case "兵":
            if (ids[0] > 1) {
              if (!isExist((ids[0] - 1) + "_" + ids[1])) {
                rules.push((ids[0] - 1) + "_" + ids[1])
              }
            }
            // 是否过河
            if (ids[0] < 6) {
              if ((ids[1] + 1) < 10 && !isExist(ids[0] + "_" + (ids[1] + 1))) {
                rules.push(ids[0] + "_" + (ids[1] + 1))
              }
              if ((ids[1] - 1) > 0 && !isExist(ids[0] + "_" + (ids[1] - 1))) {
                rules.push(ids[0] + "_" + (ids[1] - 1))
              }
            }
            break
          case "卒":
            if (ids[0] < 9) {
              if (!isExist((ids[0] + 1) + "_" + ids[1])) {
                rules.push((ids[0] + 1) + "_" + ids[1])
              }
            }
            // 是否过河
            if (ids[0] > 5) {
              if ((ids[1] + 1) < 10 && !isExist(ids[0] + "_" + (ids[1] + 1))) {
                rules.push(ids[0] + "_" + (ids[1] + 1))
              }
              if ((ids[1] - 1) > 0 && !isExist(ids[0] + "_" + (ids[1] + 1))) {
                rules.push(ids[0] + "_" + (ids[1] - 1))
              }
            }
            break
        }

        if (id){
          console.log("===========" + rules)
        } else {
          for (let i = rules.length - 1; i >= 0; i--) {
            if (this.stalemate(true, obj.parent().attr("id"), rules[i])) {
              rules.splice(i, 1)
            }
          }
          this.attackList.push()
          this.ruleList = rules
        }
        return rules
      },
      // 将军判断
      stalemate(is, obj, cid) {
        let id = ''
        let _this = this
        let u = ''
        if (is){
          u = this.flag ? "user2" : "user1"
          id = $("#" + (this.flag ? "user1" : "user2")).parent().attr("id");
        } else {
          u = this.flag ? "user1" : "user2"
          id = $("#" + (this.flag ? "user2" : "user1")).parent().attr("id");
        }
        let flag = false
        $("." + u).each(function () {
          var r = _this.rule($(this).parent().attr("id"), obj, cid);
          if (r.indexOf(id) > 0) {
            console.log("将军")
            flag = $(this).parent().attr("id")
            return false
          }
        })
        return flag
      },
      // 将杀判断
      checkMate(is, gid) {
        let id = ''
        let _this = this
        let u = ''
        if (is){
          u = this.flag ? "user2" : "user1"
          id = $("#" + (this.flag ? "user1" : "user2")).parent().attr("id");
        } else {
          u = this.flag ? "user1" : "user2"
          id = $("#" + (this.flag ? "user2" : "user1")).parent().attr("id");
        }
        // 移动无法避开(可移动位置都在攻击范围内)
        var r = this.rule(id);
        for (let i = 0; i < r.length; i++) {
          if (!this.stalemate(true, u, r[i])) {
            return false
          }
        }
        // 无法使用己方棋子格挡(直接格挡或别腿或吃掉该棋子)
        // 己方是否可移动到此
        var isMovable = (u, id0, id1) => {
          let f = false
          $("." + u).each(function () {
            var r = _this.rule($(this).parent().attr("id"));
            if (r.indexOf(id0 + "_" + id1) > 0) {
              f = true
              return false
            }
          })
          return f
        }

        let ids = id.split("_")
        ids[0] = ids[0] * 1
        ids[1] = ids[1] * 1
        let gids = gid.split("_")
        gids[0] = gids[0] * 1
        gids[1] = gids[1] * 1

        let id0 = null;
        let id1 = null;

        // 将军的棋子可被己方吃掉
        if (isMovable(u, gids[0], gids[1])) {
          return false
        }

        // 横坐标或纵坐标相等
        if (ids[0] == gids[0]) {
          let flag = true
          $("." + u).each(function () {
            var r = _this.rule($(this).parent().attr("id"));
            for (let i = 0; i < r.length; i++) {
              var split = r[i].split("_");
              split[0] = split[0] * 1
              split[1] = split[1] * 1
              // 横坐标相等 纵坐标在二者之间
              if (split[0] == ids[0] && Math.abs(split[1] - ids[1]) < Math.abs(gids[1] - ids[1])) {
                if (!_this.stalemate(true, $(this).parent().attr("id"), r[i])) {
                  flag = false
                  return false
                }
              }
            }
          })
          return flag
        }else if (ids[1] == gids[1]) {
          let flag = true
          $("." + u).each(function () {
            var r = _this.rule($(this).parent().attr("id"));
            for (let i = 0; i < r.length; i++) {
              var split = r[i].split("_");
              split[0] = split[0] * 1
              split[1] = split[1] * 1
              // 横坐标相等 纵坐标在二者之间
              if (split[1] == ids[1] && Math.abs(split[0] - ids[0]) < Math.abs(gids[0] - ids[0])) {
                if (!_this.stalemate(true, $(this).parent().attr("id"), r[i])) {
                  flag = false
                  return false
                }
              }
            }
          })
          return flag
        }else {
          let x = ids[0] - gids[0]
          let y = ids[1] - gids[1]
          if (x == 2){
            id0 = gid[0] + 1
            id1 = gid[1]
          }
          if (x == -2){
            id0 = gid[0] - 1
            id1 = gid[1]
          }
          if (y == 2){
            id0 = gid[0]
            id1 = gid[1] + 1
          }
          if (y == -2){
            id0 = gid[0]
            id1 = gid[1] - 1
          }
          // 是否可以别腿
          if (isMovable){
            return false
          }
        }

        return true
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
      width: 450px;
      height: 500px;
      background-size: 100% 100%;
      margin: 0px auto;
      /*-webkit-transform:rotate(180deg);*/
      td {
        /*width: 11.1%;*/
        /*height: 10%;*/
        width: 50px;
        height: 50px;
        img {
          width: 100%;
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

  .select {
    opacity: 0.5
  }

</style>
