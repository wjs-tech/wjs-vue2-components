<!--
  ============================================================
  UploadImage 图片上传组件
  
  功能说明：
    基于ElementUI el-upload封装的图片上传组件
    支持单图上传、多图上传、拖拽上传
    支持预览、删除
    支持上传前校验（大小、尺寸、格式等
  
  Props:
    value: String|Array - 图片URL（v-model）
    action: String - 上传地址
    multiple: Boolean - 是否多图
    limit: Number - 最大上传数量
    maxSize: Number - 单图最大大小（MB）
    accept: String - 接受的文件类型
  
  Events:
    input - 值变化
    success - 上传成功
    error - 上传失败
  
  适用场景：
    - 头像上传
    - 商品图片上传
    - 图片列表上传
    - 证件照上传
  
  wjs created by 2019-11-20
  ============================================================
-->
<template>
  <div class="upload-image">
    <el-upload
      :action="action"
      :multiple="multiple"
      :limit="limit"
      :accept="accept"
      :list-type="listType"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-exceed="handleExceed"
      :show-file-list="true"
      :drag="drag"
      :headers="headers"
      :data="data"
      name="file"
      class="image-uploader"
    >
      <div v-if="drag" class="upload-drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将图片拖到此处，或<em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          支持 jpg/png/gif 格式，单张不超过 {{ maxSize }}MB
        </div>
      </div>
      <div v-else class="upload-plus">
        <i class="el-icon-plus"></i>
        <div class="upload-tip">上传图片</div>
      </div>
    </el-upload>
    
    <!-- 图片预览 -->
    <el-dialog :visible.sync="previewVisible" width="auto" :show-close="true" append-to-body>
      <img :src="previewUrl" style="max-width: 600px; max-height: 600px; display: block;" />
    </el-dialog>
  </div>
</template>

<script>
/**
 * UploadImage 图片上传组件
 * 
 * 基于el-upload封装，支持单图/多图、预览、删除、校验
 * 
 * @property {String|Array} value - 图片地址（v-model）
 * @property {String} action - 上传接口地址
 * @property {Boolean} multiple - 是否多图
 * @property {Number} limit - 最大数量
 * @property {Number} maxSize - 单图最大大小（MB）
 * @property {String} accept - 接受的文件类型
 * @property {String} listType - 列表类型 picture-card/picture
 * @property {Boolean} drag - 是否拖拽上传
 * @property {Object} headers - 请求头
 * @property {Object} data - 附加参数
 * @property {Number} width - 显示宽度
 * @property {Number} height - 显示高度
 * 
 * @event input - 值变化
 * @event success - 上传成功
 * @event error - 上传失败
 * @event remove - 删除图片
 * 
 * wjs created by 2019-11-20
 */
export default {
  name: 'UploadImage',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    action: {
      type: String,
      default: '/api/upload'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 9
    },
    maxSize: {
      type: Number,
      default: 5
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    listType: {
      type: String,
      default: 'picture-card'
    },
    drag: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      previewVisible: false,
      previewUrl: ''
    }
  },
  computed: {
    fileList() {
      if (this.multiple) {
        const arr = Array.isArray(this.value) ? this.value : []
        return arr.map((url, index) => ({
          name: 'image_' + index,
          url: url
        }))
      } else {
        return this.value ? [{ name: 'image', url: this.value }] : []
      }
    }
  },
  methods: {
    // 上传前校验
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      const isLtSize = file.size / 1024 / 1024 < this.maxSize
      
      if (!isImage) {
        this.$message.error('只能上传图片文件！')
        return false
      }
      if (!isLtSize) {
        this.$message.error(`图片大小不能超过 ${this.maxSize}MB！`)
        return false
      }
      
      return true
    },
    
    // 上传成功
    handleSuccess(response, file) {
      // 假设后端返回 { code: 0, data: { url: 'xxx' } }
      if (response && response.code === 0 && response.data && response.data.url) {
        const url = response.data.url
        
        if (this.multiple) {
          const arr = Array.isArray(this.value) ? [...this.value] : []
          arr.push(url)
          this.$emit('input', arr)
        } else {
          this.$emit('input', url)
        }
        
        this.$emit('success', url, response)
      } else {
        this.$message.error(response.message || '上传失败！')
        this.$emit('error', response)
      }
    },
    
    // 删除图片
    handleRemove(file, fileList) {
      if (this.multiple) {
        const arr = fileList.map(f => f.url).filter(Boolean)
        this.$emit('input', arr)
      } else {
        this.$emit('input', '')
      }
      this.$emit('remove', file)
    },
    
    // 预览图片
    handlePreview(file) {
      this.previewUrl = file.url
      this.previewVisible = true
    },
    
    // 超出限制
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传 ${this.limit} 张图片！`)
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-image {
  min-height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;

  .image-uploader {
    ::v-deep .el-upload--picture-card {
      width: 108px;
      height: 108px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      line-height: 1;
    }
  }

  .upload-plus {
    text-align: center;
    color: #8c939d;
    font-size: 12px;

    i {
      font-size: 28px;
      display: block;
      margin-bottom: 6px;
      line-height: 1;
    }
  }

  .upload-drag {
    padding: 36px 20px;
    text-align: center;

    .el-icon-upload {
      font-size: 56px;
      color: #c0c4cc;
      margin-bottom: 12px;
      display: block;
    }

    .el-upload__text {
      color: #606266;
      font-size: 14px;

      em {
        color: #409EFF;
        font-style: normal;
      }
    }

    .el-upload__tip {
      font-size: 12px;
      color: #909399;
      margin-top: 10px;
    }
  }
}

::v-deep .el-upload-dragger {
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 140px;
}
</style>
