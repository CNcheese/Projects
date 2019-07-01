<template>
  <el-card>
    <div slot="header">
      <span>账户设置</span>
    </div>
    <el-row>
      <el-col :span="8">
        <el-form>
          <el-form-item label="媒体名称">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="媒体简介">
            <el-input v-model="userInfo.intro"></el-input>
          </el-form-item>
          <el-form-item label="头条号ID">
            <el-input disabled :value="userInfo.id && userInfo.id.toString()"></el-input>
          </el-form-item>
          <el-form-item label="绑定手机">
            <el-input disabled :value="userInfo.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleUpdate">保存更新</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :offset="2" :span="4">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :http-request="handleUpload">
          <img class="avatar" v-if="userInfo.photo" :src="userInfo.photo">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
    name: 'AccountSetting',
  data() {
    return {
        userInfo: {},
        token: `Bearer ${JSON.parse(window.localStorage.getItem('user_info')).token}`
    }
  },
  created () {
      this.loadUserInfo()
  },
  methods: {
    loadUserInfo () {
      this.$http({
        method: 'GET',
        url: '/user/profile'
      }).then(data => {
        this.userInfo = data
      })
    },
    handleUpdate () {
      const { name, intro, email } = this.userInfo
        this.$http({
        method: 'PATCH',
        url: '/user/profile',
        data: {
          name,
          intro,
          email
        }
        }).then(data => {
        this.$message({
          type: 'success',
          message: '更新用户信息成功'
        })
        }).catch(err => {
          console.log(err)
          this.$message.eror('更新信息失败')
        })
      },
    handleAvatarSuccess () {},
    beforeAvatarUpload () {},
    handleUpload (uploadConfig) {
      const formData = new FormData()
      formData.append('photo',
      uploadConfig.file)
      this.$http({
          method: 'PATCH',
          url: '/user/photo',
          data: formData
      }).then(data => {
          this.userInfo.photo = data.photo
          this.$message({
              type: 'success',
              message: '上传成功'
          })
      }).catch(err => {
          console.log(err),
          this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style  scoped lang='less'>

</style>