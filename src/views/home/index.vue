<template>
  <section class="dashboard-user">
    <el-row>
      <el-col :span="15">
        <dl class="user-info">
          <dd class="user-avatar"><img src="@/assets/avatar.jpg"></dd>
          <dt>黑马头条官方账号</dt>
          <dd class="tips">视频发布</dd>
        </dl>
      </el-col>
      <el-col :span="3">
        <div class="num">
          222
        </div>
        <div class="text">粉丝数</div>
      </el-col>
      <el-col :span="3">
        <div class="num">
          333
        </div>
        <div class="text">累计阅读量</div>
      </el-col>
      <el-col :span="3">
        <div class="num">
          444
        </div>
        <div class="text">累计评论数</div>
      </el-col>
    </el-row>
    <template>
      <h2 @click="start">精彩推荐</h2>
  <el-carousel :interval="4000" type="card" height="650px">
    <el-carousel-item v-for="item in imagesbox" :key="item.id">
      <!-- <h3 class="medium">{{ item }}</h3> -->
      <img :src="item.idView" class="image">
    </el-carousel-item>
  </el-carousel>
</template>

  </section>
</template>

<script>
export default {
  name: 'AppHome',
  data () {
    return {
      imagesbox: [{
        id: 0, idView: require('./image/001.jpg')
      },
      {
        id: 1, idView: require('./image/002.jpg')
      },
      {
        id: 2, idView: require('./image/003.jpg')
      },
      {
        id: 3, idView: require('./image/004.jpg')
      },
      {
        id: 4, idView: require('./image/005.jpg')
      },
      {
        id: 5, idView: require('./image/006.jpg')
      }
      ]
    }
  },
  methods: {
    start () {
       this.$router.push({ name: 'article-list' })
    }
  }
}
</script>

<style lang="less" scoped>
.dashboard-user {
    background-color: #fff;
    border: 1px solid #e7e7e9;
    .user-info {
      text-align: left;
      padding: 8px;
      overflow: hidden;
      dt {
        font-size: 14px;
        margin:4px 0 4px 60px;
      }
      .tips {
        margin-left: 60px;
        font-size: 12px;
        color: #999999;
      }
      .user-avatar{
        vertical-align: middle;
        font-size: 0;
        float: left;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
    }
    .num {
      color: #333333;
    }
    .text {
      color: #999999;
      font-size: 12px;
      margin-top: 2px;
    }
    .el-col-3 {
      border-right: 1px solid #eeeeee;
      margin-top: 13px;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 500px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .image {
    width: 100%;
  }
  h2 {
    margin: 20px auto;
    text-align: center;
    border: 1px solid hotpink;
    border-radius: 15px;
    padding: 10px;
    width: 200px;
    background-color: hotpink;
    color: #fff;
    cursor: pointer;
  }
</style>
