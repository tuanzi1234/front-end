<script setup>
import { ref } from 'vue'
import CategorySelect from '@/view/article/components/CategorySelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { addArticleService, getArticleDetailService, updateArticleService } from '@/api/article.js'
import { ElMessage } from 'element-plus'
import { baseURL } from '@/utils/request.js'
import axios from 'axios'

// 富文本编辑器
const editor = ref()
// 图片Url
const imgUrl = ref('')
// 控制抽屉变量
const visibleDrawer = ref(false)
// 添加文章得表单
const addArticleForm = ref({
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: '',
})
const emit = defineEmits(['success'])
// 打开抽屉
const openDrawer = async (row) => {
  visibleDrawer.value = true
  if (row?.id) {
    // 当编辑文章时，将数据回显
    const res = await getArticleDetailService(row.id)
    addArticleForm.value = res.data.data
    imgUrl.value = baseURL + res.data.data.cover_img
    // 将图片URL转换为File对象，以便表单提交时使用
    addArticleForm.value.cover_img = await convertUrlToFile(
      imgUrl.value,
      addArticleForm.value.cover_img
    )
  } else {
    // 添加文章时，清空表单
    addArticleForm.value = {
      title: '',
      cate_id: '',
      content: '',
      cover_img: '',
      state: '',
    }
    // 重置富文本编辑器和图片Url
    imgUrl.value = ''
    editor.value.setHTML('')
  }
}
// 上传图片
const onSelectFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  addArticleForm.value.cover_img = uploadFile.raw
}
// 发布文章
const onPublish = async (state) => {
  addArticleForm.value.state = state
  const formData = new FormData()
  for (let key in addArticleForm.value) {
    // 添加表单数据
    formData.append(key, addArticleForm.value[key])
  }
  if (addArticleForm.value.id) {
    // 编辑文章
    await updateArticleService(formData)
    ElMessage.success('编辑成功')
    visibleDrawer.value = false
    emit('success', 'update')
  } else {
    // 添加文章
    await addArticleService(formData).then(() => {
      ElMessage.success('添加成功')
      visibleDrawer.value = false
      emit('success', 'add')
    })
  }
}
// 暴露方法
defineExpose({
  openDrawer,
})
// 图片转换成File对象
const convertUrlToFile = async (url, filename) => {
  try {
    // 1. 使用axios获取网络图片数据，设置responseType为blob以获取二进制数据
    const response = await axios.get(url, { responseType: 'blob' })

    // 2. 基于返回的blob数据创建File对象
    // 第一个参数是包含blob数据的数组
    // 第二个参数是文件名
    // 第三个参数是配置对象，设置文件类型
    const file = new File([response.data], filename, {
      type: response.data.type || 'image/jpeg' // 如果无法确定类型，默认设为jpeg
    })

    return file
  } catch (error) {
    // 4. 错误处理
    ElMessage.error('图片转换失败')
    throw error
  }
}
</script>
<template>
  <!-- 抽屉 -->
  <el-drawer v-model="visibleDrawer" title="标题">
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="addArticleForm.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <CategorySelect v-model="addArticleForm.cate_id"></CategorySelect>
      </el-form-item>
      <el-form-item label="封面">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="onSelectFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" alt="" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <quill-editor
          ref="editor"
          v-model:content="addArticleForm.content"
          content-type="html"
          theme="snow"
        ></quill-editor>
      </el-form-item>
      <el-form-item>
        <div class="edit">
          <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
          <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style scoped lang="scss">
.edit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  margin: 50px auto;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
  object-fit: cover; /* 或 contain */
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
  border: #8c939d 1px dashed;
}

/* 确保富文本编辑器的工具栏和编辑区域垂直排列 */
:deep(.ql-toolbar) {
  display: block !important;
  width: 100% !important;
}

:deep(.ql-container) {
  display: block !important;
  width: 100% !important;
}

/* 确保编辑器容器正常流式布局 */
.el-form-item :deep(.quill-editor) {
  display: block !important;
}

/* 确保工具栏和容器正常堆叠 */
:deep(.ql-toolbar.ql-snow) {
  margin-bottom: 0 !important;
  border-radius: 4px 4px 0 0 !important;
}

:deep(.ql-container.ql-snow) {
  border-top: 0 !important;
  border-radius: 0 0 4px 4px !important;
}
</style>
