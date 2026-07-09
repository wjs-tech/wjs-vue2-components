<!--
  ============================================================
  UploadImage 图片上传组件演示页
  
  wjs created by 2019-12-05
  ============================================================
-->
<template>
  <div class="upload-image-demo">
    <PageHeader title="图片上传 UploadImage" content="基于el-upload封装，支持预览、删除、校验">
    </PageHeader>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div slot="header">单图上传</div>
          <UploadImage
            v-model="singleImage"
            :action="uploadUrl"
            :limit="1"
          />
          <p style="margin-top: 10px; color: #909399; font-size: 12px;">图片地址：{{ singleImage || '无' }}</p>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card>
          <div slot="header">多图上传（最多9张）</div>
          <UploadImage
            v-model="multiImages"
            :action="uploadUrl"
            :multiple="true"
            :limit="9"
          />
          <p style="margin-top: 10px; color: #909399; font-size: 12px;">已上传：{{ multiImages.length }} 张</p>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card>
          <div slot="header">拖拽上传</div>
          <UploadImage
            v-model="dragImage"
            :action="uploadUrl"
            :drag="true"
            list-type="picture"
          />
        </el-card>
      </el-col>
    </el-row>
    
    <el-card style="margin-top: 20px;">
      <div slot="header">头像上传</div>
      <div style="display: flex; align-items: center; gap: 30px;">
        <el-avatar :size="100" :src="avatar || defaultAvatar">
          {{ avatar ? '' : '头' }}
        </el-avatar>
        <div>
          <UploadImage
            v-model="avatar"
            :action="uploadUrl"
            :limit="1"
            :max-size="2"
            accept="image/jpeg,image/png"
          />
          <p style="margin-top: 10px; color: #909399; font-size: 12px;">支持 jpg/png 格式，大小不超过2MB</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import UploadImage from '@/components/UploadImage/index.vue'

/**
 * UploadImage 组件演示
 * wjs created by 2019-12-05
 */
export default {
  name: 'UploadImageDemo',
  components: { UploadImage },
  data() {
    return {
      uploadUrl: '/api/upload',
      singleImage: '',
      multiImages: [],
      dragImage: '',
      avatar: '',
      defaultAvatar: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-image-demo {
}
</style>
