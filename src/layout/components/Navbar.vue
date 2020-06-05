<template>
  <div class="navbar">
    <svg
      id="svg"
      style="vertical-align: middle;margin-left: 10px"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      @click="$store.state.app.show()"
    >
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
    </svg>
    <span class="path">{{ this.$route.meta.title }}</span>

    <el-popover
      v-model="visible"
      placement="left"
      width="210"
      trigger="click"
    >
      <table border="0" cellpadding="0" cellspacing="0">
        <tr v-for="i in Math.ceil(imgList.length/3)">
          <td v-for="j in 3" class="avatar-wrapper" @click="chageImg(imgList[((i-1) * 3) + (j-1)].imgUrl)">
            <img :src="imgList[((i-1) * 3) + (j-1)].imgUrl" class="user-avatar">
          </td>
        </tr>
        <tr>
          <td colspan="3">
            <el-input v-model="inputImg" style="width: 67%" size="mini" />
            <el-button type="primary" size="mini" @click="chageImg(inputImg)">确定</el-button>
          </td>
        </tr>
      </table>
      <div slot="reference" class="avatar-wrapper">
        <img :src="$store.state.app.uimgUrl" class="user-avatar">
      </div>
    </el-popover>
    <span class="uname"><a @click="rename">{{ this.$store.state.app.uname }}</a></span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentRow: '',
      visible: false,
      inputImg: '',
      imgList: [
        {
          imgUrl: 'http://5b0988e595225.cdn.sohucs.com/images/20180918/8cb4f421bc5f4f31852eb13ac63ba560.jpeg'
        }, {
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565270318333&di=946718c24ae81fecd7621975a4093251&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F9023de1e57bdd1c1f52b3bb05dc4bf10.jpeg%40wm_2%2Ct_55m%2B5a625Y%2B3L0HmiJHkuLrlm77ni4I%3D%2Cfc_ffffff%2Cff_U2ltSGVp%2Csz_13%2Cx_9%2Cy_9'
        }, {
          imgUrl: '/pkq.png'
        }, {
          imgUrl: 'https://img.zcool.cn/community/01caad5d453eaca8012187f4f8cad8.png@1280w_1l_2o_100sh.png'
        }, {
          imgUrl: 'https://img.zcool.cn/community/0160ec5d453eaca80120695ccc89cc.png@1280w_1l_2o_100sh.png'
        }, {
          imgUrl: 'https://avatar.csdn.net/9/9/1/3_qq_41785135.jpg'
        }, {
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565269712084&di=4c88cc46b47d401b372f619a3ff9d7c4&imgtype=0&src=http%3A%2F%2Fimg.alicdn.com%2Fimgextra%2Fi1%2F346621366%2FTB2ClHLwl8lpuFjSspaXXXJKpXa_%2521%2521346621366.gif'
        }, {
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565269865418&di=de9fd2d119b12aba97d637e349c6638d&imgtype=0&src=http%3A%2F%2Fhiphotos.baidu.com%2Ffeed%2Fpic%2Fitem%2F6f061d950a7b0208fccb84c16fd9f2d3572cc894.jpg'
        }, {
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565269928000&di=6bfdd4aa5a4535b7f51a8040062e39fb&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160629%2F69648e36edeb466cbb37846bd8f457fa.jpg'
        }, {
          imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1565270006530&di=9d973f7b38b4cacce080175dc9dd2b3f&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20140320%2FImg396938637.jpg'
        }, {
          imgUrl: 'http://pic1.cxtuku.com/00/03/44/b7943fe8bb10.jpg'
        }, {
          imgUrl: 'http://img.mp.itc.cn/upload/20161123/5328adc9c319425f8eb8c0ff966e563e_th.jpeg'
        }
      ]
    }
  },
  methods: {
    rename() {
      this.$prompt('请输入新名称', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$store.state.app.uname = value
        sessionStorage.setItem('uname', value)
        this.$store.state.app.websocket.send('RENAME-' + value)
        this.$message({
          type: 'success',
          message: '名称修改成功: ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        })
      })
    },
    chageImg(imgUrl) {
      if (!imgUrl) {
        return
      }
      this.$store.state.app.uimgUrl = imgUrl
      sessionStorage.setItem('uimgUrl', imgUrl)
      this.visible = false
      this.$store.state.app.websocket.send('CHAGEIMG-' + imgUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);;
}
.avatar-wrapper {
  float: right;
  margin-top: 5px;
  margin-right: 20px;
  position: relative;
  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}
.path{
  font-weight: 400 !important;
  line-height: 50px;
  margin-left: 8px;
}
.uname{
  float: right;
  position: relative;
  font-weight: 400 !important;
  line-height: 50px;
  margin-right: 10px;
}
</style>
