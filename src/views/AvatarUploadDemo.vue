<!--
  ============================================================
  AvatarUpload 头像上传组件演示页
  
  wjs created by 2022-05-11
  ============================================================
-->
<template>
  <div class="avatar-upload-demo">
    <PageHeader title="头像上传 AvatarUpload" content="圆形头像裁剪上传，支持缩放拖拽与实时预览"></PageHeader>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div slot="header">基础用法（圆形裁剪）</div>
          <AvatarUpload v-model="avatar1" :size="120"></AvatarUpload>
          <p class="tip">选择图片后可在弹窗中滚轮缩放、拖拽取景，确认后回填裁剪结果。</p>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <div slot="header">小尺寸（64px）</div>
          <AvatarUpload v-model="avatar2" :size="64" output-type="image/png"></AvatarUpload>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card>
          <div slot="header">回填结果（dataURL 预览）</div>
          <div v-if="avatar1" class="result">
            <img :src="avatar1" alt="结果" />
          </div>
          <span v-else class="tip">尚未选择头像</span>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/**
 * AvatarUpload 组件演示
 * wjs created by 2022-05-11
 */
import AvatarUpload from '@/components/AvatarUpload/index.vue'

export default {
  name: 'AvatarUploadDemo',
  components: { AvatarUpload },
  data() {
    return {
      avatar1: '',
      avatar2: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-upload-demo {
  .tip {
    color: #909399;
    font-size: 12px;
    margin-top: 12px;
  }
  .result {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #ebeef5;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
