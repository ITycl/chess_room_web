<!--suppress ALL -->
<template>
  <div class="app-container">
    <el-button style="float: right" type="primary" @click="fetchData">刷新用户</el-button>
    <el-table
      v-loading="listLoading"
      :data="$store.state.app.userList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="玩家状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state == 0" type="success">在线</el-tag>
          <el-tag v-if="scope.row.state == 1" type="info">组队中</el-tag>
          <el-tag v-if="scope.row.state == 2" >游戏中</el-tag>
          <el-tag v-if="scope.row.state == 3" type="warning">观战中</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state == 0" plain type="success" size="mini" @click="dialogTableVisible = true;otherId=scope.row.id">邀战</el-button>
          <el-button v-if="scope.row.state == 2" plain type="primary" size="mini" @click="watch(scope.row.jid, scope.row.sign)">观战
          </el-button>
          <el-button plain size="mini" @click="send(scope.row.id, scope.row.name)">聊天</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="项目列表" :visible.sync="dialogTableVisible" center>
      <el-select v-model="value" placeholder="请选择你邀请对战的项目" style="width: 100%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="invite">确 定</el-button>
      </span>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        listLoading: true,
        otherId: true,
        dialogTableVisible: false,
        options: [
          {
            value: 'chinese_chess',
            label: '中国象棋'
          },
          {
            value: 'reversi',
            label: '黑白棋'
          },
          {
            value: 'gobang',
            label: '五子棋'
          },
          {
            value: 'weiqi',
            label: '围棋'
          }
        ],
        value: 'chinese_chess'
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
          case 'REFRESH':
            this.fetchData()
            break
          case 'INVITE':
            this.fetchData()
            let str = ''
            for (let i = 0; i < this.options.length; i++) {
              if (split[3] == this.options[i].value){
                str = '[' + this.options[i].label + ']'
                break
              }
            }
            this.$confirm('玩家' + split[2] + "向你发起" + str + "挑战, 你是否接受", '提示', {
              confirmButtonText: '接受',
              cancelButtonText: '拒接',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '游戏开始!'
              });
              this.$store.state.app.websocket.send('ANSWER-' + split[1] + '-' + 1)
              this.$router.push({name: split[3], params: {oid: split[1], flag: true}});
            }).catch(() => {
              this.$store.state.app.websocket.send('ANSWER-' + split[1] + '-' + 0)
              this.$message({
                type: 'info',
                message: '已拒绝对方'
              });
            });
            break
          case 'ANSWER':
            if (split[3] == 0) {
              this.$message({
                type: 'info',
                message: '玩家' + split[2] + '拒绝了你的邀请!'
              });
            } else {
              this.$message({
                type: 'success',
                message: '玩家' + split[2] + '同意了你的邀请, 游戏开始!'
              });
              this.$router.push({name: this.value, params: {oid: split[1], flag: false}});
            }
            break
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      invite() {
        if (this.value) {
          this.dialogTableVisible = false
          this.fetchData()
          this.$store.state.app.websocket.send('INVITE-' + this.otherId + "-" + this.value)
          this.$message({
            message: '邀请已经发出, 请耐心等待',
            type: 'success'
          })
        } else {
          this.$message({
            message: '请选择你邀请对战的项目',
            type: 'warning'
          })
        }
      },
      fetchData() {
        this.listLoading = true
        this.$store.state.app.fetchData()
        this.listLoading = false
      },
      watch(jid, sign) {
        this.$confirm('是否观战对战?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          this.$router.push({name: sign, params: {jid: jid}});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消观战'
          });
        });
      },
      send(id, name) {
        this.$prompt('请输入聊天内容', '聊天', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          if (value){
            this.$store.state.app.websocket.send('MESSAGE-' + id + "-" + value)
            this.$message({
              type: 'success',
              message: '发送成功: ' + value
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }
    }
  }
</script>
