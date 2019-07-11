<template>
  <el-row class="app-header">
    <el-col :span="14"> <i class="iconfont icon-heima"></i> <b>江苏传智播客教育科技股份有限公司</b> </el-col>
    <el-col :span="5" :offset="6">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <input placeholder="随便看看" class="see">
          <img width="30" :src="$store.state.user.photo">
          {{ $store.state.user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>账户设置</el-dropdown-item>
          <el-dropdown-item @click.native="handleOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
// import { win32 } from 'path';
export default {
  name: 'Apphead',
  data () {
    return {
      // userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  },
  methods: {
    handleOut () {
      this.$confirm('客官，这就走呀？', '退出提示', {
        confirmButtonText: '溜了，溜了',
        cancelButtonText: '不，容我再想想',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user_info')
        this.$message({
          type: 'success',
          message: '官人慢走~'
        })
        this.$router.push({
          name: 'login'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '离开失败'
        })
      })
    }
  }
}
</script>

<style  scoped lang='less'>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #409EFF;
  img {
    border-radius: 50%;
  }
}

.el-icon-arrow-down {
  font-size: 12px;
}
.see {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 80px;
  text-align: center;
}
</style>
