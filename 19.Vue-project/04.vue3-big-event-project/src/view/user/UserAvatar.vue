<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'
import { ref } from 'vue'
import { updateUserAvatarService } from '@/api/user.js'
import { ElMessage } from 'element-plus'

// 上传图片
const uploadRef = ref()
const userStore = useUserStore()
const imgUrl = ref(userStore.user.user_pic)

const onSelectFile = (file) => {
  // 基于FileReader读取图片
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
const upLoadAvatar = async () => {
  // 上传图片
  await updateUserAvatarService(imgUrl.value)
  // 刷新用户信息
  await userStore.getUser()
  ElMessage.success('上传成功')
}
</script>

<template>
  <page-container title="更换头像">
    <el-upload
      ref="uploadRef"
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
    <el-button type="primary" :icon="Plus" @click="uploadRef.$el.querySelector('input').click()">
      选择图片
    </el-button>
    <el-button type="success" :icon="Upload" @click="upLoadAvatar">上传头像</el-button>
  </page-container>
</template>
<style scoped lang="scss">
.avatar-uploader .avatar {
  width: 260px;
  height: 260px;
  display: block;
  object-fit: cover; /* 或 contain */
  margin-bottom: 20px;
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
  width: 260px;
  height: 260px;
  text-align: center;
  border: #8c939d 1px dashed;
  margin-bottom: 20px;
}
</style>
