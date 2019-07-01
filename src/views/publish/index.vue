<template>
  <el-card class="publish-card">
    <div slot="header" class="header">
      <span>{{ isEdit ?  '更新' : '发布'}}文章</span>
      <div>
        <el-button type="success "
        @click='handlePublish(false)'
        :loading="publishLoading"
        >{{ isEdit ? '更新' : '发布' }}</el-button>
        <el-button type="primary"
        @click="handlePublish(true)"
        :loading="publishLoading"
        >存入草稿</el-button>
      </div>
    </div>
    <el-form v-loading="isEdit && editloading">
      <el-form-item>
        <el-input type="text" v-model="articleForm.title" placeholder="标题"></el-input>
      </el-form-item>
        <quill-editor v-model="articleForm.content"
          ref="myQuillEditor"
          :options="editorOption">
        </quill-editor>
      <el-form-item label="封面">
      </el-form-item>
      <el-form-item label="频道">
        <!-- <el-select v-model="articleForm.channel_id">
          <el-option label="区域一" value="shanghai"></el-option>
        </el-select> -->
        <article-channel
        v-model="articleForm.channel_id"
        ></article-channel>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'AppPublish',
  components: {
    ArticleChannel,
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: '', // 标题
        content: '', // 内容
        cover: { // 封面
          type: 0, // 封面类型
          images: [] // 图片链接
        },
        channel_id: '' // 频道
      },
      editorOption: {}, // 富文本编辑器相关参数选项
      editloading: false,
      publishLoading: false
    }
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    },
    isEdit () {
      return this.$route.name === 'publish-edit'
    },
    articleId () {
      return this.$route.params.id
    }
  },
  mounted () {
    console.log('this is current quill instance object', this.editor)
  },
  created () {
    this.isEdit && this.loadArticle()
  },
  methods: {
    // 加载
    loadArticle () {
      this.editloading = true
      this.$http({
        method: 'GET',
        url: `/articles/${this.articleId}`
      }).then(data => {
        this.articleForm = data
        this.editloading = false
      }).catch(err => {
        console.log(err)
        this.$message.error('加载失败')
      })
    },
    // 发布/更新按钮
    handlePublish (draft = false) {
      this.publishLoading = true
      if (this.isEdit) {
        this.submitEdit(draft).then(() => {
          this.publishLoading = false
        })
      } else {
        this.sumbitAdd(draft).then(() => {
          this.publishLoading = false
        })
      }
    },
    // 修改文章
    submitEdit (draft) {
      return this.$http({
        method: 'PUT',
        url: `/articles/${this.articleId}`,
        data: {
          title: this.articleForm.title,
          content: this.articleForm.content,
          cover: this.articleForm.cover,
          channel_id: this.articleForm.channel_id
        },
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '更新成功'
        })
        this.$router.push({ name: 'article-list' })
      }).catch(err => {
        this.$message.error('更新失败')
      })
    },
    // 发布文章
    sumbitAdd (draft) {
      this.$http({
        method: 'POST',
        url: '/articles',
        data: this.articleForm,
        params: {
          draft
        }
      }).then(data => {
        this.$message({
          type: 'success',
          message: '发布成功'
        })
        this.$router.push({ name: 'article-list' })
      }).catch(err => {
        this.$message.error('发布失败')
        console.log(err)
      })
    }
  }
}
</script>

<style  scoped lang='less'>
.publish-card {
  min-height: 100%;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
