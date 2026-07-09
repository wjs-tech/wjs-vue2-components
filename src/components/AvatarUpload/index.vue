<!--
  ============================================================
  AvatarUpload 头像上传组件
  
  功能说明：
    基于 el-upload 思路封装的圆形头像上传组件。
    选择图片后进入裁剪面板，支持缩放与拖拽调整取景，实时圆形预览。
    上传前做格式与大小校验，导出圆形裁剪结果（dataURL）并支持上传到后端。
  
  Props:
    value: String - 头像地址（v-model）
    action: String - 上传接口地址
    size: Number - 头像显示尺寸（px）
    maxSize: Number - 单图最大大小（MB）
    accept: String - 接受的图片类型
    outputType: String - 导出格式 image/jpeg | image/png
    quality: Number - 导出质量（jpeg 有效）
  
  Events:
    input - 裁剪结果 dataURL 变化（v-model）
    change - 返回 { dataUrl, blob }
    success - 上传成功（后端返回时）
    error - 上传失败
  
  适用场景：
    - 个人中心 / 账号设置的头像上传
    - 需要圆形裁剪预览的各类头像、Logo 上传
  
  wjs created by 2022-05-11
  ============================================================
-->
<template>
  <div class="avatar-upload" :style="{ width: size + 'px' }">
    <!-- 头像展示区（点击选择） -->
    <div
      class="avatar-upload__box"
      :class="{ 'is-disabled': disabled }"
      :style="{ width: size + 'px', height: size + 'px' }"
      @click="handleBoxClick"
    >
      <img v-if="previewUrl || value" :src="previewUrl || value" class="avatar-upload__img" alt="头像" />
      <i v-else class="el-icon-plus avatar-upload__plus"></i>
      <span class="avatar-upload__mask"><i class="el-icon-camera"></i></span>
    </div>
    <input
      ref="fileInput"
      type="file"
      class="avatar-upload__input"
      :accept="accept"
      @change="handleFileChange"
    />

    <!-- 裁剪面板 -->
    <el-dialog
      title="调整头像"
      :visible.sync="editVisible"
      width="420px"
      append-to-body
      @close="cancelEdit"
    >
      <div class="avatar-upload__editor">
        <canvas
          ref="canvas"
          class="avatar-upload__canvas"
          @mousedown.prevent="onDragStart"
          @mousemove="onDragMove"
          @mouseup="onDragEnd"
          @mouseleave="onDragEnd"
          @wheel.prevent="onWheel"
        ></canvas>
        <div class="avatar-upload__tools">
          <span class="avatar-upload__tip">滚轮缩放 / 拖拽移动</span>
          <el-slider
            v-model="scale"
            :min="minScale"
            :max="maxScale"
            :step="0.01"
            :format-tooltip="v => Math.round(v * 100) + '%'"
            style="width: 220px;"
            @input="draw"
          ></el-slider>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelEdit">取 消</el-button>
        <el-button type="primary" :loading="uploading" @click="confirmCrop">
          {{ uploading ? '上传中 ' + percent + '%' : '确 定' }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * AvatarUpload 头像上传组件
 * 圆形裁剪 + 实时预览 + 格式/大小校验，基于 canvas 实现，无第三方依赖
 * wjs created by 2022-05-11
 */
export default {
  name: 'AvatarUpload',
  props: {
    value: {
      type: String,
      default: ''
    },
    action: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 120
    },
    maxSize: {
      type: Number,
      default: 2
    },
    accept: {
      type: String,
      default: 'image/jpeg,image/png'
    },
    outputType: {
      type: String,
      default: 'image/jpeg'
    },
    quality: {
      type: Number,
      default: 0.9
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editVisible: false,
      previewUrl: '',
      image: null,
      scale: 1,
      minScale: 1,
      maxScale: 3,
      imgX: 0,
      imgY: 0,
      dragging: false,
      dragStartX: 0,
      dragStartY: 0,
      cropSize: 240,
      uploading: false,
      percent: 0
    }
  },
  methods: {
    handleBoxClick() {
      if (this.disabled) return
      this.$refs.fileInput && this.$refs.fileInput.click()
    },
    handleFileChange(e) {
      const file = e.target.files && e.target.files[0]
      // 清空 input，保证同一文件可再次选择
      e.target.value = ''
      if (!file) return
      // 格式校验
      const acceptTypes = this.accept.split(',').map(s => s.trim())
      const acceptOk = acceptTypes.some(t => {
        if (t === 'image/*') return file.type.startsWith('image/')
        return file.type === t
      })
      if (!acceptOk) {
        this.$message && this.$message.error('图片格式不支持，请选择 jpg / png 格式')
        return
      }
      // 大小校验
      if (file.size / 1024 / 1024 > this.maxSize) {
        this.$message && this.$message.error(`图片大小不能超过 ${this.maxSize}MB`)
        return
      }
      const reader = new FileReader()
      reader.onload = ev => {
        const img = new Image()
        img.onload = () => {
          this.image = img
          this.scale = 1
          this.imgX = 0
          this.imgY = 0
          this.editVisible = true
          this.$nextTick(this.draw)
        }
        img.src = ev.target.result
      }
      reader.readAsDataURL(file)
    },
    draw() {
      const canvas = this.$refs.canvas
      if (!canvas || !this.image) return
      const size = this.cropSize
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, size, size)
      ctx.save()
      // 圆形裁剪
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      const img = this.image
      const dw = img.width * this.scale
      const dh = img.height * this.scale
      const dx = (size - dw) / 2 + this.imgX
      const dy = (size - dh) / 2 + this.imgY
      ctx.drawImage(img, dx, dy, dw, dh)
      ctx.restore()
    },
    onWheel(e) {
      const delta = e.deltaY > 0 ? -0.08 : 0.08
      this.scale = Math.min(this.maxScale, Math.max(this.minScale, this.scale + delta))
      this.draw()
    },
    onDragStart(e) {
      this.dragging = true
      this.dragStartX = e.offsetX
      this.dragStartY = e.offsetY
    },
    onDragMove(e) {
      if (!this.dragging) return
      this.imgX += e.offsetX - this.dragStartX
      this.imgY += e.offsetY - this.dragStartY
      this.dragStartX = e.offsetX
      this.dragStartY = e.offsetY
      this.draw()
    },
    onDragEnd() {
      this.dragging = false
    },
    confirmCrop() {
      const canvas = this.$refs.canvas
      if (!canvas) return
      const dataUrl = canvas.toDataURL(this.outputType, this.outputType === 'image/jpeg' ? this.quality : undefined)
      this.previewUrl = dataUrl
      this.$emit('input', dataUrl)
      this.$emit('change', { dataUrl, blob: this.dataURLtoBlob(dataUrl) })
      if (this.action) {
        this.upload(dataUrl)
      } else {
        this.editVisible = false
      }
    },
    cancelEdit() {
      this.editVisible = false
      this.image = null
      this.previewUrl = ''
    },
    dataURLtoBlob(dataUrl) {
      const arr = dataUrl.split(',')
      const mime = arr[0].match(/:(.*?);/)[1]
      const bstr = atob(arr[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) u8arr[n] = bstr.charCodeAt(n)
      return new Blob([u8arr], { type: mime })
    },
    upload(dataUrl) {
      const blob = this.dataURLtoBlob(dataUrl)
      const form = new FormData()
      form.append('file', blob, 'avatar.png')
      const xhr = new XMLHttpRequest()
      xhr.open('POST', this.action, true)
      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          this.percent = Math.round((e.loaded / e.total) * 100)
        }
      }
      xhr.onload = () => {
        this.uploading = false
        if (xhr.status === 200) {
          let res
          try {
            res = JSON.parse(xhr.responseText)
          } catch (err) {
            res = null
          }
          if (res && (res.code === 0 || res.success)) {
            this.$message && this.$message.success('上传成功')
            this.$emit('success', res)
          } else {
            this.$message && this.$message.error((res && res.message) || '上传失败')
            this.$emit('error', res)
          }
        } else {
          this.$message && this.$message.error('上传失败')
          this.$emit('error', xhr)
        }
        this.editVisible = false
      }
      xhr.onerror = () => {
        this.uploading = false
        this.percent = 0
        this.$message && this.$message.error('网络异常，上传失败')
        this.$emit('error', xhr)
        this.editVisible = false
      }
      this.uploading = true
      this.percent = 0
      xhr.send(form)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-upload {
  display: inline-block;

  &__box {
    position: relative;
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    background: #fafafa;
    transition: border-color 0.2s;

    &:hover {
      border-color: #409eff;

      .avatar-upload__mask {
        opacity: 1;
      }
    }

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  &__plus {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 28px;
    color: #8c939d;
  }

  &__mask {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 22px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &__input {
    display: none;
  }

  &__editor {
    text-align: center;
  }

  &__canvas {
    border-radius: 50%;
    border: 1px solid #ebeef5;
    cursor: grab;
    background: #f5f7fa;

    &:active {
      cursor: grabbing;
    }
  }

  &__tools {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__tip {
    font-size: 12px;
    color: #909399;
    margin-bottom: 6px;
  }
}
</style>
